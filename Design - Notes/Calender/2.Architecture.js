/*
offline flow

User drags event while OFFLINE
              │
              ▼
        Presentation UI
              │
              ▼
            Hook
              │
              ▼
         Controller
          /       \
         /         \
        ▼           ▼
React Query      Offline Manager
Optimistic       │
Update            │
                  ▼
              IndexedDB
                  │
              ┌───┴────┐
              │ Outbox │
              └───┬────┘
                  │
                  ▼
        Register Background Sync
                  │
                  ▼
       ┌──────────────────────┐
       │ USER CLOSES TAB      │
       │                      │
       │ React app gone       │
       │ IndexedDB remains    │
       │ Service Worker       │
       │ remains registered   │
       └──────────┬───────────┘
                  │
                  │ Network becomes available
                  ▼
          Browser schedules
          Background Sync
                  │
                  ▼
           Service Worker
                  │
                  ▼
            Sync Manager
                  │
                  ▼
          Read IndexedDB Outbox
                  │
                  ▼
            Replay mutation
                  │
                  ▼
             API Service
                  │
                  ▼
            Network / HTTP
                  │
                  ▼
               Backend
              /       \
             /         \
        SUCCESS       409 CONFLICT
           │               │
           ▼               ▼
    Remove from       Keep/mark failed
       Outbox         + notify user
           │               │
           ▼               ▼
   Update/Invalidate    User resolves
   React Query Cache      conflict


The Background Sync API is the mechanism we use: we register a sync tag, and the browser can dispatch the Service Worker's sync event when connectivity is available.

We can additionally use:

window.addEventListener("online", ...)

while the app is open, but that isn't what gives us the closed-tab guarantee.

------------------------------------------
Conflict → 409

Yes — I agree with your approach.

For example:

Client:
event version = 10

Backend:
event version = 11

The client tries:

PATCH /events/123
If-Match: "10"

Backend sees:

Current version = 11
Client version  = 10

and returns:

409 Conflict

Response could contain:

{
  "error": "EVENT_CONFLICT",
  "serverEvent": {
    "id": "123",
    "startTime": "11:00",
    "endTime": "12:00",
    "version": 11
  }
}

Then:

Service Worker
      ↓
409
      ↓
Mark mutation = CONFLICT
      ↓
Don't blindly retry
      ↓
When Calendar UI is available
      ↓
Show conflict UI

For example:

┌─────────────────────────────────┐
│ Event was changed by someone    │
│ else while you were offline.    │
│                                 │
│ Your change: 10:00 - 11:00      │
│ Server version: 11:00 - 12:00   │
│                                 │
│ [Keep Mine] [Keep Server]       │
│ [Merge]                         │
└─────────────────────────────────┘

Don't use Last-Write-Wins blindly for calendar mutations. For an interview, version/ETag-based conflict detection + 409 + explicit user resolution is a much stronger design.
----------------------------------------------------------
What exactly goes into IndexedDB?

For our design, I'd keep the outbox record something like:

{
  mutationId: "mut_123",

  operation: "UPDATE_EVENT",

  eventId: "event_456",

  payload: {
    startTime: "...",
    endTime: "..."
  },

  baseVersion: 10,

  status: "PENDING",

  createdAt: 1786123456,

  retryCount: 0
}

Notice:

Don't put the entire React Query cache into the outbox.

The outbox is specifically for durable pending mutations.

-----------------------------

IMPORTANT READ

For an offline mutation, I immediately update React Query optimistically and persist the mutation to an IndexedDB outbox. 
I then register a Background Sync task with the Service Worker. 
This is important because the Calendar tab can be closed and the mutation still survives in IndexedDB. 
When the browser gets an opportunity to run the background sync after connectivity is available, the Service Worker reads the outbox and replays the mutations through the API. 
Successful mutations are removed from the outbox. 
If the server detects a stale version, it returns 409; we persist that conflict rather than retrying blindly, 
and when the user next opens Calendar we present the conflicting versions and let them resolve it.

Key Takeaways for Your Interview Answer:
1)The Bridge between Main Thread & Background: The Offline Orchestrator running on the main UI thread writes to IndexedDB and triggers reg.sync.register(). 
This hands control over to the Service Worker.

2)Why Tab Closure Doesn't Break It: The Service Worker is managed by the browser process engine, not the tab rendering engine.
 The sync event fires at the OS/Browser level as soon as the network interface detects connectivity, regardless of whether the UI tab is open.
 
3)Queue Idempotency: The API Service sends mutations in sequential FIFO order. If a mutation fails or returns a conflict ($409$), 
the Service Worker pauses processing and flags the task in IndexedDB so the UI can prompt the user for manual conflict resolution when the app is next opened.

*/