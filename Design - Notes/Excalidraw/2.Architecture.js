/*

------- Get the board state ------
                    USER OPENS BOARD
                           │
                           ↓
                         UI
                           │
                           ↓
                    useBoardInfo()
                           │
                           ↓
                  React Query / Fetch
                           │
                           ↓
                      API Service
                           │
                           ↓
                       Backend
                           │
                           ↓
                    Board Snapshot
                           │
                           ↓
                  Hydrate Board Store
                           │
                           ↓
                    Board is ready


                    Then why do we need React Query?

This is the important question.

You might say:

"If Board Store is the source of truth, why don't I just fetch using fetch() and put the response directly into Board Store?"

You absolutely can.

And for a frontend system-design interview, that's actually a perfectly reasonable option.

React Query gives us convenient server-state mechanics:

GET request
   │
   ├── loading
   ├── error
   ├── retry
   ├── deduplication
   └── cache

For example:

const { data, isLoading, error } = useQuery({
  queryKey: ['board', boardId],
  queryFn: () => getBoard(boardId)
});

Then:

useEffect(() => {
  if (data) {
    boardStore.hydrate(data);
  }
}, [data]);

---------------Important 
But here's the important distinction

Once collaboration starts, WebSocket updates should NOT normally go into React Query cache first.

Suppose the initial state is:

revision = 42

React Query gets:

e1 → rectangle
e2 → circle
e3 → text

We hydrate:

Board Store
    ↓
revision 42

Then Alice moves e2.

WebSocket receives:

{
  type: "ELEMENT_UPDATED",
  revision: 43,
  elementId: "e2",
  changes: {
    x: 500,
    y: 300
  }
}

We do:

WebSocket
    ↓
Orchestrator
    ↓
Board Store
    ↓
elements.get("e2").x = 500

Not:

WebSocket
    ↓
React Query Cache
    ↓
Board Store

That would unnecessarily introduce another layer into every real-time update.

-------------------ORCHESTRAATOR------------------
What exactly is the Orchestrator doing?

Think of the orchestrator as the coordinator, not the component doing all the work.

For example:

User opens board
       ↓
BoardOrchestrator.start(boardId)
       ↓
ConnectionManager.connect()
       ↓
SubscriptionManager.subscribe(boardId)
       ↓
Events start arriving
       ↓
EventProcessor.process(event)
       ↓
BoardStore.apply(event)

If connection dies:

ConnectionManager
       ↓
"disconnected"
       ↓
BoardOrchestrator
       ↓
reconnect
       ↓
resync
       ↓
resume events

-------------------------Then who calls REST after reconnect?

This is the interesting part.

I wouldn't say:

"Connection Manager calls REST API."

Instead:

Connection Manager
       │
       │ disconnected/reconnected
       ↓
Board Orchestrator
       │
       │ "We may have missed events"
       ↓
Sync Engine
       │
       ├── determine missing revision
       │
       ├── fetch missing events
       │       OR
       │
       └── fetch latest snapshot
               ↓
           Board Store

So the Connection Manager reports lifecycle events, while the Orchestrator coordinates recovery.


-----------Why do we need REST after reconnect?

Suppose:

Client revision = 42

WebSocket disconnects.

While disconnected:

Server:
43
44
45
46

When we reconnect, we don't want to blindly assume we're synchronized.

We need to determine:

Client: 42
Server: 46

Then recover:

43 → 44 → 45 → 46

If the server supports event replay, great:

GET /boards/123/events?fromRevision=43

Otherwise:

GET /boards/123

and replace/reconcile with a fresh snapshot.

So I would call this component something like:

Sync Engine

rather than putting all of this responsibility into the event pipeline.
------------------------
                    BoardOrchestrator
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ↓                ↓                ↓
 ConnectionManager   SubscriptionManager   SyncEngine
          │                │                │
          │                │                │
          ↓                ↓                ↓
      WebSocket       board:123 topic    REST / replay
          │                                 │
          └───────────────┬─────────────────┘
                          ↓
                   Event Pipeline
                          │
             ┌────────────┼────────────┐
             ↓            ↓            ↓
          Validate      Dedupe        Order
                          │
                          ↓
                     Transform
                          │
                          ↓
                     Board Store

-----------------How to detect the missed events

          REST Snapshot
               │
               ↓
          revision = 42
               │
               ↓
        lastApplied = 42
               │
               ↓
         WebSocket events
               │
       ┌───────┴────────┐
       ↓                ↓
 revision 43       revision 45
       │                │
       ↓                ↓
  42 + 1 = 43      45 != 43
       │                │
       ↓                ↓
    APPLY             GAP!
                        │
                        ↓
                   Sync Engine
                        │
                  fetch 43-44
                        │
                        ↓
                  apply 43,44,45

"I have successfully applied everything through revision 42. Give me events after 42."

So the subscription could conceptually be:

{
  action: "subscribe",
  topic: "board:123",
  lastAppliedRevision: 42
}

Then the server sends:

43
44
45
46
...

and the client applies them sequentially.

Client
lastAppliedRevision = 42
        │
        │ subscribe(fromRevision: 42)
        ↓
     Server
        │
        ├── event 43
        ├── event 44
        └── event 45
For a given board topic, the server emits events with monotonically increasing revisions, and a single WebSocket connection preserves their order.
*/