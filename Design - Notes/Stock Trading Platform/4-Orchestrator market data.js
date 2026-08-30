/*
Let's take a concrete scenario.

The problem: REST + WebSocket both provide market data

Suppose the user opens the stock details page for TCS.

The UI needs the latest price.

TCS

Current Price: ₹3,200
Change: +1.2%

There are two data sources.

REST API

Used to get the initial snapshot:

GET /stocks/TCS

Response:

{
  symbol: "TCS",
  ltp: 3200,
  changePercent: 1.2,
  sequence: 100
}
WebSocket

Used for future live updates:

{
  type: "LTP_UPDATE",
  symbol: "TCS",
  ltp: 3201,
  changePercent: 1.23,
  sequence: 101
}

So conceptually:

REST
Initial Snapshot
      │
      │
      ▼
 ┌─────────────┐
 │             │
 │ Market Data │
 │    Store    │
 │             │
 └─────────────┘
      ▲
      │
      │
WebSocket
Live Updates

But there is an important race condition.

The naive implementation ❌

Imagine the hook does this:

function useStock(symbol) {
  useEffect(() => {
    fetch(`/api/stocks/${symbol}`)
      .then((res) => res.json())
      .then((data) => {
        marketStore.update(symbol, data);
      });

    websocket.subscribe(symbol);

    return () => websocket.unsubscribe(symbol);
  }, [symbol]);
}

Looks fine.

But let's see what can happen.

Race condition

Timeline:

T1 ── User opens TCS

T2 ── REST request started

T3 ── WebSocket subscribed

T4 ── WebSocket receives:
      TCS = ₹3205
      sequence = 105

T5 ── Market store updated
      Price = ₹3205

T6 ── REST response finally arrives
      Price = ₹3200
      sequence = 100

T7 ── REST overwrites the store ❌
      Price goes backwards from ₹3205 → ₹3200

This is bad.

The UI shows:

₹3205
 ↓
₹3200 ❌

Even though ₹3200 is old data.

So the orchestrator needs to coordinate the two data sources.

The Orchestrator's responsibility

The orchestrator decides:

"Which data is newer, and how should REST and WebSocket updates be merged?"

Flow:

User opens TCS
       │
       ▼
StockOrchestrator
       │
       ├──── Start REST snapshot request
       │
       ├──── Subscribe WebSocket
       │
       ▼
Incoming data
       │
       ▼
Compare sequence/version
       │
       ├── Older → Ignore
       │
       └── Newer → Update Market Store

This is the actual orchestration.

Let's build a simple example
1. Market Data Store

We'll create a very simplified store.
*/

class MarketDataStore {
  constructor() {
    this.stocks = new Map();
  }

  update(symbol, data) {
    this.stocks.set(symbol, data);

    console.log("Store updated:", symbol, data);
  }

  get(symbol) {
    return this.stocks.get(symbol);
  }
}

const marketStore = new MarketDataStore();

/*
The store's job is simple:

Store data

It doesn't decide:

Should REST win?
Should WebSocket win?
Is sequence old?

That's not the store's responsibility.

2. API Service
*/

const stockApi = {
  async getSnapshot(symbol) {
    const response = await fetch(
      `/api/stocks/${symbol}/snapshot`
    );

    return response.json();
  },
};

/*
Responsibility:

REST request

Nothing else.
*/

//3. WebSocket Service
class WebSocketService {
  subscribe(symbol, callback) {
    // Simplified
    console.log("Subscribed:", symbol);

    // Assume callback is called for every price update
    this.onMessage = callback;
  }

  unsubscribe(symbol) {
    console.log("Unsubscribed:", symbol);
  }
}

const websocket = new WebSocketService();

/*
Responsibility:

Receive real-time events
*/
// 4. The Orchestrator

// Now the interesting part.

class StockOrchestrator {
  constructor({
    stockApi,
    websocket,
    marketStore,
  }) {
    this.stockApi = stockApi;
    this.websocket = websocket;
    this.marketStore = marketStore;
  }

  async startStock(symbol) {
    // 1. Start WebSocket subscription first
    this.websocket.subscribe(symbol, (event) => {
      this.handleMarketUpdate(event);
    });

    // 2. Fetch REST snapshot
    const snapshot =
      await this.stockApi.getSnapshot(symbol);

    // 3. Try to apply snapshot
    this.applyUpdate(symbol, snapshot);
  }

  handleMarketUpdate(event) {
    const { symbol } = event;

    this.applyUpdate(symbol, event);
  }

  applyUpdate(symbol, incomingData) {
    const currentData =
      this.marketStore.get(symbol);

    // No current data → accept
    if (!currentData) {
      this.marketStore.update(symbol, incomingData);
      return;
    }

    // Ignore older data
    if (
      incomingData.sequence <= currentData.sequence
    ) {
      console.log(
        "Ignoring stale update",
        incomingData
      );

      return;
    }

    // Incoming data is newer
    this.marketStore.update(symbol, incomingData);
  }
}

// Create one application-scoped instance:

const stockOrchestrator =
  new StockOrchestrator({
    stockApi,
    websocket,
    marketStore,
  });
/*
  What happens now?

Suppose:

REST snapshot
{
  symbol: "TCS",
  ltp: 3200,
  sequence: 100
}
WebSocket update
{
  symbol: "TCS",
  ltp: 3205,
  sequence: 105
}

Timeline:

1. WebSocket subscribes

2. REST request starts

3. WebSocket event arrives

   TCS
   Price = 3205
   sequence = 105

   ↓

   Store = 3205

Then REST arrives:

REST Snapshot

Price = 3200
sequence = 100

The orchestrator checks:

100 <= 105

Therefore:

❌ Ignore REST snapshot

The UI stays correct:

₹3205
But there is another possible race condition

What if:

REST snapshot starts
      ↓
REST returns sequence 100
      ↓
Store updated
      ↓
WebSocket event sequence 105
      ↓
Store updated

That's fine:

100 → 105

The orchestrator accepts both.

Why not just put this logic inside the hook?

You could initially.

For example:

function useStock(symbol) {
  useEffect(() => {
    websocket.subscribe(symbol);

    fetchSnapshot(symbol);

    // compare sequence
    // update store
    // cleanup
  }, [symbol]);
}

But now imagine these all need the same behavior:

useWatchlist()

useStock()

usePortfolio()

useOrderBook()

Each of them potentially needs:

REST snapshot
+
WebSocket subscription
+
Sequence comparison
+
Deduplication
+
Reconnection
+
Store updates

If this is inside hooks:

useWatchlist
 ├── fetch snapshot
 ├── subscribe WS
 ├── compare sequence

usePortfolio
 ├── fetch snapshot
 ├── subscribe WS
 ├── compare sequence

useStock
 ├── fetch snapshot
 ├── subscribe WS
 ├── compare sequence

Now we have duplicated infrastructure/business logic.

Instead:

Hooks
  │
  ├── useWatchlist()
  ├── usePortfolio()
  └── useStock()
          │
          ▼
   StockOrchestrator
          │
          ├── REST
          ├── WebSocket
          ├── Ordering
          ├── Deduplication
          └── Store Update

This is the main reason.
*/