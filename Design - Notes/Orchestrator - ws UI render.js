
/*
Incoming event processing happens immediately; UI state flushing is batched using requestAnimationFrame.

WebSocket event
     ↓
handleEvent()
     ↓
Parse / Normalize / Business Logic   ← NOT rAF
     ↓
pendingUpdates Map
     ↓
scheduleFlush()
     ↓
requestAnimationFrame               ← HERE
     ↓
flush buffered updates to Store

requestAnimationFrame mental model ⭐
Event 1 ──┐
Event 2 ──┤
Event 3 ──┤──→ Same Temporary Buffer
Event 4 ──┘
                │
                ▼
         Only ONE rAF scheduled
                │
                ▼
           Next Frame
                │
                ▼
             Flush
                │
                ▼
          Update Store
6. Why frameScheduled?
if (this.frameScheduled) return;

It prevents this:

Event 1 → rAF
Event 2 → rAF
Event 3 → rAF
Event 4 → rAF

Instead:

Event 1 → Schedule ONE rAF

Event 2 → Update buffer only
Event 3 → Update buffer only
Event 4 → Update buffer only

Next Frame → Flush once

So:

frameScheduled ensures only one UI flush is scheduled per fram

--------------------
Most important rule ⭐⭐⭐
Do NOT do heavy processing inside requestAnimationFrame

❌ Avoid:

requestAnimationFrame(() => {
  parseLargeData();
  validateData();
  sortThousandsOfItems();
  calculateSomethingHeavy();

  updateStore();
});

Because:

Heavy JS inside rAF
       ↓
Frame takes too long
       ↓
Missed frame
       ↓
UI jank ❌
Prefer:
Outside rAF
───────────

Parse
Validate
Normalize
Business logic
Deduplication

       ↓

Buffer / Coalesce

       ↓

Inside rAF
──────────

Small batch flush
Update store
Final memory sentence

requestAnimationFrame is a UI flush boundary, not a place for heavy processing.

And if parsing/processing itself is expensive:

WebSocket
   ↓
Web Worker
   ↓
Parse / Process
   ↓
Main Thread Buffer
   ↓
rAF
   ↓
Store
   ↓
UI

*/

class MarketOrchestrator {
  constructor(store) {
    this.store = store;

    // Temporary buffer
    this.pendingUpdates = new Map();

    // Prevent multiple rAF callbacks
    this.frameScheduled = false;
  }

  handleMessage(rawEvent) {
    // -----------------------------------
    // 1. Parse / Normalize
    // NOT inside requestAnimationFrame
    // -----------------------------------

    const event = this.normalizeEvent(rawEvent);

    // Example normalized event:
    // {
    //   symbol: "TCS",
    //   price: 3500,
    //   timestamp: 123456
    // }


    // -----------------------------------
    // 2. Business logic
    // NOT inside requestAnimationFrame
    // -----------------------------------

    if (!this.isValid(event)) {
      return;
    }


    // -----------------------------------
    // 3. Coalesce updates
    // Latest value wins
    // -----------------------------------

    this.pendingUpdates.set(event.symbol, event);


    // -----------------------------------
    // 4. Schedule UI flush
    // -----------------------------------

    this.scheduleFlush();
  }


  scheduleFlush() {
    // Already scheduled for this frame
    if (this.frameScheduled) {
      return;
    }

    this.frameScheduled = true;


    // -----------------------------------
    // 5. UI flush boundary
    // -----------------------------------

    requestAnimationFrame(() => {
      this.flush();
    });
  }


  flush() {
    // Take snapshot of buffered updates
    const updates = new Map(this.pendingUpdates);

    // Clear buffer for new incoming events
    this.pendingUpdates.clear();

    // Allow scheduling next frame
    this.frameScheduled = false;


    // -----------------------------------
    // 6. ONE batch store update
    // -----------------------------------

    this.store.getState().updatePrices(updates);
  }


  normalizeEvent(rawEvent) {
    return {
      symbol: rawEvent.symbol,
      price: Number(rawEvent.price),
      timestamp: rawEvent.timestamp,
    };
  }


  isValid(event) {
    return (
      event.symbol &&
      Number.isFinite(event.price)
    );
  }
}