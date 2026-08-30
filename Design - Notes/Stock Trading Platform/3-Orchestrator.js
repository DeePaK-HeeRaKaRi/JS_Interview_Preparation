/*

First: What problem does the Orchestrator solve?

Think of layers like this:

UI Component
    ↓
Custom Hook
    ↓
Orchestrator
    ↓
Multiple systems

The important distinction:

Custom Hook

A hook is mainly an interface between:

UI ↔ Application logic

Example:

const { price, change } = useStock("TCS");

The component should not care:

Where data comes from
REST vs WebSocket
Subscription logic
Cache
Reconnection

The hook hides that complexity.

------------------------------------------------------------------------------
Orchestrator

The orchestrator coordinates multiple systems/services/stores.

Think:

One user action
      ↓
Requires coordination between
multiple things

For example:

Open Stock Details Page
        ↓
1. Fetch stock snapshot
2. Subscribe WebSocket
3. Receive price updates
4. Update market store
5. Handle reconnect
6. Unsubscribe on exit

That is orchestration.

Everything should not keep nin the hook.

------------------------------------------------------------------------------
Example

Example 1: Stock Details Page

Let's understand the workflow.

User opens:

/TCS

The UI wants:

const stock = useStock("TCS");

But internally:

UI
 ↓
useStock("TCS")
 ↓
StockOrchestrator
 ↓
 ┌─────────────────────────────┐
 │ 1. Get current snapshot     │
 │ 2. Subscribe TCS            │
 │ 3. Receive live events      │
 │ 4. Validate events          │
 │ 5. Maintain ordering        │
 │ 6. Update Market Store      │
 └─────────────────────────────┘

The hook doesn't need to implement all that.

It just says:

"I need TCS data"

The orchestrator figures out how to get and maintain that data.

--------------------------------------

1. Market Store

Imagine this is Zustand / external store.

const marketStore = {
  stocks: new Map(),

  updateStock(symbol, data) {
    this.stocks.set(symbol, {
      ...this.stocks.get(symbol),
      ...data,
    });
  },

  getStock(symbol) {
    return this.stocks.get(symbol);
  },
};

This store is responsible for:

Storing market data

It should NOT know:

When to subscribe
When to fetch
How WebSocket works

2. WebSocket Service
class WebSocketService {
  subscribe(symbol) {
    console.log(`Subscribing to ${symbol}`);
  }

  unsubscribe(symbol) {
    console.log(`Unsubscribing from ${symbol}`);
  }
}

const websocketService = new WebSocketService();

Its responsibility:

Connection + messages

Again, it shouldn't know UI workflows.

3. API Service
const stockApi = {
  async getStock(symbol) {
    const response = await fetch(`/api/stocks/${symbol}`);
    return response.json();
  },
};

Its responsibility:

HTTP communication
*/
class StockOrchestrator {
  constructor({
    stockApi,
    websocketService,
    marketStore,
  }) {
    this.stockApi = stockApi;
    this.websocketService = websocketService;
    this.marketStore = marketStore;

    this.subscriptions = new Map();
  }

  async subscribeToStock(symbol) {
    // Prevent duplicate subscriptions
    if (this.subscriptions.has(symbol)) {
      this.subscriptions.set(
        symbol,
        this.subscriptions.get(symbol) + 1
      );

      return;
    }

    // 1. Fetch initial snapshot
    const snapshot = await this.stockApi.getStock(symbol);

    // 2. Store snapshot
    this.marketStore.updateStock(symbol, snapshot);

    // 3. Subscribe to realtime updates
    this.websocketService.subscribe(symbol);

    // Track subscriber count
    this.subscriptions.set(symbol, 1);
  }

  unsubscribeFromStock(symbol) {
    const count = this.subscriptions.get(symbol);

    if (!count) return;

    // Multiple components still need this stock
    if (count > 1) {
      this.subscriptions.set(symbol, count - 1);
      return;
    }

    // No consumers left
    this.websocketService.unsubscribe(symbol);

    this.subscriptions.delete(symbol);
  }
}

const stockOrchestrator = new StockOrchestrator({
  stockApi,
  websocketService,
  marketStore,
});

/*
Create it once:

4. Now the Hook becomes very simple
function useStock(symbol) {
  const stock = useMarketStore(
    (state) => state.stocks[symbol]
  );

  useEffect(() => {
    stockOrchestrator.subscribeToStock(symbol);

    return () => {
      stockOrchestrator.unsubscribeFromStock(symbol);
    };
  }, [symbol]);

  return stock;
}

Now look at the responsibilities.

Hook
React lifecycle
+
Subscribe to UI state
+
Call orchestrator
Orchestrator
Coordinate workflow
Services
Perform actual operations
Store
Store data

This separation is the main idea.

Real Example: Same stock used in multiple places

Suppose TCS appears here:

Watchlist
   ↓
TCS

Also here:

Portfolio
   ↓
TCS holding

And:

Stock Details
   ↓
TCS

Now we have:

useWatchlist()
     ↓
Subscribe TCS

usePortfolio()
     ↓
Subscribe TCS

useStock("TCS")
     ↓
Subscribe TCS

Without coordination:

WebSocket

subscribe(TCS)
subscribe(TCS)
subscribe(TCS)

Potentially duplicate subscriptions.

With an orchestrator:

Watchlist ───────┐
                 │
Portfolio ───────┼──→ Stock Orchestrator
                 │
Stock Details ───┘
                         ↓
                  Single subscription
                         ↓
                        TCS

The orchestrator can maintain:

{
  TCS: {
    subscribers: 3
  }
}

Only when the count becomes:

0

do we unsubscribe.

This is a very practical reason.

Now create only one instance:

import { websocket } from "./websocket";
import { marketStore } from "./marketStore";

export const stockOrchestrator =
  new StockOrchestrator({
    websocket,
    marketStore,
  });
Hooks use the same instance

Watchlist Hook
import { stockOrchestrator } from "./stockOrchestrator";

function useWatchlist(symbols) {
  useEffect(() => {
    symbols.forEach((symbol) => {
      stockOrchestrator.subscribe(symbol);
    });

    return () => {
      symbols.forEach((symbol) => {
        stockOrchestrator.unsubscribe(symbol);
      });
    };
  }, [symbols]);
}

Portfolio Hook
function usePortfolio(symbols) {
  useEffect(() => {
    symbols.forEach((symbol) => {
      stockOrchestrator.subscribe(symbol);
    });

    return () => {
      symbols.forEach((symbol) => {
        stockOrchestrator.unsubscribe(symbol);
      });
    };
  }, [symbols]);
}
  
Stock Details Hook
function useStock(symbol) {
  useEffect(() => {
    stockOrchestrator.subscribe(symbol);

    return () => {
      stockOrchestrator.unsubscribe(symbol);
    };
  }, [symbol]);
}

Now suppose:

Watchlist → TCS
Portfolio → TCS
Stock Details → TCS

The calls become:

1. useWatchlist
   subscribe(TCS)

subscriptions:
{
  TCS: 1
}

→ WebSocket SUBSCRIBE TCS

Then:

2. usePortfolio
   subscribe(TCS)

subscriptions:
{
  TCS: 2
}

→ No WebSocket call

Then:

3. useStockDetails
   subscribe(TCS)

subscriptions:
{
  TCS: 3
}

→ No WebSocket call

So only:

WebSocket
    ↑
ONE subscription for TCS

But internally:

TCS
consumers = 3
*/

// Example 2 
/*
Example 2: Order Placement

This is an even better example of why orchestration exists.

User clicks:

BUY TCS

What happens?

It is NOT just:

api.placeOrder();

A realistic workflow might be:

Place Order
    ↓
Generate mutation ID
    ↓
Validate order
    ↓
Add pending order to Orders Store
    ↓
Send API request
    ↓
Receive acknowledgement
    ↓
Wait for WebSocket order events
    ↓
Update order status
    ↓
Update Portfolio when filled
    ↓
Handle failure

This touches multiple systems:

Order API
Orders Store
Portfolio Store
WebSocket Events
Notifications
Analytics

This is exactly where an orchestrator is useful.

OrderOrchestrator
*/

class OrderOrchestrator {
  constructor({
    orderApi,
    orderStore,
    analytics,
  }) {
    this.orderApi = orderApi;
    this.orderStore = orderStore;
    this.analytics = analytics;
  }

  async placeOrder(orderInput) {
    const mutationId = crypto.randomUUID();

    const pendingOrder = {
      id: mutationId,
      mutationId,
      ...orderInput,
      status: "PENDING",
    };

    // 1. Optimistic update
    this.orderStore.addOrder(pendingOrder);

    try {
      // 2. Send request
      const response = await this.orderApi.placeOrder({
        ...orderInput,
        mutationId,
      });

      // 3. Update temporary ID with server ID
      this.orderStore.updateOrder(mutationId, {
        id: response.orderId,
        status: response.status,
      });

      // 4. Analytics
      this.analytics.track("ORDER_PLACED", {
        orderId: response.orderId,
      });

    } catch (error) {
      // 5. Rollback / mark failed
      this.orderStore.updateOrder(mutationId, {
        status: "FAILED",
      });

      throw error;
    }
  }
}


// Then the hook is clean:

function usePlaceOrder() {
  const placeOrder = async (order) => {
    return orderOrchestrator.placeOrder(order);
  };

  return {
    placeOrder,
  };
}

// Component:

function BuyButton() {
  const { placeOrder } = usePlaceOrder();

  const handleBuy = () => {
    placeOrder({
      symbol: "TCS",
      quantity: 10,
      side: "BUY",
    });
  };

  return (
    <button onClick={handleBuy}>
      Buy
    </button>
  );
}

/* Notice the component knows nothing about:

Mutation IDs
Optimistic state
API
WebSocket confirmation
Analytics

*/