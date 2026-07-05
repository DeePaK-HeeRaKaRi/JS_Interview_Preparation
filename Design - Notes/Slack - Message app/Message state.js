/*
When a WS message arrives, do we store it in BOTH React Query and IndexedDB?
-Yes, but not always the complete history.
                 WebSocket Event
                       │
                       ▼
              Event Processor
                       │
        Validate → Dedupe → Order
                       │
          ┌────────────┴─────────────┐
          ▼                          ▼
      IndexedDB                 React Query
 (persistent store)          (currently active UI)

 Example

Suppose you're viewing -> Conversation 123

Friend sends -> Hello

WS receives -> MESSAGE_CREATED

Pipeline Validate -> Parser -> IndexedDB.insert() -> ReactQuery.setQueryData(["chat",123]) - so UI updates instantly.

---What if conversation isn't open?---

Suppose you're currently chatting with -> Conversation 456

WS receives Conversation123 > "Hello"

Would I update React Query? ->Usually No

I'd update --> IndexedDB + Conversation List , Unread Count

Why? > Because the UI isn't using ["chat",123] right now. Updating thousands of inactive queries wastes memory This is a very important optimization.

React Query already has its own cache lifecycle. It doesn't use a classic LRU cache. Instead it has: staleTime, gcTime (formerly cacheTime)
useQuery({
   staleTime: 30_000,
   gcTime: 5 * 60 * 1000
})

IndexDb
Keep Last 100 conversations , Last 1000 messages per conversation OR Last 90 days

User Click Send
        │
        ▼
Hooks
        │
        ▼
Chat Controller
        │
        ▼
Message Sync Manager
        │
        ▼
Write to IndexedDB
(messages + outbox)
        │
        ▼
If Online?
   │              │
  Yes            No
   │              │
   ▼              ▼
Send via WS     Stop here
   │              │
Server ACK      Wait for reconnect
   │              │
   ▼              ▼
WS Event (MESSAGE_CREATED)

SYNC Manager 
-------------------------------------------
User sends Hello John

Controller calls -> syncManager.send(message)

Step 2

Sync Manager creates

{
  "clientMessageId":"abc123",
  "conversationId":"chat123",
  "content":"Hello John",
  "status":"pending",
  "retryCount":0
}

Stores in IndexedDB Outbox

Step 3

Is websocket connected? Yes

↓

WS.send(message)

Step 4

Server ACK -> Server publishes > MESSAGE_CREATED

WS receives > MESSAGE_CREATED

Pipeline

↓

Update IndexedDB

status = sent

↓

Remove from outbox
-------------------------------------------
Offline Example

Internet disconnected.

User sends

Hello

Flow

Controller

↓

Sync Manager

↓

IndexedDB

status=pending

Cannot send.

So Sync Manager waits.

Internet comes back.

Browser fires

window.addEventListener("online")

or

WS Connected

Sync Manager

↓

Read

IndexedDB.outbox

Finds

pending messages

For each

WS.send(message)

Simple.
-------------------------------------------
Retry Example

Suppose server returns

500

Sync Manager

retryCount++

↓

wait 2 sec

↓

send

↓

fail

↓

wait 4 sec

↓

send

↓

wait 8 sec

↓

send

Exponential Backoff.

UI still shows

Sending...

--------------------------------------------------
send()

retry()

flushOutbox()

markSent()

markFailed()

listenNetworkChanges()

class MessageSyncManager {

   async send(msg){

      await indexedDB.outbox.put(msg);

      if(network.isOnline()){

          websocket.send(msg);

      }

   }

   async flushOutbox(){

      const pending = await indexedDB.outbox.getAll();

      for(const msg of pending){

           websocket.send(msg);

      }

   }

}
   
*/
