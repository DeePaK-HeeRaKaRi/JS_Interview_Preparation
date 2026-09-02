
/*

Get current user info
GET /api/me

{
  "id": "user_123",
  "name": "Deepak",
  "email": "deepak@example.com",
  "accountStatus": "ACTIVE"
}

Maps directly to:

interface User {
  id: string;
  name: string;
  email: string;
  accountStatus: "ACTIVE" | "BLOCKED";
}

Search instruments

GET /api/instruments?search=TCS  > Instrument[]

Quotes

GET /api/quotes?instrumentIds=inst_123,inst_456 > Quote[]

Authentication
├── GET  /me

Instruments
├── GET  /instruments
├── GET  /instruments/:id

Market Data
├── GET  /quotes?instrumentIds=...
├── GET  /charts/:instrumentId

Watchlist
├── GET    /watchlists
├── POST   /watchlists
├── POST   /watchlists/:id/instruments
├── DELETE /watchlists/:id/instruments/:instrumentId

Orders
├── GET    /orders
├── POST   /orders
├── DELETE /orders/:id

Portfolio
├── GET /portfolio
├── GET /holdings

However, I would NOT necessarily put userId in the URL/query from the frontend.

Instead of:

GET /api/holdings?userId=user_123

a production API would often use the authenticated session/token:

GET /api/holdings
Authorization: Bearer <token>

-------------
Why do we need REST if we have WebSocket?

Very important interview point:

REST
  ↓
Initial snapshot


WebSocket
  ↓
Realtime updates

For example:

Page loads
   ↓
GET /quotes
   ↓
Current TCS price = ₹3210
   ↓
Connect/subscribe WebSocket
   ↓
PRICE_UPDATED → ₹3212
   ↓
PRICE_UPDATED → ₹3215
   ↓-
----------------------------------------------

Historical Chart Data

This is another important API.

GET /api/instruments/inst_123/candles?interval=1m&from=...&to=...

-----------------------
One important nuance

The API response does not have to exactly equal your frontend entity.

For example, backend could return:

{
  "data": [...],
  "pagination": {
    "nextCursor": "abc123"
  }
}

Your frontend can extract:

Order[]

and separately store:

nextCursor

------------------------------------------

WebSocket Interface

Now we move from request/response to event streaming.

Connection:

wss://api.example.com/market

After connecting, frontend can subscribe:

{
  "action": "SUBSCRIBE",
  "channels": [
    {
      "type": "QUOTE",
      "instrumentIds": [
        "inst_123",
        "inst_456"
      ]
    }
  ]
}

Server sends:

Price update
{
  "type": "PRICE_UPDATED",
  "entityId": "inst_123",

  "payload": {
    "price": 3215.5,
    "volume": 1255000
  },

  "sequence": 10231,
  "timestamp": 1725000123500
}
Order update
{
  "type": "ORDER_UPDATED",
  "entityId": "order_123",

  "payload": {
    "status": "PARTIALLY_FILLED",
    "filledQuantity": 5,
    "remainingQuantity": 5
  },

  "sequence": 10232,
  "timestamp": 1725000123600
}

wss://api.example.com/market
             │
             │ ONE WebSocket connection
             │
             ├── QUOTE
             │     ├── TCS
             │     └── INFY
             │
             ├── ORDER_BOOK
             │     └── TCS
             │
             ├── ORDER
             │     ├── order_123
             │     └── order_456
             │
             └── PORTFOLIO
                   └── user_123
*/