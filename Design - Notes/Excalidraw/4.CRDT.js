/*
Conflict free replicated dtata types

1. Where does CRDT fit?

CRDT belongs in the collaboration/state layer, between mutations/events and the local Board Store.

                         Backend
                    ┌───────────────┐
                    │ Persistence   │
                    │ Relay / Sync  │
                    └───────┬───────┘
                            │
                       WebSocket
                            │
             ┌──────────────┴──────────────┐
             │                             │
        Alice Client                  Bob Client
             │                             │
      ┌──────▼──────┐              ┌──────▼──────┐
      │ CRDT Engine │              │ CRDT Engine │
      │             │              │             │
      │ local copy  │              │ local copy  │
      │ operations  │              │ operations  │
      │ merge rules │              │ merge rules │
      └──────┬──────┘              └──────┬──────┘
             │                             │
      ┌──────▼──────┐              ┌──────▼──────┐
      │ Board Store │              │ Board Store │
      └──────┬──────┘              └──────┬──────┘
             │                             │
             ▼                             ▼
             UI                            UI

----------------------------------------------
CRDT Engine is responsible for
1. Maintaining local replica
2. Creating operations for local changes
3. Applying local operations immediately
4. Receiving remote operations
5. Merging concurrent operations
6. Ensuring deterministic convergence

The WebSocket doesn't merge anything. It only transports operations.
------------------------------------------------------------------------
2. Medium Example — Two Rectangles [ no network]

Suppose the board initially contains:

{
  A: { id: "A", x: 100, y: 100 },
  B: { id: "B", x: 500, y: 100 }
}

Both Alice and Bob have the same replica:

Alice                         Bob

A → x:100                     A → x:100
B → x:500                     B → x:500

Now they work concurrently.

Alice moves rectangle A
Alice:
A.x = 200

Her CRDT generates:

{
  operationId: "alice-10",
  clientId: "alice",
  clock: 10,
  type: "MOVE",
  elementId: "A",
  x: 200
}

She immediately applies it locally:

Alice:

A → x:200
B → x:500
At the same time Bob moves rectangle B
Bob:
B.x = 700

His CRDT generates:

{
  operationId: "bob-8",
  clientId: "bob",
  clock: 8,
  type: "MOVE",
  elementId: "B",
  x: 700
}

Bob immediately applies it:

Bob:

A → x:100
B → x:700
------------------------------------------------------------------------
3. Now they reconnect

Operations go through the backend:

Alice
  │
  │ MOVE A → 200
  ▼
Backend
  │
  ├──────────────→ Bob
  │
  │
  └──────────────→ persistence


Bob
  │
  │ MOVE B → 700
  ▼
Backend
  │
  ├──────────────→ Alice
  │
  └──────────────→ persistence

Alice receives:

bobOperation

Her CRDT executes:

aliceCRDT.receiveOperation(bobOperation);

Result:

Alice:

A → x:200
B → x:700

Bob receives Alice's operation:

bobCRDT.receiveOperation(aliceOperation);

Result:

Bob:

A → x:200
B → x:700
Both replicas converge:
Alice                    Bob

A → 200                  A → 200
B → 700                  B → 700

        SAME STATE

That's the important CRDT property:

Different replicas can process operations independently and still deterministically converge to the same state.
---------------------------------------
4. Why merge on the frontend?

This is the key interview question.

Because each client owns a local replica of the document.

When a remote operation arrives, the client needs to answer:

"How should I combine this operation with the changes I already have locally?"

The CRDT gives the client that answer.

Local state
    +
Remote operation
    ↓
CRDT merge
    ↓
New local state

For example:

Alice's local state:

A → 200
B → 500

Remote operation:

B → 700

          ↓

CRDT merge

          ↓

A → 200
B → 700

The frontend can immediately update its own Board Store.
-----------------------------------------------------------------------
5. What if both modify the SAME rectangle?

This is where CRDT becomes more important.

Initial:

A.x = 100

Alice:

A.x = 200

Bob:

A.x = 300

These happen concurrently.

Alice CRDT              Bob CRDT

A → 200                  A → 300

Operations:

Alice:
{
  clientId: "alice",
  clock: 10,
  elementId: "A",
  x: 200
}

Bob:
{
  clientId: "bob",
  clock: 10,
  elementId: "A",
  x: 300
}

Suppose our simplified CRDT rule is:

higher clock wins
if clock is equal → clientId wins

Both clients receive both operations.

Alice:

200 vs 300
     ↓
deterministic rule
     ↓
Bob's operation wins
     ↓
A.x = 300

Bob:

300 vs 200
     ↓
same deterministic rule
     ↓
Bob's operation wins
     ↓
A.x = 300

Therefore:

Alice → A.x = 300
Bob   → A.x = 300

Again:

convergence.
------------------------------------------------------
6. Why not merge only on the backend?

You absolutely can design a system where the backend resolves conflicts.

That would look like:

Alice ──────┐
            │
            ▼
         Backend
       merge/resolve
            │
            ▼
       final state
            │
       ┌────┴────┐
       ▼         ▼
     Alice      Bob

That's a valid architecture.

But then the clients are not independently resolving concurrent operations.

With a CRDT:

Alice operation ──┐
                  ▼
              Alice CRDT
                  │
                  ▼
             Alice state


Bob operation ────┐
                  ▼
               Bob CRDT
                  │
                  ▼
              Bob state

Both independently apply the same deterministic rules.
--------------------------------------------------------------
7. The proof that frontend merge is necessary for a CRDT

This is the strongest way to think about it:

Suppose Alice is offline.
Alice
  │
  X  ← no network
  │
  ▼
Alice CRDT

A.x = 200

Bob is also offline:

Bob
  │
  X
  │
  ▼
Bob CRDT

A.x = 300

There is no backend available to merge anything at this moment.

Yet Alice can continue editing:

Alice:

move A
draw B
delete C
create D

The application must still maintain a valid local document.

That's why the CRDT lives locally:

                    INTERNET DOWN
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
       Alice CRDT                 Bob CRDT
            │                         │
            ▼                         ▼
       local state                local state
            │                         │
            ▼                         ▼
            UI                        UI

When connectivity returns:

Alice operations ──┐
                   ▼
                 Server
                   │
Bob operations ────┘
                   │
            relay operations
              ↙          ↘
        Alice CRDT      Bob CRDT
             ↓              ↓
          merge            merge
             ↓              ↓
          A=300            A=300

So the reason for frontend merging isn't simply "WebSocket needs it."

The real reason is:

The frontend owns a live local replica that can change independently of the server. Therefore, when remote operations arrive, the local replica needs deterministic merge rules to incorporate them.
------------------------------
One-line interview explanation

"I put the CRDT engine on each client because each client maintains a local replica of the board. Local and remote operations can arrive in any order, 
so the CRDT applies deterministic merge rules locally to ensure all replicas eventually converge. The backend primarily handles persistence, validation, synchronization, 
and relaying operations."

One nuance: frontend merge is not universally required for collaborative apps. 
A server-authoritative operational-transform or conflict-resolution architecture can merge on the backend. Frontend merging is required by the CRDT approach 
because the replica itself must be capable of accepting and merging operations independently.

-------------------------------------------

If we don't maintain a CRDT on the frontend, the application can still work. But then we need another mechanism to resolve concurrent changes.

The important point is:

CRDT is not mandatory for collaboration. Some conflict-resolution mechanism is mandatory.

Without frontend CRDT

Suppose:

Initial:
A.x = 100

Alice and Bob edit concurrently:

Alice → A.x = 200
Bob   → A.x = 300

Without CRDT, the frontend might simply do:

Alice:
local A.x = 200

Bob:
local A.x = 300

Then both send mutations to the server.

Alice ── A=200 ──→
                   Backend
Bob ───── A=300 ─→

Now the backend has to decide what happens.

For example, backend chooses:

latest server operation wins

So:

A.x = 300

Then backend broadcasts:

A.x = 300

to everyone.

What problem does this create?

The biggest problem is local state can temporarily diverge.

Alice                    Bob

A.x = 200                A.x = 300
   │                         │
   └──────── Backend ────────┘
              │
          resolves
              │
          A.x = 300
              │
       broadcast result
          ↙       ↘
       Alice      Bob
        300        300

Eventually they converge, but the backend is responsible for resolving the conflict.

That's perfectly valid.

The bigger problem: offline editing

Now imagine Alice goes offline.

Alice
  │
  X ← network unavailable
  │
  ▼
A.x = 200

She can still modify her local Board Store.

But if Bob also modifies the same object:

Bob:
A.x = 300

there is no backend available to immediately resolve the conflict.

Alice's frontend doesn't have CRDT merge rules, so it basically has to wait for the server.

When Alice reconnects:

Alice ── A=200 ──→ Server
Bob   ── A=300 ──→ Server

Now server must resolve them.

This can work, but the server becomes the central conflict-resolution authority.

So there are two valid architectures

---------------------Option 1 — CRDT
Frontend                    Backend

CRDT                        Persistence
 ↓                          Validation
Merge                       Relay
 ↓
Board Store

Each client can independently merge operations.

Alice CRDT ──┐
             ├── eventually converge
Bob CRDT ────┘

---------------------------Option 2 — Server authoritative

Frontend                    Backend

Board Store ──operation──→ Resolve conflict
                          ↓
                       final state
                          ↓
                    broadcast result
                          ↓
                     Frontends

No frontend CRDT is required.

The key takeaway for your notes
NO CRDT ≠ NO COLLABORATION

Without CRDT:
    Backend must resolve conflicts.

With CRDT:
    Each frontend replica can resolve/merge
    operations deterministically.

---------------------------------------------------------------------------------------------

So who updates the backend?

Every client sends operations.

Not the final state.

Alice
   │
   │ operation
   ▼
Backend
   │
   ├── persist operation
   └── broadcast operation


Bob
   │
   │ operation
   ▼
Backend
   │
   ├── persist operation
   └── broadcast operation

The backend assigns the authoritative revision:

Alice operation → revision 51
Bob operation   → revision 52

That gives us a canonical history.

But then what does "Bob wins" actually mean?

Suppose:

Alice: A.x = 200
Bob:   A.x = 300

CRDT rule says Bob's operation wins.

That does NOT mean Bob sends A.x=300 as the final state.

It means:

Operations:
Alice → A=200
Bob   → A=300

             ↓
        CRDT algorithm

             ↓

Result:
A=300

Any client that has both operations gets A=300.

-------------------------------------------------------------------------------
The backend can also materialize/maintain the same CRDT state if needed for efficient snapshots, but Bob isn't responsible for updating it with his merged state.

-------------------------------------------------------------------------------
*/