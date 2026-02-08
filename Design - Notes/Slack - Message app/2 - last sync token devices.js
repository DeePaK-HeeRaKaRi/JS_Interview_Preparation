/*
Short, correct answer first

Each device has its OWN lastSyncToken.
Tokens are not shared across devices, even for the same user.

That’s the rule.
Now let’s explain why, how, and what happens in real life.

1️⃣ Why tokens cannot be shared across devices

Think about two devices of the same user:

📱 Mobile

💻 Laptop

They are independent replicas.

Each device can:

go offline at different times

miss different events

store different local history

reconnect at different moments

So the question is:

“Up to which event has THIS device processed?”

That answer is device-specific, not user-specific.

2️⃣ What a syncToken really represents (important)

syncToken = “last EVENT applied by THIS client instance”

Not:

last message

last timestamp

last user action

So naturally:

Device A → token = 500

Device B → token = 480

Both are correct.

3️⃣ Concrete example (this will lock it in)
Timeline

Event IDs are global & monotonically increasing on server

Event 498  MESSAGE_CREATED
Event 499  MESSAGE_CREATED
Event 500  MESSAGE_DELETED (Feb 15)

Device A (Laptop)

Online continuously

Processes events in real time

lastSyncToken(A) = 500

Device B (Mobile)

Offline since Feb 10

Misses delete event

lastSyncToken(B) = 497

4️⃣ What happens when both reconnect?
Laptop reconnects
GET /events?after=500
→ []


Already up to date ✅

Mobile reconnects
GET /events?after=497
→ [498, 499, 500]


Mobile now:

receives delete event

applies tombstone

updates token

lastSyncToken(B) = 500


✅ Both devices now consistent
❌ No shared token required

5️⃣ Where are these tokens stored?
On the client

Each device stores its own token:

IndexedDB

secure storage

local persistent storage

Example:

indexedDB.sync_meta.lastSyncToken

On the server (optional, but common)

Server may track:

(user_id, device_id) → lastSeenEvent


This is used for:

debugging

analytics

push optimization

But not required for correctness.

6️⃣ Why NOT a single token per user (very important)

If you tried to share one token:

❌ Broken scenario

Laptop processes delete event → advances token to 500

Mobile is offline

Token is now 500 globally

Mobile reconnects later

Mobile asks:

GET /events?after=500


Server returns:

[]


💥 Delete event is missed forever on mobile

This is a data consistency bug.

7️⃣ Interview-ready explanation (say this verbatim)

“Sync tokens are per device, not per user. Each device is an independent replica and must track which events it has processed.”

This sentence alone shows distributed systems maturity.

8️⃣ How this ties back to your Feb 3 → Feb 15 → Feb 20 example

Even if:

message is old

delete event is new

device never stored the message

The device:

receives delete event

advances its own token

stores tombstone

never resurrects the message later

All because:

Token tracks events, not data

9️⃣ Final mental model (lock this)
User
 ├── Device A → syncToken = X
 ├── Device B → syncToken = Y
 └── Device C → syncToken = Z


Same event stream.
Different progress pointers.

One-line takeaway (memorize)

Multi-device sync works because each device tracks its own position in the event stream.

If you say this in an interview, you’re well into senior FE / system design territory.

*/