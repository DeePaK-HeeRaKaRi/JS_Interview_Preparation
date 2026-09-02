/*
                    FRONTEND DATA MODEL
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    SERVER ENTITIES    REALTIME EVENTS     UI STATE
          │                │                │
          │                │                │
     Instrument          PRICE_UPDATED     selectedStock
     Quote               ORDER_UPDATED     activeTab
     Order               HOLDING_UPDATED   modal
     Holding             etc.              filters
     Portfolio
     Watchlist
          │
          ▼
   NORMALIZED STORE
          │
          ▼
   Custom Hooks
          │
          ▼
          UI


--------------------1. Server Data Model---------------------------------

interface User {
  id: string;
  name: string;
  email: string;
  mobile: number
  accountStatus: "ACTIVE" | "BLOCKED";
}

// Instrument = Stock/security that can be traded
interface Instrument {
  id: string;
  symbol: string;  // TCS
  name: string;  // Tata Consultancy  Services
  exchange: "NSE" | "BSE"; // Where it is traded
  segment: "EQUITY" | "DERIVATIVE";
  isin?: string;
}

interface Quote {
  // Which stock/instrument this quote belongs to > Example: "instrument_123" → TCS
  instrumentId: string;

  // Current/latest traded price of the stock > Example: TCS is currently trading at ₹3210.50
  price: number;

  // Price at which the stock started trading today > Example: ₹3180
  open: number;

  // Highest price reached by the stock during today's trading session >Example: ₹3235 
  high: number;

  // Lowest price reached by the stock during today's trading session > Example: ₹3165
  low: number;

  // Previous trading day's closing price
  // Used to calculate today's gain/loss > Example: Yesterday TCS closed at ₹3195
  previousClose: number;

  // Total number of shares/contracts traded so far today
  // Example: 1,250,000 shares
  volume: number;

  // When this quote was generated/updated
  // Usually Unix timestamp in milliseconds
  timestamp: number;
}

why instrument & quote are two different entities ?
An instrument tells us what the stock is.
Quote tells us what is happening with that stock in the market right now. [ Keeps on changing ] The price may change hundreds/thousands of times, while the identity information doesn't.


interface Order {
  userId: string;
  clientOrderId: string;
  instrumentId: string;

  side: "BUY" | "SELL";
  quantity: number;
  orderType: "MARKET" | "LIMIT" | "STOP_LOSS";
  price?: number;

  status:
    | "PENDING"
    | "OPEN"
    | "PARTIALLY_FILLED"
    | "FILLED"
    | "CANCELLED"
    | "REJECTED";

  createdAt: number;
}

interface Holding {
    userId: string // 👈 Which user's holding?
  instrumentId: string;   // 👈 Which stock?
  quantity: number;
  averagePrice: number;

  currentPrice: number;
  investedValue: number;
  currentValue: number;

  profitLoss: number;
  profitLossPercent: number;
}

interface Portfolio {
  userId: string;

  totalInvested: number;
  currentValue: number;
  totalProfitLoss: number;

  holdingInstrumentIds: string[];
}

interface Watchlist {
  id: string;
  name: string;
  instrumentIds: string[];
}

---------------------2. Event Data Model-----------------------------

Every realtime event should ideally contain:

interface BaseEvent {
  type: string;
  entityId: string;
  sequence: number;
  timestamp: number;
  payload: unknown;
}

interface PriceUpdatedEvent extends BaseEvent {
  type: "PRICE_UPDATED";

  entityId: string; // instrumentId

  payload: {
    price: number;
    volume: number;
  };
}

interface OrderUpdatedEvent extends BaseEvent {
  type: "ORDER_UPDATED";

  entityId: string; // orderId

  payload: {
    status: Order["status"];
    filledQuantity: number;
    remainingQuantity: number;
  };
}
 

-----------------------UI state represents frontend-owned interaction/presentation state.----------------------

interface UIState {
  selectedInstrumentId: string | null;

  activeTab: "CHART" | "ORDER_BOOK" | "NEWS";

  orderModal: {
    open: boolean;
    side: "BUY" | "SELL" | null;
    instrumentId: string | null;
  };

  filters: {
    orderStatus?: Order["status"];
    exchange?: string;
  };

  sort: {
    field: string;
    direction: "asc" | "desc";
  };

  chart: {
    timeframe: "1D" | "1W" | "1M" | "1Y";
  };

  preference: light | dark
}

-------------------------------------------------------------

------Normalized Server State--------
interface ServerState {
  usersById: Record<string, User>;

  instrumentsById: Record<string, Instrument>;

  quotesByInstrumentId: Record<string, Quote>;

  ordersById: Record<string, Order>;

  holdingsByInstrumentId: Record<string, Holding>;

  portfoliosByUserId: Record<string, Portfolio>;

  watchlistsById: Record<string, Watchlist>;

  orderBooksByInstrumentId: Record<string, OrderBook>;
}
  ------------------------------------

  INSTRUMENT
"What is it?"
        ↓
TCS
NSE
Equity
Tata Consultancy Services


QUOTE
"What's happening to it?"
        ↓
₹3215
Today's high ₹3235
Today's low ₹3165
Volume 12.5L
*/