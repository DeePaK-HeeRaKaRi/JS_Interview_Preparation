/*
How do you sync across multiple tabs?"

You answered: BroadcastChannel

100% correct. 👍

Example

Tab1 receives

MESSAGE_CREATED

It broadcasts

channel.postMessage({
    type:"MESSAGE_CREATED",
    conversationId:"123",
    message
});

Tab2

channel.onmessage = (event)=>{

    queryClient.setQueryData(...)

}

Done.

Very fast.
What about sending a message?

Suppose

Tab2

Send Hello

Tab2 isn't the leader.

Flow

Tab2

↓

Controller

↓

BroadcastChannel

↓

Leader Tab

↓

Sync Manager

↓

WebSocket

↓

Server

Leader sends everything.

What if Leader tab closes?

Excellent interview question.

Flow

Leader Closed

↓

BroadcastChannel closes

↓

Remaining tabs detect it

↓

Election

↓

New Leader

↓

Open WebSocket

↓

Subscribe

↓

Continue

Leader election can be done using:

BroadcastChannel
localStorage lock
Web Locks API (modern browsers)

You don't need to explain the algorithm unless asked.

Where should BroadcastChannel live?

I would NOT create a new box.

It naturally belongs inside

Realtime Event Pipeline

because its job is

Incoming Event

↓

Validate

↓

Transform

↓

Distribute

↓

Persist

Broadcasting is simply another distribution mechanism
It is NOT a replacement for WebSockets. It is only for communication between tabs of the same browser.
For multiple tabs, I'd use the BroadcastChannel API. The leader tab maintains the WebSocket connection. When it receives an event, it processes it through the realtime pipeline, updates its local caches, and broadcasts the event to the other tabs. The follower tabs process the same event through their own realtime pipeline to update IndexedDB and React Query. 
If the leader tab closes, another tab becomes the leader and reconnects the WebSocket."

Server
   │
   ▼
WebSocket
   │
   ▼
Leader Tab
Realtime Pipeline
   │
   ├────────► IndexedDB
   │
   ├────────► React Query
   │
   └────────► BroadcastChannel
                    │
        ┌───────────┴────────────┐
        ▼                        ▼
     Tab2                     Tab3
        │                        │
        ▼                        ▼
Realtime Pipeline         Realtime Pipeline
        │                        │
        ├────► IndexedDB         │
        └────► React Query       │
                │                │
                ▼                ▼
               UI               UI


One recommendation

For a Senior Frontend interview, I would not implement leader election unless the interviewer asks.

I'd first explain the simpler architecture:

Every tab
      │
Own WebSocket
      │
Realtime Pipeline

Then I'd say:

"To reduce backend connections, we can elect a leader tab using the Web Locks API or BroadcastChannel and fan out events locally."
*/