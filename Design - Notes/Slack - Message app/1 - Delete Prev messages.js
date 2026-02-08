/*
If messages from Feb 3 → Feb 10 are deleted by sender,
and today is Feb 20,
when I scroll up later — those messages must be gone for both sender & receiver.

Messages = state
Deletes = events

Deletion is not “missing data” — it is an explicit event

Slack / WhatsApp / Discord never delete silently.

Message {
  id
  conversation_id
  sender_id
  content
  created_at
  status
  is_deleted   // 🔴 IMPORTANT
}

Events table (IndexedDB or memory)
Event {
  event_id        // monotonic, server-generated
  type            // MESSAGE_CREATED | MESSAGE_DELETED
  message_id
  conversation_id
  timestamp
}

SyncMeta {
  lastSyncToken: number   // last processed event_id
}

Ex - lastSyncToken = 10342 - Client has applied all events up to event 10342

Timeline

Feb 3–10: messages created

Feb 15: sender deletes those messages

Feb 20: receiver scrolls up

1️⃣ Sender deletes messages (server side)

Server creates events:

Event 2001 → MESSAGE_DELETED → msg_101
Event 2002 → MESSAGE_DELETED → msg_102
Event 2003 → MESSAGE_DELETED → msg_103

2️⃣ Receiver is chatting on Feb 20

Receiver has:
lastSyncToken = 1999


On reconnect / resume / scroll:
GET /events?after=1999

Server responds:

[
  { "event_id": 2001, "type": "MESSAGE_DELETED", "message_id": "msg_101" },
  { "event_id": 2002, "type": "MESSAGE_DELETED", "message_id": "msg_102" },
    { "event_id": 2003, "type": "MESSAGE_DELETED", "message_id": "msg_103" }
]

3️⃣ Client applies events to IndexedDB
for (event of events) {
  if (event.type === "MESSAGE_DELETED") {
    indexedDB.messages.update(event.message_id, {
      is_deleted: true
    })
  }
}


⚠️ No refetch. No clearing DB. No timestamp logic needed

4️⃣ Redux / Zustand reacts

UI queries IndexedDB

Deleted messages:

hidden

or replaced with “This message was deleted”

✅ Works even if message is weeks old

-------
Where lastMessageTimestamp still helps

It is NOT for correctness.

It is for:

pagination

ordering

performance

Example:

GET /messages?before=oldestMessageId


But deletions are handled ONLY by events.

📌 Timestamps optimize fetching, syncTokens guarantee correctness
-----------
How scrolling up works now (important)

When you scroll up:

Load messages from IndexedDB

Before rendering:

apply pending events (based on syncToken)

Filter is_deleted = true

So deleted messages never reappear.
*/

// ANOTHER USECASE 

/*
Restating your scenario (correctly)
Sender deletes 1-year-old messages
Receiver:
does NOT have those messages locally
probably keeps only last 30–90 days in IndexedDB

Question:
Will delete events still work?
If receiver never had the message, what happens?

Events must be idempotent and safe even if the underlying data does not exist locally.

Meaning:

A delete event does not assume the message exists

It must be safe to apply even if IndexedDB doesn’t have that row

Short, precise answer

lastSyncToken tracks “which EVENTS the client has already processed”, not which messages it has.
It does not care:
whther the message exists locally
whether the message is 1 day old or 1 year old
whether IndexedDB has that message or not

It only answers one question:
“Up to which eventId am I consistent with the server?”

Step 1: State before deletion

Receiver’s local state:
IndexedDB.messages:
  messages from last 30 days only
IndexedDB.deletedMessages:
  (empty)
lastSyncToken = 500

Meaning: “I have processed all events up to event 500.”

Step 2: Sender deletes 1-year-old message

Server creates a new event:
Event 501:
  type = MESSAGE_DELETED
  messageId = m_2024_old
  conversationId = c1
This event is new, even though the message is old.

Step 3: Receiver syncs

Receiver does:GET /events?after=500
Server returns:[ Event 501 (MESSAGE_DELETED, m_2024_old) ]

Step 4: Receiver applies the event

Receiver tries to apply delete:
Looks in IndexedDB.messages
Message not found ❌ (expected)

Even if the client doesn’t store old messages, it still processes delete events and advances its sync token. 
That guarantees future consistency without retaining full history
*/