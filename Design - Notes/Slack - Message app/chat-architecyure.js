/*
                User Actions
                     │
                     ▼
              Chat Controller
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 React Query    Sync Manager    Connection Manager
                     │
                     ▼
                WebSocket
                     ▲
                     │
             Server Events
                     │
                     ▼
         Realtime Event Pipeline
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 IndexedDB                    React Query

Controller → outgoing actions
Realtime Pipeline → incoming events

Does the Chat Controller trigger them?
1. Connection Manager ✅ YES

Scenario:

User opens Chat123

Flow

UI
 ↓
Hook
 ↓
Chat Controller
 ↓
Connection Manager
 ↓
Already Connected?

No
 ↓
Open WebSocket

Once connected...

Connection Manager continues running independently.

It handles

heartbeat
reconnect
ping/pong

The controller doesn't keep calling it.

2. Subscription Layer ✅ YES

User opens

Chat123

Flow

Controller
      │
      ▼
Subscription Layer
      │
      ▼
subscribe(chat123)

Switch to

Chat456

Flow

Controller

↓

Subscription Layer

↓

unsubscribe(chat123)

↓

subscribe(chat456)

Again,

Controller only tells it

"Subscribe"

Subscription layer manages the rest.

3. Event Processor ❌ NO

This is where many people get confused.

The controller does NOT trigger it.

Instead

Server

↓

WebSocket

↓

Event Processor

The Event Processor reacts whenever data arrives.

Example

MESSAGE_CREATED

↓

Event Processor

↓

Validate

↓

Deduplicate

↓

Transform

↓

IndexedDB

+

React Query

The Chat Controller isn't involved.

So the responsibilities become
Chat Controller

Triggers:

✓ Connection Manager
✓ Subscription Layer
✓ React Query
✓ Sync Manager

Does NOT trigger

✗ Event Processor
Event Processor

Triggered by

WebSocket

↓

Incoming Event

Never by UI.

Picture it like this
                    User
                     │
                     ▼
              Chat Controller
                     │
       ┌─────────────┴─────────────┐
       ▼                           ▼
Connection Manager          Subscription Layer
       │                           │
       └──────────────┬────────────┘
                      ▼
                  WebSocket
                      ▲
                      │
          Incoming Server Events
                      │
                      ▼
               Event Processor
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
     IndexedDB              React Query

Notice

The controller never calls

EventProcessor.process()

The WebSocket does.

Real Code Example
Opening a conversation
controller.openConversation(chatId) {

   connectionManager.ensureConnected();

   subscriptionManager.subscribe(chatId);

   loadMessages(chatId);

}

Notice

No Event Processor.

Incoming WS Message
socket.onmessage = (event) => {

   eventProcessor.process(event);

}

Completely separate.

One Interview Question

Suppose interviewer asks

"Who reconnects the socket?"

Answer

Connection Manager

NOT Controller.

Controller only calls

ensureConnected()

The Connection Manager owns:

reconnect
heartbeat
ping/pong
exponential retry
Another Question

"Who processes MESSAGE_CREATED?"

Answer

Event Processor

NOT Controller.

Another Question

"Who subscribes to Chat123?"

Answer

Controller

↓

Subscription Layer
This is the mental model I use
Chat Controller

Starts workflows initiated by the user.

Examples:

Open conversation
Switch conversation
Send message
Search chat
Connection Manager

Maintains the WebSocket connection.

Examples:

Connect
Reconnect
Heartbeat
Ping/Pong
Subscription Layer

Manages which channels/conversations are being listened to.

Examples:

Subscribe(chat123)
Unsubscribe(chat123)
Event Processor

Processes everything the server sends.

Examples:

MESSAGE_CREATED
MESSAGE_DELETED
MESSAGE_EDITED
TYPING
READ_RECEIPT
PRESENCE
⭐ I think you've now reached the cleanest architecture

I honestly wouldn't change your diagram anymore.

If an interviewer points at your WebSocket box and asks:

"What's inside?"

You can confidently answer:

Realtime Sync Pipeline
├── Connection Manager
├── Subscription Layer
└── Event Processor

And if they ask:

"How do these interact with the controller?"

Your answer should be:

Connection Manager → initialized by the controller (ensureConnected()), then runs independently.
Subscription Layer → invoked by the controller when the active conversation changes.
Event Processor → driven by incoming WebSocket events, not by the controller.

*/