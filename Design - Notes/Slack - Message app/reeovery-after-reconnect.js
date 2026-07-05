/*
Responsibilities
Chat Controller

Owns:

Connection lifecycle
Detect disconnect
Reconnect
Re-subscribe to conversations
Trigger catch-up sync
Realtime Event Pipeline

Owns:

Processing incoming events
Validate
Dedupe
Order
Transform
Persist
Recovery flow

Imagine WiFi goes off for 20 seconds.

Connection Lost
      │
      ▼
Connection Manager
      │
      ▼
Reconnect
      │
      ▼
Re-subscribe(chat123)
      │
      ▼
GET /events?after=lastSyncToken
      │
      ▼
Realtime Event Pipeline
      │
Validate
Deduplicate
Order
Transform
      │
      ├────► IndexedDB
      └────► React Query

Notice:

The controller starts recovery, but the pipeline processes the recovered events.

I would answer an interviewer like this:

"The controller is responsible for reconnecting and resubscribing, while the realtime pipeline processes the missed events returned after the last sync token."
Option 2: App is CLOSED / Background

Suppose:

User sends an image
Closes the browser tab
Network comes back later

Now there is no Chat Controller.

There is no Message Sync Manager running.

Who retries?

Browser
     │
     ▼
Service Worker
     │
Background Sync Event
     │
     ▼
Read IndexedDB Outbox
     │
     ▼
Retry Upload / HTTP Request

Here the Service Worker becomes useful.

*/