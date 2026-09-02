/*
Real-Time Stock Updates

The trading UI needs continuously changing data such as:

Stock price
Order book
Order status
Portfolio updates
Trade executions

There are 3 common approaches:

1. Polling

Client repeatedly asks the server for updates.

Browser                    Server
   │                         │
   │──── GET /quotes ───────►│
   │◄──── price = 3200 ──────│
   │                         │
   │     wait 1 second        │
   │                         │
   │──── GET /quotes ───────►│
   │◄──── price = 3205 ──────│
   │                         │
   │     wait 1 second        │
   │                         │
   └───────────────...

Example:

setInterval(() => {
  fetch("/api/quotes?symbol=TCS");
}, 1000);
Problems
• Unnecessary requests when nothing changes
• Updates are delayed until next poll
• High server/network load
• Poor fit for high-frequency price updates

Good for:

Low-frequency data
Notifications
Simple dashboards
2. Server-Sent Events (SSE)

Server keeps an HTTP connection open and pushes events to the browser.

Browser                    Server
   │                         │
   │────── Connect ─────────►│
   │                         │
   │◄──── PRICE_UPDATED ─────│
   │                         │
   │◄──── PRICE_UPDATED ─────│
   │                         │
   │◄──── PRICE_UPDATED ─────│
   │                         │
   └─────────────────────────┘

Frontend:

const source = new EventSource("/api/market-stream");

source.onmessage = (event) => {
  console.log(event.data);
};
Advantages
• Server → client push
• Simple browser API
• Works over HTTP
• Automatic reconnection support
Limitations
• Primarily one-way: server → client
• Client cannot use the same connection
  for bidirectional communication

SSE can work well when the client only needs to receive updates.

3. WebSocket ⭐

WebSocket creates a persistent bidirectional connection.

Browser                    Server
   │                         │
   │◄──── WebSocket ────────►│
   │                         │
   │◄──── PRICE_UPDATED ─────│
   │                         │
   │──── SUBSCRIBE TCS ─────►│
   │                         │
   │◄──── PRICE_UPDATED ─────│
   │                         │
   │──── UNSUBSCRIBE TCS ───►│
   │                         │

This is particularly useful for a trading application.

Why WebSocket for Stock Prices?

Because we have continuous, low-latency, bidirectional realtime communication.

For example:

Client
   │
   │ SUBSCRIBE
   │ TCS + INFY
   ▼
Server
   │
   ├── PRICE_UPDATED TCS
   ├── PRICE_UPDATED INFY
   ├── ORDER_BOOK_UPDATED TCS
   ├── ORDER_UPDATED order_123
   └── ...

The client can also dynamically subscribe/unsubscribe:

User opens TCS
      ↓
SUBSCRIBE TCS

User opens INFY
      ↓
SUBSCRIBE INFY

User closes TCS
      ↓
UNSUBSCRIBE TCS
Comparison
	Polling	SSE	WebSocket
Connection	Repeated HTTP requests	Persistent HTTP	Persistent connection
Server → Client	✅	✅	✅
Client → Server	Request-based	❌	✅
Realtime	❌	✅	⭐⭐⭐
Bidirectional	❌	❌	✅
Low latency	❌	Good	Excellent
Dynamic subscriptions	Awkward	Possible but limited	✅
Trading app	❌	Possible	⭐ Best fit

*/