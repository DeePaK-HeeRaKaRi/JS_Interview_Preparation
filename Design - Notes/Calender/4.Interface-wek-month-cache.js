/*

For Calendar, the important thing is:

The query is range-based (start, end) and pagination is cursor-based if that range contains many events.

1. REST API for Week View

Suppose the user is viewing:

Aug 10 → Aug 16

We call:

GET /calendars/cal_123/events
    ?start=2026-08-10T00:00:00Z
    &end=2026-08-17T00:00:00Z
    &limit=100

If there are more than 100 events:

{
  "events": [...100 events...],
  "nextCursor": "cursor_100",
  "hasMore": true
}

Next request:

GET /calendars/cal_123/events
    ?start=2026-08-10T00:00:00Z
    &end=2026-08-17T00:00:00Z
    &limit=100
    &cursor=cursor_100

So:

Week
 ↓
start + end
 ↓
first 100
 ↓
hasMore?
 ↓ yes
next cursor
 ↓
next 100
2. Month View

Suppose:

Aug 1 → Aug 31

Request:

GET /calendars/cal_123/events
    ?start=2026-08-01T00:00:00Z
    &end=2026-09-01T00:00:00Z
    &limit=100

If there are 350 events:

Request 1 → events 1–100
Request 2 → events 101–200
Request 3 → events 201–300
Request 4 → events 301–350

using the cursor returned by the previous request.

--------------------------------------------------------------
4. Now the important part — React Query caching

Let's say Week view makes:

Aug 10 → Aug 17

Our React Query key is:

[
  "calendar-events",
  "cal_123",
  "2026-08-10",
  "2026-08-17"
]

The cache looks conceptually like:

React Query Cache

┌──────────────────────────────────────┐
│ calendar-events                     │
│                                      │
│ cal_123 | Aug10 → Aug17              │
│ └── events                           │
│                                      │
│ cal_123 | Aug17 → Aug24              │
│ └── events                           │
│                                      │
│ cal_123 | Aug01 → Sep01              │
│ └── events                           │
└──────────────────────────────────────┘
5. User navigates Week → Next Week

Initially:

Aug 10 → Aug 17

Request:

["calendar-events", "cal_123", "Aug10", "Aug17"]

Then user clicks:

Next Week

Now:

Aug 17 → Aug 24

Different query key:

["calendar-events", "cal_123", "Aug17", "Aug24"]

So React Query fetches that range.
---------------------------------------------------------------------------
6. User goes back

User clicks:

Previous Week

Now:

Aug 10 → Aug 17

React Query sees:

["calendar-events", "cal_123", "Aug10", "Aug17"]

already exists.

So if it's still fresh:

Cache HIT
    ↓
Render immediately

No network request is required.
-------------------------------------------------------------------------
**********************IMPORTANT***********************
8. The tricky Month/Week overlap

This is where a good interviewer may push you.

We have:

Week:
Aug 10 → Aug 17

and:

Month:
Aug 1 → Sep 1

The month response contains the events from the week.

But our cache keys are:

Week:
[events, cal_123, Aug10, Aug17]

Month:
[events, cal_123, Aug01, Sep01]

So we have duplicate event data in two cache entries.

For a first implementation, that's acceptable.

But if the interviewer asks:

"Wouldn't that duplicate data?"

Answer:

"Yes. For a simple implementation I would accept range-based query caching because it keeps the cache model simple. If we have significant overlap and frequent event updates, I'd normalize events by eventId and maintain a range-to-event index, so the same event isn't duplicated across cache entries."

That's a strong answer.

---------SOLUTION----------------
Query key = [calendarId, start, end]

then:

Month: Aug 1 → Sep 1
Week:  Aug 10 → Aug 17
Day:   Aug 12 → Aug 13

the same event can exist in 3 cache entries.

That's unnecessary duplication.

Better approach: Normalize the events

Instead of storing the actual event object inside every range cache, maintain one canonical event store indexed by eventId.
                    React Query
                         │
              ┌──────────┴──────────┐
              │                     │
        Event Entity Cache      Range Index
              │                     │
              ▼                     ▼
        event_101             Aug 1-Sep 1
        event_102             → [101,102,103]
        event_103             │
                              │
                              ├── Aug 10-Aug 17
                              │   → [101,103]
                              │
                              └── Aug 12-Aug 13
                                  → [103]

Canonical Event Store
type EventStore = {
  entities: Record<string, Event>;
};

Example:

{
  entities: {
    "event-101": {
      id: "event-101",
      title: "Team Meeting",
      start: "2026-08-12T10:00",
      end: "2026-08-12T11:00",
      version: 5
    },

    "event-102": {
      id: "event-102",
      title: "Interview",
      start: "2026-08-15T14:00",
      end: "2026-08-15T15:00",
      version: 2
    }
  }
}

Each event is stored once.

2. Range Index

Now the query cache doesn't store the complete events.

It stores:

type RangeIndex = {
  queryKey: string;
  eventIds: string[];
  nextCursor?: string;
};

For example:

{
  "calendar:cal1:2026-08-01:2026-09-01": [
    "event-101",
    "event-102",
    "event-103"
  ],

  "calendar:cal1:2026-08-10:2026-08-17": [
    "event-101",
    "event-103"
  ]
}

Then:

Range
  ↓
eventIds
  ↓
Event Entity Store
  ↓
actual Event objects

---------------------------------------------

3. What happens when Month is loaded?

Request:

GET /events
?start=Aug1
&end=Sep1

Server returns:

event-101
event-102
event-103

We do:

                 API
                  ↓
            Normalize response
                  ↓
       ┌──────────┴──────────┐
       ↓                     ↓
Event Entity Store       Range Index
       │                     │
       │              Aug1-Sep1
       │              → 101,102,103
       ↓
101
102
103

--------------------------------
4. Now Week View loads

Week:

Aug10 → Aug17

API returns:

event-101
event-103

Instead of storing another copy:

❌ DON'T:

Month cache
 → full event-101
 → full event-102
 → full event-103

Week cache
 → full event-101
 → full event-103

We do:

Event Entity Store
 ├── 101
 ├── 102
 └── 103

Range Index
 ├── Month → [101,102,103]
 └── Week  → [101,103]

No duplication.
--------------------------------------
5. What happens when Event 103 changes?

This is where normalization becomes really valuable.

Suppose:

event-103
10:00 → 11:00

changes to:

11:00 → 12:00

We update:

Event Entity Store
      ↓
event-103 updated

Now every range referencing:

event-103

automatically gets the latest event.

-------------------------------------------
But there's a catch

We need to know which ranges contain the event.

That's why the range index exists.

event-103
↑
│
┌──┴───────────────┐
│ │
Month Week
Aug1-Sep1 Aug10-Aug17

When the event changes its time, we may need to update its range membership.

Example:

Old:
Aug 12 10:00

New:
Aug 20 10:00

Then:

Remove event-103
from Aug10-Aug17 index

Add event-103
to Aug17-Aug24 index

If the new date range already exists in the cache/index, then we add the event ID to that existing range.

Example:

Aug 17–24 → [E, F]

Event A moves from Aug 11 → Aug 20:

Before:
Aug 10–17 → [A, B, C]
Aug 17–24 → [E, F]

After:

Aug 10–17 → [B, C]
Aug 17–24 → [E, F, A]

We don't create another Aug 17–24 entry. We simply add A to the existing one.

If that range doesn't exist in cache, then we don't need to add anything yet—the event will appear when that range is fetched.

That's the whole idea.
*/