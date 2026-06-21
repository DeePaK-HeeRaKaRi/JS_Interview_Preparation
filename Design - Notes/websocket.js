/*
https://blog.ranveerkumar.com/articles/designing-real-time-frontend-systems-websockets-events-sync-streaming-ui
1. Connection Manager

Responsible for:

Open Connection
Reconnect
Heartbeat
Connection State
Auth

Example:

const ws = new WebSocket(
  "wss://chat.instagram.com/ws"
)
What happens when user opens DM page?
User opens Instagram
      ↓
Connection Manager
      ↓
Connect to WS URL
      ↓
Connected

Internal state:

{
  status: "connected",
  reconnectAttempts: 0
}
Heartbeat

Connection can silently die.

So every 30 seconds:

{
  "type": "ping"
}

Server responds:

{
  "type": "pong"
}

If no pong:

Connection Lost
       ↓
Reconnect
Reconnect Logic
Disconnected
    ↓
1 sec
    ↓
2 sec
    ↓
4 sec
    ↓
8 sec

Exponential backoff.

2. Subscription Layer

Once connected we need to tell server:

What data am I interested in?

Imagine Instagram DMs.

User opens:

Conversation:
Deepak ↔ John

Client sends:

{
  "action": "subscribe",
  "topic": "chat:123"
}

Server:

{
  "success": true
}
Multiple Topics
[
  "chat:123",
  "typing:123",
  "presence:john",
  "notifications"
]

Instagram may internally have:

chat:{conversationId}
typing:{conversationId}
presence:{userId}
story_updates
notifications
Complete Flow
Connect
   ↓
Subscribe chat:123
   ↓
Subscribe typing:123
   ↓
Subscribe presence:john
3. Event Processor

Now events start arriving.

John sends:

{
  "type": "message",
  "conversationId": 123,
  "messageId": "m1",
  "text": "Hello"
}

Event processor receives it.

Most candidates stop here.

Senior engineers continue:

Receive Event
     ↓
Validate
     ↓
Dedupe
     ↓
Order
     ↓
Transform
     ↓
Store
Validation

Check shape.

if (
 !message.messageId ||
 !message.text
)
 return;

Invalid payload:

{
  "type": "message"
}

Reject.

Deduplication

Sometimes same event arrives twice.

Example:

{
  "messageId": "m1"
}

again

{
  "messageId": "m1"
}

Maintain:

seenIds = new Set()
if(seenIds.has(messageId))
   return;
Ordering

Hard interview question.

Events may arrive:

Message 3
Message 1
Message 2

due to network.

Server includes:

{
  "sequence": 100
}

or

{
  "timestamp": 17123456
}

Sort before merging:

messages.sort(
 (a,b)=>a.sequence-b.sequence
)
Transform

Server payload:

{
  "msg_id":"m1",
  "sender_id":"u1"
}

Frontend model:

{
  id:"m1",
  senderId:"u1"
}

Normalize here.

Merge

Suppose store already has:

messages = [
  m1,
  m2
]

New event:

m3

Merge:

[
  m1,
  m2,
  m3
]

If update:

{
  "type":"message_edited",
  "messageId":"m2"
}

Merge:

messages.map(...)
Where do we store it?

This is where interviews get interesting.

Option 1: React Query

If server-state driven.

WS Event
    ↓
queryClient.setQueryData()
    ↓
messages cache updated

Example:

queryClient.setQueryData(
 ['messages',123],
 old => [...old,newMessage]
)

This is my preferred answer.

Option 2: Zustand

If highly real-time.

Example:

Typing Indicators
Unread Counts
Online Presence

Store:

{
  onlineUsers,
  typingUsers
}
Option 3: Both

Common in large apps.

Messages
   → React Query

Typing State
   → Zustand

Presence
   → Zustand
Instagram DM Architecture
Connection Manager
     ↓
WebSocket

wss://chat.instagram.com/ws

     ↓
Subscription Layer

chat:123
typing:123
presence:john

     ↓
Event Processor

validate
dedupe
order
transform
merge

     ↓

queryClient.setQueryData()

     ↓

React Query Cache

['messages',123]

     ↓

Conversation UI
Interview Answer (2-minute version)

If an interviewer asks:

"A new message arrives over WebSocket. What happens?"

You can say:

Connection Manager receives event
        ↓
Event Processor validates payload
        ↓
Deduplicates using event/message id
        ↓
Orders using sequence number
        ↓
Transforms backend model to UI model
        ↓
Merges into React Query cache using
queryClient.setQueryData()
        ↓
Conversation component automatically re-renders

That answer usually signals senior frontend/system design maturity, because you're explaining the entire event pipeline, not just "WebSocket receives a message".
========================================================================================================================

Scenario 1: New Message

Current Store:

101
102
103

Incoming:

104

Result:

101
102
103
104

Action:

Merge (Append)

Sort?

No

because backend already delivered in order.
========================================================================================================================
Scenario 2: Duplicate Event

Current Store:

101
102
103

Incoming:

102

Same messageId.

Result:

101
102
103

Action:

Ignore

Sort?

No
========================================================================================================================
Scenario 3: Late Event

Current Store:

101
103

Incoming:

102

Network delayed it.

Result:

101
102
103

Action:

Insert at proper location

Sort?

Yes

or Binary Search (Senior Answer) Since the array is already sorted:

This is the main place where ordering matters.
========================================================================================================================
Scenario 4: Message Edit

Current Store:

101 Hello
102 Hi
103 Welcome

Incoming:

102 Hi Deepak

Result:

101 Hello
102 Hi Deepak
103 Welcome

Action:

Update Existing

Sort?

No

Position didn't change.
========================================================================================================================
Scenario 5: Message Delete

Current Store:

101
102
103

Incoming:

Delete 102

Result:

101
103

Action:

Remove Existing

Sort?

No
========================================================================================================================
Scenario 6: Reconnect

Current Store:

101
102
103

Connection lost.

Server replays:

102
103
104
105

Process:

102 -> Duplicate -> Ignore

103 -> Duplicate -> Ignore

104 -> New -> Insert

105 -> New -> Insert

Final:

101
102
103
104
105

Sort?

Usually No

because replayed events are already ordered.
========================================================================================================================
The Decision Tree

When an event arrives:

Event Arrives
      |
      v
Message Exists?
      |
  +---+---+
  |       |
 Yes      No
  |       |
Update?   New Message
Delete?       |
Duplicate?    |
  |            |
  v            v
Update/Remove  Check Sequence
                   |
             Correct Position?
                   |
             +-----+-----+
             |           |
            Yes         No
             |           |
          Insert      Reorder
Interview Version

You can literally say:

Event Type	Operation
New Message	Merge
Duplicate Message	Ignore
Message Edit	Update
Message Delete	Remove
Late Event	Merge + Reorder
Reconnect Replay	Dedupe + Merge

And the golden rule:

Dedupe -> messageId/eventId

Ordering -> sequence number / server timestamp

Merge -> add/update/remove in cache

Store -> React Query cache (messages)

For Instagram/WhatsApp/Messenger interviews, the only time you typically need ordering logic is when a missing/late event arrives or when reconnect replay events arrive out of order. Everything else is mostly merge/update/remove.


========================================================================================

CHATS SWITCHING

Suppose Instagram DMs.

User opens:

Chat A

API:

GET /messages?chatId=A

Store:

['messages', 'A']

React Query cache:

{
  pages: [...]
}

30 seconds later:

Chat B

API:

GET /messages?chatId=B

Store:

['messages', 'B']

30 seconds later:

Chat C

Store:

['messages', 'C']

Now cache contains:

['messages', 'A']
['messages', 'B']
['messages', 'C']

This is exactly what React Query is designed for.

What would I do?

For recently opened chats:

React Query Cache

Example:

['messages', chatId]

User switches back:

A → B → A

No API call.

React Query returns:

['messages', 'A']

instantly.

When does memory become a problem?

Suppose:

1000 chats

opened.

Each chat:

100 messages

Total:

100,000 messages

Keeping everything in memory is bad.

Real Apps

Usually use an LRU strategy.

Recently Opened Chats
      ↓
Memory Cache

Example:

Last 20 chats

remain in memory.

Older chats:

Evicted
IndexedDB

Used for:

Chat reopened after 1 hour
Page refresh
Offline mode

Flow:

Open Chat
    ↓
Check Memory Cache
    ↓
Check IndexedDB
    ↓
Call API
What I would answer in an interview
Messages of recently opened conversations are stored in memory
using React Query keys:

['messages', chatId]

This allows fast switching between chats.

To prevent unbounded memory growth, older conversations are
evicted using cacheTime/garbage collection policies.

For longer persistence and offline support, conversations are
stored in IndexedDB and rehydrated when needed.
My Preferred Architecture

For Instagram DM:

WebSocket
     ↓
New Message Event
     ↓
React Query

['messages', chatId]

Examples:

['messages', 'chatA']
['messages', 'chatB']
['messages', 'chatC']

Keep:

Last 10-20 active chats

in memory.

Store:

Older chats

in IndexedDB.

So for the scenario:

User opens a new chat every 30 seconds.

I would still use:

React Query
   key = ['messages', chatId]

for active/recent chats.

I would not put all message histories into Zustand.

Zustand is better for:

selectedChatId
typingUsers
onlineUsers
unreadCounts

while the actual message history is usually better managed as cached server state keyed by chatId.
==========================================================================================================

I would NOT sync React Query → IndexedDB every 5 minutes. / offline store

Scenario 1: First Time Opening Chat
Chat A

React Query:

Miss

IndexedDB:

Miss

Call API:

GET /messages?chatId=A

Response:

Store in React Query
Store in IndexedDB
Scenario 2: Refresh Page

Memory gone.

React Query
    ↓
Empty

Open Chat A:

Check IndexedDB
      ↓
Found
      ↓
Show instantly

Then:

Background API Sync

This is how WhatsApp/Slack feel fast.

When should we write to IndexedDB?

Not every 5 minutes.

Option 1 (My Preferred)

Write immediately after meaningful changes.

New Messages Loaded
      ↓
Update React Query
      ↓
Persist to IndexedDB

Example:

queryClient.setQueryData(...)

await idb.set(chatId, messages)
Option 2

Batch writes.

Example:

50 new messages
      ↓
Debounce 5 seconds
      ↓
Single IndexedDB write

Very common.

WebSocket Event Flow
WS Event
    ↓
React Query Cache
    ↓
Debounced Persistence
    ↓
IndexedDB

Example:

Message 1
Message 2
Message 3
Message 4
Message 5

Don't write 5 times.

Write once.

Startup Flow

This is usually the interview answer.

Application Start
       ↓
Hydrate From IndexedDB
       ↓
Populate React Query
       ↓
Background Refetch
       ↓
Merge Latest Data

Example:

IndexedDB
[
  101,
  102,
  103
]

User was offline.

Server now has:

[
  101,
  102,
  103,
  104,
  105
]

Startup:

Load 101,102,103 instantly

Then:

API Fetch

Returns:

104
105

Merge.

Senior Frontend Interview Answer

If interviewer asks:

How do you sync React Query and IndexedDB?

I'd say:
React Query is my in-memory source of truth while the app is running.

IndexedDB is used for persistence and offline access.

On startup, I hydrate React Query from IndexedDB to provide an instant UI.

Then I perform a background refetch to obtain fresh data.

For writes, I persist changes to IndexedDB when new messages arrive, usually using a debounced/batched strategy rather than periodic synchronization.
==========================================================================================================
Instagram/WhatsApp Interview Answer
React Query

Store:

Conversation History
Messages
Profiles
Notifications
Zustand

Store:

selectedChatId
typingUsers
onlineUsers
draftMessages
IndexedDB

Store:

Offline Messages
Large Chat History
Recent Conversations
========================================================================================
*/