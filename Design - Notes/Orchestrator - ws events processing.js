/*
                        BACKEND
                           │
                    WS / SSE Stream
                           │
                           ▼
                 ┌──────────────────┐
                 │ Transport Layer  │
                 │                  │
                 │ WebSocketService │
                 │                  │
                 │ Connect           │
                 │ Reconnect         │
                 │ Receive           │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Event Pipeline   │
                 │                  │
                 │ Parse            │
                 │ Validate         │
                 │ Normalize        │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Event Router     │
                 │                  │
                 │ Route by type    │
                 └────────┬─────────┘
                          │
                          ▼
                    Orchestrator
                          │
                          ▼
              ┌───────────────────────┐
              │ Message Processing    │
              │                       │
              │ Deduplicate           │
              │ Order events          │
              │ Buffer                │
              │ Classify              │
              └───────────┬───────────┘
                          │
                          ▼
                ┌──────────────────┐
                │ Strategy         │
                │                  │
                │ Preserve All     │
                │ Latest State     │
                │ Recent N         │
                │ Aggregate        │
                └─────────┬────────┘
                          │
                          ▼
                    State Store
                          │
                          ▼
                     Custom Hooks
                          │
                          ▼
                       React UI



4 Real-Time Event Patterns + Data Structures ⭐
1. Every event matters → Map + Array
Example: Chat messages

Incoming:

M1 → Hello
M2 → Hi
M3 → How are you?

We need all messages.

Store like this:
const messagesById = new Map();

messagesById.set("m1", {
  id: "m1",
  text: "Hello",
});

messagesById.set("m2", {
  id: "m2",
  text: "Hi",
});

For ordering:

const messageIds = ["m1", "m2"];
State shape:
Map                    Array

m1 → {Hello}           [m1, m2, m3]
m2 → {Hi}
m3 → {How are you?}
Why both?
Map   → Fast lookup/update/delete
Array → Maintain display order
Remember:

Chat = Map for data + Array for order

-------------------------------------------------------------
2. Only latest value matters → Map
Example: Stock prices / Typing

Incoming:

TCS → 100
TCS → 101
TCS → 102

We only need:

TCS → 102
Store:
const latestPrices = new Map();

latestPrices.set("TCS", 100);
latestPrices.set("TCS", 101);
latestPrices.set("TCS", 102);

Final:

Map

TCS → 102

Another example:

const typingUsers = new Map();

typingUsers.set("user-1", true);
typingUsers.set("user-2", true);
typingUsers.set("user-1", false);
Remember:

Latest state = Map<id, latestValue>
-------------------------------------------------------------
3. Recent history matters → Queue / Ring Buffer
Example: Logs

Incoming:

Log 1
Log 2
Log 3
...
Log 10000

We only want:

Last 100 logs

Simple interview implementation:

const MAX_LOGS = 100;

const logs = [];

function addLog(log) {
  logs.push(log);

  if (logs.length > MAX_LOGS) {
    logs.shift();
  }
}

Concept:

[Log1, Log2, Log3, Log4, Log5]

New Log6

        ↓

Remove Log1

[Log2, Log3, Log4, Log5, Log6]

For very high frequency:

Use a proper Ring Buffer instead of shift().

Remember:

Recent history = Queue / Ring Buffer with Max N
-------------------------------------------------------------
4. Only summary matters → Counter / Aggregator
Example: Analytics

Incoming:

Click
Click
Click
Click

Don't store:

[
  click1,
  click2,
  click3,
  click4
];

Store:

let clickCount = 0;

function handleClickEvent() {
  clickCount++;
}

For multiple event types:

const counters = new Map();

function handleEvent(event) {
  const count = counters.get(event.type) || 0;

  counters.set(event.type, count + 1);
}

Result:

Map

CLICK → 100
VIEW  → 50
LIKE  → 30
Remember:

Summary = Counter / Aggregator

The Cheat Sheet You Should Memorize ⭐⭐⭐
What does UI need?

1. All events
   ↓
   Map + Array
   Example: Chat

2. Latest state
   ↓
   Map<id, value>
   Example: Stock price / Typing

3. Recent history
   ↓
   Queue / Ring Buffer
   Example: Logs / Notifications

4. Summary only
   ↓
   Counter / Aggregator
   Example: Analytics
One-line memory trick
ALL     → Map + Array
LATEST  → Map
RECENT  → Queue
SUMMARY → Counter

That's honestly the only thing you need to remember for real-time message processing in interviews.

*/
