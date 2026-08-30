/*
EX - Trading

Imagine:

WebSocket disconnects

What should happen?

Connection lost
      ↓
Mark connection as OFFLINE
      ↓
Stop assuming prices are fresh
      ↓
Reconnect with backoff
      ↓
Reconnect successful
      ↓
Resubscribe all active symbols
      ↓
Fetch latest snapshot
      ↓
Reconcile snapshot with events
      ↓
Mark connection LIVE

This workflow involves:

Connection Manager
Subscription Manager
Market API
Market Store
WebSocket

Would you put all this in:

useStock()

❌ No.

This is application-level coordination.

So:

Connection Manager
        ↓
Market Orchestrator
        ↓
Resubscribe active symbols
        ↓
Fetch latest snapshot
        ↓
Update Market Store

This is a very strong justification for the orchestrator.
-------------------------------------------------------------
So what exactly should be inside the Orchestrator?

For our trading application:

1. Coordinate multiple data sources

Example:

REST snapshot
     +
WebSocket updates
     ↓
Market Data Store

-------------------------------------------------------------

2. Subscription lifecycle
Component opens
      ↓
Subscribe symbol

Multiple consumers
      ↓
Reference counting

Last consumer leaves
      ↓
Unsubscribe

-------------------------------------------------------------
3. Event ordering and consistency

Example:

REST Snapshot

Price = ₹100
sequence = 100

Then WebSocket:

sequence 101 → ₹101
sequence 102 → ₹102

Orchestrator/event layer ensures:

Old event should not overwrite new state
-------------------------------------------------------------
4. Cross-domain workflows

Example:

Order Filled
      ↓
Update Order Store
      +
Update Portfolio
      +
Update Position
      +
Show Notification

One event affects multiple domains.

That's orchestration.
-------------------------------------------------------------

5. Reconnection workflows
Disconnect
   ↓
Reconnect
   ↓
Resubscribe
   ↓
Snapshot
   ↓
Reconcile

-------------------------------------------------------------
6. Centralized side effects

Instead of:

useWatchlist
usePortfolio
useStock
useOrders

all independently performing complicated WebSocket logic:

Hooks
  ↓
Orchestrator
  ↓
Centralized coordination
The best mental model

I would remember this:

Service
=
Does ONE thing

API Service
→ Fetches data

WebSocket Service
→ Sends / receives messages

Store
→ Stores state

Hook
→ React-friendly interface

Orchestrator
→ Coordinates multiple services/stores
   for a business workflow
Architecture comparison
Simple application

You don't need an orchestrator.

Component
   ↓
Hook
   ↓
API
   ↓
State

Good enough.

Complex real-time application
Component
   ↓
Hook
   ↓
Orchestrator
   ├── API Service
   ├── WebSocket Service
   ├── Subscription Manager
   ├── Event Pipeline
   ├── Stores
   └── Persistence

The orchestrator exists because the workflow is now bigger than a single hook.
*/