/*
usually for w>store in indexdb or wheerever it is a metadata
{
syncmetadata{
    lastSyncToken or lastsyncversion
    lastUpdatedAt
}
}

What I'd say in an interview

For a basic Kanban board:

"I wouldn't introduce a sync token initially. On reconnect, I'd simply invalidate the board query and let React Query refetch the latest state."

For a production-scale system (Jira, Notion, Slack):

"To avoid re-downloading large boards after reconnecting, I'd store a lastSyncToken (or sequence number) in IndexedDB.
 On reconnect, the client requests only the changes since that token, reducing bandwidth and speeding up synchronization."

There are actually two different sync strategies:

Full Sync (download everything)
Incremental (Delta) Sync ⭐⭐⭐⭐⭐ (used by Slack, Notion, Jira, Figma, etc.)

The lastSyncToken exists for Incremental Sync.

Without Sync Token

Imagine your board has:

100 Columns

5000 Cards

30000 Comments

User goes offline.

Works for 10 minutes.

Comes back online.

What should happen?

Option 1:

GET /board/123

Backend returns

5000 cards

100 columns

30000 comments

Again.

❌ Huge waste.

With Sync Token

Suppose before going offline you had synced everything.

Backend gives

syncToken = "abc123"

Store it.

{
  "syncMetadata": {
    "lastSyncToken": "abc123"
  }
}

10 minutes later...

Reconnect.

Instead of

GET /board/123

You send

GET /board/123/changes?since=abc123

Backend says

Since abc123

Only these changed:

Card 14 moved

Card 51 updated

Comment added

Label deleted

That's it.

Visual Example

Before offline

Backend Version

v120

You save

lastSyncToken = v120

Offline...

Meanwhile

Bob

Move Card A

Charlie

Create Card

Server now

v123

Reconnect

Client sends

I have

v120

Server

Here are

v121
v122
v123

No need to send entire board.

What is lastSyncedAt?

This is simply

{
   "lastSyncedAt":"2026-07-12T10:20:00Z"
}

Mostly useful for

diagnostics
debugging
analytics
showing UI

Example

Last synced

2 minutes ago

Not mandatory.

Another use case

Imagine WebSocket disconnects.

WS Connected

↓

Receive Event 101

↓

Receive Event 102

↓

Connection Lost

While disconnected

Server generated

103

104

105

106

Reconnect

Instead of

Reload board

Client sends

Last Sync Token = 102

Server returns

103

104

105

106

Very efficient.

What exactly is Sync Token?

It depends on the backend.

Could be

Version
102
Timestamp
2026-07-12T10:22:15Z
Cursor
cursor_x72h
Event Sequence Number ⭐
lastEvent = 9851

Slack-like systems often use something similar.

*/