/*
Step 1

User starts dragging.

UI

↓

Client State

draggingCard = card10

isDragging = true

React Query doesn't change yet.

Step 2

User drops card.

Controller receives

moveCard(card10, "inprogress")
Step 3

Immediately optimistic update

Update React Query

Todo

Card A

↓

InProgress

Card A

No waiting.

User sees instant movement.

Step 4

Clear drag state

Update Zustand

draggingCard = null

hoverColumn = null

isDragging = false
Step 5

Send API

PATCH /cards/10

{
   columnId:"inprogress"
}
Step 6

Backend saves

Database updated.

Step 7

Backend broadcasts WebSocket

{
   type:"CARD_MOVED",
   cardId:10,
   columnId:"inprogress"
}
Step 8

Other clients

Receive WS event

↓

Update React Query

↓

UI updates

So which state gets updated?Both.

But they store different things.

User starts dragging
        │
        ▼
Zustand
draggingCard
hoverColumn
isDragging

        │
        ▼
User drops
        │
        ▼
React Query
Move Card Optimistically

        │
        ▼
API

        │
        ▼
Server

        │
        ▼
WebSocket

        │
        ▼
React Query (other users)

------------------------------------------------
Does our own client also receive the WebSocket?

Usually yes.
First, why does the server broadcast to everyone?

Imagine there are 3 users viewing the same Kanban board.

            Board-123

   Alice        Bob        Charlie
     │           │            │
     └───────────┼────────────┘
                 │
            WebSocket Server

Alice moves a card.

Todo             In Progress

Card A  ───────────────►

Alice sends:

PATCH /cards/1
{
   columnId: "inprogress"
}

The backend updates the database.

Now the backend must inform everyone that the board changed.

So it broadcasts:

{
   "type": "CARD_MOVED",
   "cardId": 1,
   "columnId": "inprogress"
}

The server doesn't usually make a special case for Alice—it just sends the event to all subscribed clients.

What happens on Alice's machine?
Step 1: Optimistic Update

Before the API even finishes, Alice's UI updates immediately.

React Query Cache

Todo
------

Card A

↓

User drops

↓

React Query Cache

Todo

(empty)

In Progress

Card A

So Alice's React Query cache is already updated.

Step 2: Backend finishes

Backend saves the change.

Then broadcasts:

Backend

↓

Broadcast

↓

Alice
Bob
Charlie

Now Alice also receives the WebSocket event.

The problem

If Alice blindly applies the event again:

Move Card

↓

Optimistic Update

↓

Card moved

↓

WS Event

↓

Move again

Now you've processed the same logical action twice.

Maybe nothing breaks, or maybe:

animations replay,
counters increment twice,
activity feed duplicates,
expensive recalculations happen twice.

So we want to detect that this event is already reflected locally.

How do we detect that?

There are several approaches.

Option 1 (Recommended): Mutation ID

When Alice sends the request, generate a client-side ID.

mutationId = "abc123"

API:

PATCH /cards/1

{
   columnId: "inprogress",
   mutationId: "abc123"
}

Backend stores/processes it and includes it in the broadcast:

{
   "type":"CARD_MOVED",
   "cardId":1,
   "columnId":"inprogress",
   "mutationId":"abc123"
}

Alice's realtime pipeline checks:

Incoming mutationId

↓

abc123

↓

Already processed locally?

↓

YES

↓

Ignore

Bob receives the same event.

Incoming mutationId

↓

abc123

↓

Never seen before

↓

Apply update

So:

Alice ignores it.
Bob updates.
Charlie updates.

Alice drags card
        │
        ▼
Controller
        │
        ▼
Optimistically update React Query
        │
        ▼
Send PATCH /cards/1
        │
        ▼
Backend updates DB
        │
        ▼
Broadcast CARD_MOVED
   ┌────────┼────────┐
   ▼        ▼        ▼
 Alice     Bob    Charlie
   │        │         │
   ▼        ▼         ▼
Realtime Pipeline
   │
   ├── Alice: mutationId matches → Ignore
   │
   ├── Bob: new event → Update React Query
   │
   └── Charlie: new event → Update React Query

   ---------------------------------------------------------

Excellent question. The card ID cannot be used as the mutation ID. Let's see why with an example.

First, what is a Card ID?

The card ID identifies the entity.

Card

id = 101

Title = Fix Login

Column = Todo

This ID never changes.

What is a Mutation ID?

A mutation ID identifies one specific operation.

Example:

Move Card

Mutation ID = m1

Tomorrow, another move:

Move Card Again

Mutation ID = m2

Same card.

Different operation.

Why can't Card ID be the Mutation ID?

Suppose Alice performs two operations very quickly.

Operation 1
Move Card 101

Todo

↓

In Progress

Immediately after...

Operation 2
Move Card 101

In Progress

↓

Done

Now imagine the network.

Operation 1

PATCH

↓

Internet

Before it finishes...

Operation 2

PATCH

↓

Internet

Backend receives both.

It broadcasts:

Event 1

cardId = 101

↓

Event 2

cardId = 101

If you use cardId for deduplication:

Already processed cardId=101

↓

Ignore Event 2 ❌

But Event 2 is not a duplicate.

It's a completely different action.

Mutation IDs

Instead:

Move #1

cardId = 101

mutationId = a1

Second move:

cardId = 101

mutationId = a2

Now the realtime pipeline sees:

Incoming

a1

↓

Already processed?

Yes

↓

Ignore

Next event:

Incoming

a2

↓

Processed?

No

↓

Apply

Perfect.

Another example

Imagine editing a card title.

Card 101

↓

Rename

↓

Rename Again

↓

Rename Again

Every request touches the same card.

But they're different mutations.

cardId = 101

mutation = m1

mutation = m2

mutation = m3
Why does the client generate it?

Because the client needs to know which optimistic update corresponds to which server event.

Timeline:

Client

↓

Optimistic Update

↓

Needs an ID NOW

↓

Send API

At the moment of the optimistic update, the server hasn't seen the request yet, so the client creates a temporary unique identifier (often a UUID).

Could the server generate it?

It could, but then the flow becomes:

Client

↓

API

↓

Server generates ID

↓

Response

↓

Now client knows it

But the client has already optimistically updated the UI before receiving the response, so it has nothing to compare against when the WebSocket event arrives.

That's why client-generated IDs are common for optimistic workflows.

Real-world example

Many APIs already use this pattern.

For example:

PATCH /cards/101

{
   "columnId":"done",
   "clientMutationId":"9f3d7a2b"
}

Server broadcasts:

{
   "type":"CARD_MOVED",
   "cardId":101,
   "columnId":"done",
   "clientMutationId":"9f3d7a2b"
}

The initiating client recognizes its own mutation and ignores reapplying it, while other clients process it normally.
*/