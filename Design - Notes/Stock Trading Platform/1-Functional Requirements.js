
/*
Functional Requirements

Let's design a simplified real-time stock trading platform with these 5 core features:

1. Watchlist

Users can:

See their selected stocks
Add/remove stocks
See live price
See price change (%)

Example:

WATCHLIST

TCS          ₹3,200.50    +1.2%
RELIANCE     ₹1,450.20    -0.8%
INFOSYS      ₹1,550.00    +2.1%
Why important for frontend?

Because multiple stocks receive real-time price updates simultaneously.
------------------------------------------
2. Stock Details Page

When the user clicks a stock:

TCS

They can see:

Current price
Price change
Basic chart
Buy/Sell CTA
TCS

₹3,200.50
+1.2%

   📈 Chart

[ BUY ]  [ SELL ]
Why important?

This introduces:

Real-time data
Charts
Historical data + live updates
------------------------------------------
3. Buy / Sell Order

User can place an order.

For interview simplicity, support:

Market order
Limit order
Quantity
BUY TCS

Quantity: [ 10 ]

Order Type:
(•) Market
( ) Limit

[ PLACE ORDER ]
Why important?

This introduces:

Mutations
Optimistic updates
Idempotency
Duplicate order prevention
Async order lifecycle
------------------------------------------------------------------------------------
4. Orders Screen

Users can track their orders.

Example:

TCS

Buy 10

Status: PENDING

Later:

Status: FILLED

Or:

Status: REJECTED
Why important?

Because order status may change asynchronously.

REST mutation
     ↓
Order created
     ↓
WebSocket event
     ↓
Status change
------------------------------------------
5. Manage Portfolio

Users can see their holdings.
Track profits / losses

PORTFOLIO

TCS
10 shares
Current Value: ₹32,000
Profit: +₹2,000

Reliance
20 shares
Current Value: ₹29,000
Profit: +₹1,500
Why important?

Portfolio value depends on live market prices.

Price Update
     ↓
Holding Value changes
     ↓
Total Portfolio changes

This gives us an excellent frontend discussion around derived state.

*/