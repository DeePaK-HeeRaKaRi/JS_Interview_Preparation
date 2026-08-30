/*EXAMPLE FOR TRADING 

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

Then the final source used by the UI is: Market Data Store
Example

Let's say the user opens:

TCS

*/
// Step 1: Fetch initial snapshot
const { data } = useQuery({
  queryKey: ["stockSnapshot", "TCS"],
  queryFn: () => stockApi.getSnapshot("TCS"),
});

// Suppose:

const response = {
  symbol: "TCS",
  ltp: 3200,
  sequence: 100
}

// Step 2: Orchestrator receives snapshot
stockOrchestrator.initializeStock(
  "TCS",
  data
);

//The orchestrator updates: Market Data Store
/*
TCS:
{
  ltp: 3200,
  sequence: 100
}
*/

/*
Step 3: WebSocket updates the same store
{
  symbol: "TCS",
  ltp: 3205,
  sequence: 101
}

Then:

WebSocket
   ↓
Event Pipeline
   ↓
Orchestrator
   ↓
Market Data Store

Now UI always reads: Market Data Store

SERVER STATE

            REST APIs
                │
                ▼
          React Query Cache
                │
      ┌─────────┴──────────┐
      │                    │
      ▼                    ▼
 Watchlist              Portfolio
 Orders                 Instrument Metadata
 Historical Charts


                   REALTIME STATE

            WebSocket Events
                   │
                   ▼
           Realtime Pipeline
                   │
                   ▼
            Market Store
                   │
            ┌──────┼───────┐
            │      │       │
            ▼      ▼       ▼
        Watchlist Portfolio Stock Details

SERVER STATE

            REST APIs
                │
                ▼
          React Query Cache
                │
      ┌─────────┴──────────┐
      │                    │
      ▼                    ▼
 Watchlist              Portfolio
 Orders                 Instrument Metadata
 Historical Charts


                   REALTIME STATE

            WebSocket Events
                   │
                   ▼
           Realtime Pipeline
                   │
                   ▼
            Market Store
                   │
            ┌──────┼───────┐
            │      │       │
            ▼      ▼       ▼
        Watchlist Portfolio Stock Details
*/

// marketStore.js
import { createStore } from "zustand/vanilla";

export const marketStore = createStore(() => ({
  quotesBySymbol: {},

  setQuote: (symbol, quote) => {
    marketStore.setState((state) => ({
      quotesBySymbol: {
        ...state.quotesBySymbol,
        [symbol]: quote,
      },
    }));
  },
}));

// marketApi.js

export const marketApi = {
  async getCompanies(symbols) {
    const response = await fetch(
      `/api/companies?symbols=${symbols.join(",")}`
    );

    return response.json();
  },
};

// websocketService.js
/*
WebSocketService

• Connect
• Disconnect
• Authentication
• Reconnect
• Receive messages
• Send messages
*/
class WebSocketService {
  constructor() {
    this.socket = new WebSocket("wss://api.example.com/market");
    this.listeners = new Set();

    this.socket.onmessage = (message) => {
      const event = JSON.parse(message.data);

      this.listeners.forEach((listener) => {
        listener(event);
      });
    };
  }

  subscribe(symbols) {
    this.socket.send(
      JSON.stringify({
        type: "SUBSCRIBE",
        symbols,
      })
    );
  }

  unsubscribe(symbols) {
    this.socket.send(
      JSON.stringify({
        type: "UNSUBSCRIBE",
        symbols,
      })
    );
  }

  onMessage(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const websocketService = new WebSocketService();

// marketOrchestrator.js

import { marketApi } from "./marketApi";
import { websocketService } from "./websocketService";
import { marketStore } from "./marketStore";

class MarketOrchestrator {
  constructor() {
    this.subscriptions = new Map();

    // Listen to WS only once
    websocketService.onMessage((event) => {
      this.handleMarketEvent(event);
    });
  }

  async subscribe(source, symbols) {
    // Register which screen/hook needs which symbols
    this.subscriptions.set(source, new Set(symbols));

    const activeSymbols = this.getActiveSymbols();

    // 1. Fetch REST snapshot
    const companies = await marketApi.getCompanies(activeSymbols);

    // 2. Update store with initial data
    companies.forEach((company) => {
      this.updateQuote(company.symbol, company);
    });

    // 3. Subscribe to live updates
    websocketService.subscribe(activeSymbols);
  }

  unsubscribe(source) {
    this.subscriptions.delete(source);

    const activeSymbols = this.getActiveSymbols();

    websocketService.subscribe(activeSymbols);
  }

  getActiveSymbols() {
    const symbols = new Set();

    this.subscriptions.forEach((sourceSymbols) => {
      sourceSymbols.forEach((symbol) => {
        symbols.add(symbol);
      });
    });

    return [...symbols];
  }

  handleMarketEvent(event) {
    if (event.type !== "PRICE_UPDATE") return;

    const currentQuote =
      marketStore.getState().quotesBySymbol[event.symbol];

    // Ignore stale event
    if (
      currentQuote &&
      event.sequence <= currentQuote.sequence
    ) {
      return;
    }

    this.updateQuote(event.symbol, event);
  }

  updateQuote(symbol, data) {
    marketStore.getState().setQuote(symbol, data);
  }
}

// ONE application-scoped instance
export const marketOrchestrator =
  new MarketOrchestrator();

  // useWatchlist.js

import { useEffect } from "react";
import { marketOrchestrator } from "./marketOrchestrator";

export function useWatchlist() {
  const companiesList = ["TCS", "RELIANCE", "INFOSYS"];

  useEffect(() => {
    marketOrchestrator.subscribe(
      "watchlist",
      companiesList
    );

    return () => {
      marketOrchestrator.unsubscribe("watchlist");
    };
  }, []);

  return companiesList;
}

// usePortfolio.js

import { useEffect } from "react";
import { marketOrchestrator } from "./marketOrchestrator";

export function usePortfolio() {
  const companiesList = ["TCS", "HDFC", "INFOSYS"];

  useEffect(() => {
    marketOrchestrator.subscribe(
      "portfolio",
      companiesList
    );

    return () => {
      marketOrchestrator.unsubscribe("portfolio");
    };
  }, []);

  return companiesList;
}

/*
                     APPLICATION START

                           │
                           ▼

              ┌────────────────────────┐
              │ MarketOrchestrator     │
              │                        │
              │ constructor()          │
              │                        │
              │ websocket.onMessage(   │
              │   handleMarketEvent    │
              │ )                      │
              └────────────┬───────────┘
                           │
                           │ register callback
                           ▼

                    ┌─────────────────────┐
                    │  WebSocketService   │
                    │                     │
                    │ • Connect           │
                    │ • Authenticate      │
                    │ • Reconnect         │
                    │ • Receive messages 
                        Validate , dedupe
                        Normalize the events to the frontend understand formats │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Event Pipeline    │
                    │                     │
                    │ Parse → Route       │
                    └──────────┬──────────┘
                           │
                           │
═══════════════════════════╪════════════════════════════
                           │
                    USER OPENS WATCHLIST
                           │
                           ▼

                    useWatchlist()
                           │
                           ▼

              marketOrchestrator.subscribe()
                           │
              ┌────────────┴─────────────┐
              │                          │
              ▼                          ▼
       marketApi                     websocketService
              │                          │
              ▼                          ▼
         REST Snapshot              SUBSCRIBE TCS
              │                          │
              │                          │
              ▼                          Market Store │
       MarketOrchestrator                │
              │                          │
              ▼                          │
         Market Store                    │
                                         │
═════════════════════════════════════════╪═══════════════
                                         │
                            LIVE PRICE UPDATE ARRIVES
                                         │
                                         ▼

                            socket.onmessage(message)
                                         │
                                         ▼

                                 JSON.parse()
                                         │
                                         ▼

                             listeners.forEach()
                                         │
                                         ▼

                    MarketOrchestrator.handleMarketEvent()
                                         │
                                         ▼

                              validate / deduplicate
                                         │
                                         ▼

                                   updateQuote()
                                         │
                                         ▼

                                  Market Store
                                         │
                                         ▼

                                   React UI


*/

// ----------------------------------------------------

/*
One WebSocket Service
        +
Multiple Orchestrators
        +
Multiple Related Topics per Orchestrator

*/

/*
Code structure

I would structure it like this:

services/
│
├── WebSocketService.js
│
├── eventPipeline/
│   ├── parseEvent.js
│   ├── validateEvent.js
│   ├── normalizeEvent.js ⭐
│   └── eventRouter.js
│
orchestrators/
│
├── MarketDataOrchestrator.js
├── OrderOrchestrator.js
└── PortfolioOrchestrator.js

*/
class WebSocketService {
  constructor(eventPipeline) {
    this.eventPipeline = eventPipeline;

    this.socket = new WebSocket("wss://example.com/ws");

    this.socket.onmessage = (message) => {
      this.eventPipeline.process(message.data);
    };
  }
}

class EventPipeline {
  constructor(eventRouter) {
    this.eventRouter = eventRouter;
  }

  process(rawMessage) {
    // 1. Parse
    const rawEvent = JSON.parse(rawMessage);

    // 2. Validate
    if (!rawEvent) {
      return;
    }

    // 3. Normalize
    const event = this.normalize(rawEvent);

    // 4. Route
    this.eventRouter.route(event);
  }

  normalize(rawEvent) {
    if (
      rawEvent.topic === "market" &&
      rawEvent.event === "tick"
    ) {
      return {
        type: "PRICE_UPDATE",
        symbol: rawEvent.data.s,
        price: rawEvent.data.ltp,
        timestamp: rawEvent.data.ts,
      };
    }

    return rawEvent;
  }
}

// ------------------------------------------------------------------------------

class EventRouter {
  constructor() {
    this.listeners = new Map();
  }

  on(eventType, listener) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }

    this.listeners
      .get(eventType)
      .add(listener);
  }

  route(event) {
    const listeners =
      this.listeners.get(event.type);

    listeners?.forEach((listener) => {
      listener(event);
    });
  }
}

/*
                         WATCHLIST UI > UI calls the hook
                              │
                              ▼
                       useWatchlist()
                              │
                              ▼
                   MarketDataOrchestrator   REST gives initial snapshot, Orchestrator subscribes for live updates
                       │              │
                       │              │
                 INITIAL DATA     LIVE DATA
                       │              │
                       ▼              ▼
                   Market API     WebSocketService 
                       │              │
                       │              │
                       ▼              ▼
                    REST API       socket.onmessage() -- Backend sends a WebSocket message
                       │              │
                       ▼              ▼
                  REST Snapshot    Raw WS Event
                       │              │
                       │              ▼
                       │         Event Pipeline  -- Event Pipeline processes it
                       │              │
                       │       Parse / Validate
                       │              │
                       │         Normalize  - Normalize to the  Frontend standard format
                       │              │
                       │              ▼
                       │         Event Router  -- Event Router routes to the right orchestrator (Where should this event go)
                       │              │
                       │              ▼
                       │      MarketDataOrchestrator  - Orchestrator receives the event
                       │              │
                       └──────────────┘
                              │ In-Memory Mutable Buffer, Batching / trottling
                              ▼
                         Market Store -- updates the coresponding store
                              │
                              ▼
                         React UI Update -- React UI updates

Event Router
      │
      ├── PRICE_UPDATE ──────► MarketDataOrchestrator
      │
      ├── ORDER_UPDATE ──────► OrderOrchestrator
      │
      └── PORTFOLIO_UPDATE ──► PortfolioOrchestrator

*/