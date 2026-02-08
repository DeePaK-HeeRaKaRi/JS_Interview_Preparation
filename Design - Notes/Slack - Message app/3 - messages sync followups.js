/*n initial app open: do we pull ALL chats (2+ years) into IndexedDB?
❌ No — never.

That would:
kill startup time
blow up storage
block main thread
make the app unusable

✅ What we ACTUALLY do

We scope data by usefulness.

Typical strategy (industry standard)
Data	How much
Messages per conversation-	Last N messages (e.g. 50–200)
Message time window --	Last 30–90 days
Conversation list --	ALL conversations (metadata only)
Older messages	--Lazy-loaded on scroll
So on initial load:

❌ No full history

✅ Only recent messages

✅ Enough to render UI instantly

*/

/*
2️⃣ Do we pull ALL conversations or only recent ones?
✅ We pull ALL conversations, but NOT all messages

This is a very important distinction.

Conversation list payload looks like this:
Conversation {
  id
  name
  lastMessagePreview
  lastMessageTimestamp
  unreadCount
}

This data is:
small
cheap
needed to render sidebar

Why all conversations?
Because users expect:
old conversations to appear
unread count correctness

search to work

🧠 Interview sentence:

“We load conversation metadata for all conversations, but message history lazily.”

*/

/*
Next app open: how do we sync messages?

This is the most important part.
❌ NOT just lastMessageTimestamp

Timestamps are not enough (you already know why: deletes, edits).
✅ Correct approach: two-phase sync

Phase 1: EVENT SYNC (correctness)

On app start:

GET /events?after=lastSyncToken

This returns:

new messages
deletions
edits
reactions

Apply to IndexedDB
Update lastSyncToken

✔️ Guarantees correctness

Phase 2: MESSAGE FETCH (data hydration)

For each conversation:

GET /messages?after=lastKnownMessageId&limit=50

This:
fills gaps
fetches missed messages
respects retention window

When scrolling up, how do we load older messages?

Lazy loading, always.

GET /messages?before=oldestLoadedMessageId&limit=50


Before inserting:

check tombstones
skip deleted messages

❌ No full re-fetch
❌ No clearing IndexedDB

INITIAL LOAD
↓
Load conversation list (ALL)
↓
Load recent messages (N / last X days)
↓
Hydrate UI from IndexedDB
↓
Sync events using lastSyncToken
↓
Fetch missing messages incrementally


Interview-ready 30-second answer (memorize this)

“On initial load we fetch all conversation metadata but only recent messages. 
IndexedDB persists recent history, Redux handles UI state. On subsequent opens,
 we first sync events using a per-device sync token to handle deletes and edits, then hydrate missing messages incrementally. We never re-fetch full history.”
*/

/*
                    ┌────────────────────────┐
                    │        SERVER          │
                    │                        │
                    │  ┌──────────────┐     │
                    │  │ Conversations│     │
                    │  │  (metadata)  │     │
                    │  └──────────────┘     │
                    │                        │
                    │  ┌──────────────┐     │
                    │  │ Messages     │     │
                    │  │ (full history│     │
                    │  └──────────────┘     │
                    │                        │
                    │  ┌──────────────┐     │
                    │  │ Events       │     │
                    │  │ (create/del) │     │
                    │  └──────────────┘     │
                    └─────────▲─────────────┘
                              │
          EVENT SYNC           │
   GET /events?after=token    │
                              │
┌─────────────────────────────┴─────────────────────────────┐
│                         CLIENT                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                   IndexedDB                          │  │
│  │                                                     │  │
│  │  ┌──────────────┐   ┌──────────────┐               │  │
│  │  │ Conversations│   │ Messages     │  (last 30–90d) │  │
│  │  │ (ALL)        │   │              │               │  │
│  │  └──────────────┘   └──────────────┘               │  │
│  │                                                     │  │
│  │  ┌──────────────┐   ┌──────────────┐               │  │
│  │  │ Tombstones   │   │ Sync Meta    │               │  │
│  │  │ (deletions)  │   │ lastToken    │               │  │
│  │  └──────────────┘   └──────────────┘               │  │
│  └───────────▲──────────────────────────────▲──────────┘  │
│              │                              │             │
│              │                              │             │
│       hydrate UI                     update token         │
│              │                              │             │
│  ┌───────────┴──────────────────────────────┴──────────┐ │
│  │                 Redux / Zustand                      │ │
│  │   (visible messages, active convo, UI state)         │ │
│  └───────────▲──────────────────────────────▲──────────┘ │
│              │                              │             │
│              │                              │             │
│         re-render UI                  scroll / fetch      │
│              │                              │             │
│  ┌───────────┴──────────────┐       ┌───────┴──────────┐ │
│  │        Chat UI            │       │   Pagination     │ │
│  │ (list + chat window)     │       │ GET /messages    │ │
│  └──────────────────────────┘       └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘


*/

/*
When you’re actively chatting and the WebSocket is open, the flow still uses the same event model, just in real time.

Let me make this crystal clear, because this is a very common confusion.

✅ What happens when WebSocket is open?
Incoming message while chatting
WebSocket
 → MESSAGE_CREATED event
 → Apply to IndexedDB
 → Update Redux / UI
 → Advance lastSyncToken


👉 Yes, lastSyncToken gets updated immediately.

🧠 Important mental model (lock this in)

WebSocket is just a delivery mechanism.
Events are still the source of truth.

So whether the event arrives via:

WebSocket (real-time), or

HTTP /events?after=token (catch-up)

…it is processed the same way.

Step-by-step (real-time case)
1️⃣ Message arrives via WebSocket

Payload looks like:

{
  "eventId": 9123,
  "type": "MESSAGE_CREATED",
  "message": {
    "id": "m789",
    "conversationId": "c1",
    "content": "hello"
  }
}

2️⃣ Client processes the event
// 1. persist first
indexedDB.messages.put(message)

// 2. update UI state
store.addMessage(message)

// 3. advance sync token
indexedDB.sync_meta.lastSyncToken = 9123


✔️ Now the device is consistent up to event 9123

🔁 What if WebSocket disconnects?

This is where lastSyncToken shines.

On reconnect:
GET /events?after=9123


Server sends only missed events.

No duplicates
No gaps
No re-fetching everything

❗ Important nuance (interview-worthy)

You do NOT:

wait for a batch sync to update the token

keep token static during live chat

Every processed event advances the token, regardless of transport.

Say this sentence 👆 — it’s very strong.
*/