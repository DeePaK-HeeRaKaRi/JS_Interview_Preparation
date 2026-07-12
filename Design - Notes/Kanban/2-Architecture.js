/*
Yes, hooks can handle everything for a small application.

We introduce an orchestrator (controller) only when one user action needs to coordinate multiple independent systems.

Option 1: Everything inside Hooks

Suppose we only have React Query.

function useMoveCard() {
  return useMutation(moveCardApi, {
    onMutate() {
      // optimistic update
    },
    onSuccess() {
      // invalidate query
    }
  });
}

UI

const { mutate } = useMoveCard();

onDrop(() => {
    mutate(cardId);
});

This is perfectly fine.

For a small Kanban board, I would stop here.

But now imagine our production app

When a user drags a card, what actually happens?

User drags card

↓

Optimistic Update

↓

API Call

↓

Store offline mutation (if offline)

↓

Wait for server response

↓

Receive WebSocket event

↓

Deduplicate event

↓

Update React Query

↓

Update IndexedDB

↓

Log analytics

↓

Handle rollback if API fails

Now ask yourself:

Should useMoveCard() know all of this?

Probably not.

It becomes huge
Eventually:

300+ lines.

Difficult to test.

Hard to reuse.
------------------------------------------------------------

Instead we introduce an Orchestrator

Now the hook becomes very small.

function useMoveCard() {

   const controller = useBoardController();

   return () => {
       controller.moveCard(...);
   }

}

That's it.

The hook is only exposing an API to the UI.

The controller does the orchestration.

moveCard()

↓

optimistic update

↓

call API

↓

queue offline mutation

↓

update cache

↓

rollback if needed

↓

analytics

↓

return

Notice something:

The hook doesn't know how moving a card works.

It only knows

"Move this card."

This separation is valuable in larger systems.

When do I introduce an Orchestrator in an interview?

A simple rule I follow is:

If one user action touches more than one subsystem, I introduce an orchestrator.

For example, if moving a Kanban card requires:

React Query (optimistic cache update)
API call
WebSocket synchronization
IndexedDB persistence (offline)
Analytics logging

then a BoardController or BoardOrchestrator keeps that workflow centralized instead of scattering it across hooks.

If the app only fetches data with React Query and updates the UI, hooks alone are sufficient.
 There's no need to add an extra abstraction just for the sake of architecture.

 ----------------------------------------------------------------
Why do we need React Query Cache (RQC)?
 Because React Query is our Server State Manager.

The UI should not fetch data directly from APIs.

Instead:

UI
  ↓
useCards(boardId)
  ↓
React Query Cache
      ↓
Cache Hit? ─────► Return data immediately
      │
      No
      ↓
queryFn()
      ↓
API

So yes, the UI reads from the React Query cache, but indirectly through hooks.
UI
 ↓
Hook
 ↓
React Query

Cache miss

↓

queryFn()

↓

API

↓

Cache

↓

Hook

↓

UI

-------------------------------------------------

3. What about another Client State Cache (Zustand/Redux)?

This is a very important distinction.

Think of it this way:

React Query = Server State

Data that comes from the backend.

Examples for a Kanban board:

Boards
Columns
Cards
Comments
Activity log

These belong in React Query because the server owns them.

Client State (Zustand/Redux)

Data that exists only in the browser.

Examples:

selectedBoardId

selectedCard

isCardModalOpen

draggingCard

currentFilter

searchText

theme

sidebarCollapsed

sortOption

                  UI
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   React Query            Zustand
(Server State)        (Client State)

boards               selectedCard

columns              filter

cards                searchText

comments             modalOpen

activity             draggingCard

------------------------------------------
4. Why not put everything in Zustand?

Some beginners do this:

API

↓

Redux/Zustand

↓

UI

But then you have to implement:

caching
retries
background refetching
stale data handling
request deduplication
cache invalidation

React Query already solves these problems.

That's why we let React Query manage server state.

-----------------------------------------------------------------

3. IndexedDB

Owns offline persistence.

Recently opened boards

Cached cards

Offline mutations

Draft comments

Sync token


-----------------------------------------------------
Idempotency Key

"What if the create request succeeds on the server but the response is lost?"

For Create Card:

Client

↓

Generate

cardId = uuid

↓

Optimistic UI

↓

POST

cardId

If retry happens

↓

Use the same cardId.

No duplicate.

For create operations, I'd make the request idempotent. The client would generate a stable identifier—either a client-generated entity ID
 or a dedicated idempotency key—and reuse it across retries. If the request is processed twice due to a network failure, 
the server recognizes the same key and returns the existing resource instead of creating a duplicate

*/