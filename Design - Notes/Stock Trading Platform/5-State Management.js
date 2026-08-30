/*

                    Application State
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      Server State      Client State    Realtime State
       (REST API)         (UI)          (High frequency)
          │                │                │
          ▼                ▼                ▼
     React Query       Zustand/Redux    External Store

     First: What is Server State?

Server state means:

The backend is the source of truth.

Examples:

GET /watchlist

GET /portfolio

GET /orders

GET /stock/TCS/history

The frontend does not truly own this data.

Example:

Portfolio

Backend says:

{
  holdings: [
    {
      symbol: "TCS",
      quantity: 10,
      averagePrice: 3000
    }
  ]
}

React Query is excellent for this.

function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });
}

React Query handles:

Caching
Loading state
Error state
Refetching
Deduplication
Invalidation
Stale data management

So yes:

REST APIs
   ↓
React Query Cache

----------------------------------------------------------------------------
Second: Client/UI State

This is state owned by the frontend.

Examples:

Is Buy Modal Open?
Selected Stock Tab?
Chart Time Range?
Search Input?
Sidebar Open?
Dark Mode? user preferences

For example:

const [isBuyModalOpen, setBuyModalOpen] =
  useState(false);

Or shared UI state:

const useUIStore = create((set) => ({
  selectedStock: null,
  isOrderModalOpen: false,

  openOrderModal: () =>
    set({ isOrderModalOpen: true }),
}));

This is not React Query data.

Because:

Server does not own it.
----------------------------------------------------------------------------
Third: Realtime State 🔥

This is where our trading platform becomes different.

Examples:

TCS price:

₹3200.10
₹3200.15
₹3200.30
₹3200.20
₹3200.50

Potentially many updates per second.

The question is:

Should we put every WebSocket event into React Query cache?

My answer:

Usually NO for high-frequency market data.

Why not use React Query Cache for every WebSocket tick?

Technically you can do this:

websocket.onmessage = (event) => {
  queryClient.setQueryData(
    ["stock", event.symbol],
    event.data
  );
};

This works.

For example:

WebSocket
    ↓
queryClient.setQueryData()
    ↓
React Query Cache
    ↓
UI re-render

But imagine:

1000 updates / second

Then potentially:

1000 query cache writes

This can cause:

Frequent notifications
Excessive subscriber updates
Object allocations
Garbage collection pressure
Too many React renders

React Query was primarily designed for:

Fetch
Cache
Invalidate
Refetch

not as a high-frequency streaming data engine.

So my recommendation

For our architecture:

                        REST APIs
                           │
                           ▼
                     React Query
                           │
                    Initial Snapshot
                           │
                           ▼
                    Market Data Store
                           ▲
                           │
WebSocket ──→ Realtime Pipeline

But let's be precise because there are multiple strategies.

--------------------------
Strategy 1: REST data stays in React Query, WS updates React Query

Good for:

Low-frequency realtime updates

Examples:

Order status updates
Notifications
Comments
Kanban card updates

Example:

websocket.on("ORDER_UPDATED", (event) => {
  queryClient.setQueryData(
    ["orders"],
    (oldOrders) => {
      return oldOrders.map((order) =>
        order.id === event.orderId
          ? { ...order, ...event }
          : order
      );
    }
  );
});

This is perfectly reasonable.

Why?

Because orders don't update:

10,000 times per second

Maybe:

Order Pending
→ Partially Filled
→ Filled

React Query is fine.
-------------------------------------------
Strategy 2: High-frequency WebSocket data goes into a dedicated external store

This is what I recommend for market prices.

REST Snapshot
      │
      ▼
Market Data Store
      ▲
      │
WebSocket Updates

The Market Data Store can be:

Zustand vanilla store
Redux external store
Custom external store using useSyncExternalStore

Example:

import { createStore } from "zustand/vanilla";

const marketStore = createStore(() => ({
  quotes: new Map(),
}));

Then the WebSocket pipeline updates it.

function handlePriceUpdate(event) {
  marketStore.setState((state) => {
    state.quotes.set(event.symbol, event);
  });
}

Conceptually:

WebSocket
   ↓
Realtime Pipeline
   ↓
Market Data Store
   ↓
Only affected components

-------------- But wait: What about the REST snapshot?

This is where the design becomes interesting.

Suppose we have:

GET /stocks/TCS/snapshot

Should we:

Option A
REST
 ↓
React Query

and:

WebSocket
 ↓
Market Store

Now we have the same stock data in two places.

❌ This creates two sources of truth.

For high-frequency market data, I would avoid that.

----------We need the single source of truth
Better approach for market data

Use React Query for fetching the snapshot, but then move the normalized market data into the Market Store.

Architecture:

                  REST API
                     │
                     ▼
               React Query
             Fetch + Dedup
                     │
                     ▼
                Snapshot
                     │
                     ▼
            Market Orchestrator
                     │
                     ▼
             Market Data Store
                     ▲
                     │
                 WebSocket

Then the final source used by the UI is:

Market Data Store

not both.

///////// Check the state management events file - Orchestrator - events ws state
*/