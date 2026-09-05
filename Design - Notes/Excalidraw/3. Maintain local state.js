/*
Now assume user  a (me) editing something that need sto be updated to user b(the above will works) but how will I update my own state ? 
DoI need to do any optimistic updates ? cause the board state should be the single source of truth. 

Optimistically update the local Board Store for responsiveness, but distinguish local pending changes from server-confirmed state.
We should not wait for the server to update User A's UI. That would make dragging feel terrible.


1. User A moves an object

Suppose:

Board Store

e1 → rectangle
    x: 100
    y: 200

Alice drags it to:

x: 300
y: 400

The flow is:

User A drags
     ↓
Local mutation
     ↓
Board Store
     ↓
UI immediately reflects x=300,y=400
     ↓
Send operation to server

So yes:

Optimistic update
boardStore.applyLocalMutation({
  mutationId: "m123",
  type: "MOVE_ELEMENT",
  elementId: "e1",
  changes: {
    x: 300,
    y: 400
  }
});

Then:

Board Store
    ↓
e1 = { x: 300, y: 400 }

------------------------------------------
2. But doesn't this violate "server is the source of truth"?

This is the subtle distinction.

I'd say:

The server is the authoritative source of truth, while the Board Store is the client-side source of truth for what the UI currently renders.

Those are different concepts.

               Server
          Authoritative state
                  │
                  │ events
                  ↓
             Board Store
          Client-side state
                  │
                  ↓
                  UI

While an operation is pending:

Server:      x = 100
Client:      x = 300  ← optimistic

That's okay temporarily.

Once the server accepts it:

Server revision 43
       ↓
event
       ↓
Client confirms mutation

Now both agree:

Server:  x = 300
Client:  x = 300

-------------------------------------------------------

We need a mutationId

This is extremely important.

When Alice performs the mutation:

{
  mutationId: "m123",
  type: "MOVE_ELEMENT",
  elementId: "e1",
  changes: {
    x: 300,
    y: 400
  }
}

The server processes it and produces:

{
  eventId: "evt789",
  mutationId: "m123",
  revision: 43,
  type: "MOVE_ELEMENT",
  elementId: "e1",
  changes: {
    x: 300,
    y: 400
  }
}

Now Alice receives the same event that Bob receives.

4. What happens on User A?

Alice already applied:

m123
 ↓
local optimistic update
 ↓
x = 300

Then WebSocket delivers:

mutationId = m123
revision = 43

Alice says:

"That's my mutation. I've already applied the optimistic version."

So she doesn't apply it a second time.

Conceptually:

                 WebSocket event
                       │
                       ↓
                mutationId=m123
                       │
                ┌──────┴──────┐
                ↓             ↓
             My mutation   Other user's
                │             mutation
                ↓             ↓
             confirm        apply

This is where the mutationId is useful.

-----------------------------

Broadcast:

{
  mutationId: "m123",
  revision: 43,
  type: "UPDATE_ELEMENT",
  elementId: "e1",
  changes: { x: 300 }
}

Alice receives it:

mutationId = m123
revision = 43

She recognizes:

"This is my pending mutation."

So she confirms/reconciles it:

Board Store

revision = 43       ✅
e1 → x:300          ✅
m123 → confirmed    ✅

Bob receives the same event:

revision = 43
e1 → x:300

and applies it normally.

So think of the state as
Board Store
│
├── document
│     └── elements
│
├── lastAppliedRevision
│     └── 43
│
└── pendingMutations
      └── m123

During the optimistic period:

revision = 42
pending = [m123]

After server acknowledgement:

revision = 43
pending = []

This distinction is very important.

You don't want:

local optimistic update
      ↓
revision++

because the client shouldn't invent server revisions.

Instead:

Local action
    ↓
optimistic Board Store update
    ↓
pending mutation
    ↓
Server
    ↓
authoritative revision assigned
    ↓
WS event
    ↓
reconcile + advance revision

------------------------------------------------------------------

1. Pending mutation is local to User A

When Alice does:

Alice moves e1
      ↓
mutationId = m123
      ↓
pendingMutations[Alice]
      ↓
optimistic update

pendingMutations is NOT broadcast.

It's local client bookkeeping:

Alice                         Bob
─────                         ───
pending: m123                 pending: {}
e1.x = 300                    e1.x = 100

Alice sends the mutation to the server:

Alice ───── m123 ─────→ Server
-------------------
2. Server broadcasts the resulting event to the board topic

The server accepts it and assigns:

revision = 43

Then publishes:

board:123
   │
   ├──→ Alice
   ├──→ Bob
   └──→ Charlie

The event contains:

{
  "eventId": "evt789",
  "mutationId": "m123",
  "revision": 43,
  "type": "MOVE",
  "elementId": "e1",
  "changes": {
    "x": 300
  }
}

So yes, the same event goes to all users subscribed to board:123, including Alice.
                    Alice
                      │
                 Move element
                      │
                      ↓
              mutationId=m123
                      │
            ┌─────────┴─────────┐
            │                   │
            ↓                   ↓
       Board Store        Pending Mutations
       e1.x = 300              m123
            │
            ↓
          Server
            │
       assign revision 43
            │
            ↓
     board:123:events
            │
       ┌────┼────┐
       ↓    ↓    ↓
    Alice  Bob  Charlie
       │    │      │
       │    │      │
   m123?   m123?  m123?
    YES     NO     NO
     │       │      │
     ↓       ↓      ↓
 CONFIRM   APPLY   APPLY
     │       │      │
     └───────┴──────┘
             ↓
        revision 43


                        ┌────────────────────┐
REST Snapshot ──────→│                    │
                     │    Board Store     │────→ Render Engine
WS Events ──────────→│  Source of Truth   │
                     │                    │
Local Mutations ────→│                    │
                     └────────────────────┘

*/