/*
REST vs GraphQL is not purely a frontend decision. It is primarily an API/backend contract decision, and in a real company the frontend usually consumes whatever API strategy the platform/backend provides.

For the interview, I would communicate this explicitly.

What I'd say to the interviewer

"For the API layer, I wouldn't make the REST vs GraphQL decision independently from the backend. It depends on the existing backend contract and the data-access patterns. If the platform already exposes REST APIs, I'll design around those. If it exposes GraphQL, I'll use GraphQL and discuss query shape, pagination and client-side caching accordingly."

Then continue:

"For the purpose of this design, I'll assume we have a REST API unless you want me to assume GraphQL."

That's enough. Don't spend 5 minutes debating REST vs GraphQL.
1. Get Calendar Events

This is the most important API because Day/Week/Month all use it.

GET /calendars/{calendarId}/events

Query parameters:

start
end
limit
cursor

Example:

GET /calendars/cal_123/events
    ?start=2026-08-10T00:00:00Z
    &end=2026-08-17T00:00:00Z
    &limit=100

Response:

{
  "events": [
    {
      "id": "event_1",
      "calendarId": "cal_123",
      "title": "Design Review",
      "start": "2026-08-10T10:00:00Z",
      "end": "2026-08-10T11:00:00Z",
      "timezone": "Asia/Kolkata",
      "version": 5
    }
  ],
  "nextCursor": "abc123",
  "hasMore": false
}
Why start and end?

Because the frontend asks:

Week View
   ↓
Aug 10 → Aug 17
   ↓
GET events for this range

Month:

Month View
   ↓
Aug 1 → Sep 1
   ↓
GET events for this range

So we don't fetch the user's entire calendar.
-------------------------------------------------------------------
2. Create Event
POST /calendars/{calendarId}/events

Body:

{
  "title": "System Design",
  "start": "2026-08-10T10:00:00Z",
  "end": "2026-08-10T11:00:00Z",
  "timezone": "Asia/Kolkata",
  "description": "Frontend design interview",
  "attendees": [
    "user_123",
    "user_456"
  ]
}

Response:

201 Created
-------------------------------------------------------------------
3. Update Event
PATCH /events/{eventId}

Body:

{
  "start": "2026-08-10T11:00:00Z",
  "end": "2026-08-10T12:00:00Z",
  "version": 5
}

The version is important for our concurrent edit conflict.

If server has:

Client version = 5
Server version = 6

then:

409 Conflict
-------------------------------------------------------------------
Delete Event
DELETE /events/{eventId}

For recurring events, we'd additionally specify what we're deleting:

{
  "scope": "THIS_EVENT"
}

or:

{
  "scope": "THIS_AND_FOLLOWING"
}

or:

{
  "scope": "ALL"
}

We don't need to go deeper into recurrence API yet.
-------------------------------------------------------------------
5. Attendees
GET /users/search?q=de&limit=20  "Search should be server-side with debouncing and pagination/limit because the user directory can be very large.
{
  "users": [
    {
      "id": "u1",
      "name": "Deepak",
      "email": "deepak@example.com"
    },
    {
      "id": "u2",
      "name": "Dennis",
      "email": "dennis@example.com"
    },
    {
      "id": "u3",
      "name": "Devika",
      "email": "devika@example.com"
    }
  ]
}

Input
 ↓
Debounce 300ms
 ↓
API
 ↓
Users
 ↓
Dropdown  

Add attendee
POST /events/{eventId}/attendees
{
  "userId": "user_456"
}
Respond to invitation
PATCH /events/{eventId}/attendees/{userId}
{
  "response": "accepted"
}

Possible values:

accepted
declined
tentative
-------------------------------------------------------------------
6. Availability
GET /availability

Parameters:

userIds
start
end

Example:

GET /availability
    ?userIds=user_1,user_2
    &start=2026-08-10T09:00:00Z
    &end=2026-08-10T18:00:00Z

Response:

{
  "availability": [
    {
      "userId": "user_1",
      "busySlots": [
        {
          "start": "2026-08-10T10:00:00Z",
          "end": "2026-08-10T11:00:00Z"
        }
      ]
    }
  ]
}

Frontend can derive common free slots from this.
-------------------------------------------------------------------
7. Incremental Sync

This is important for our realtime + offline architecture.

GET /calendars/{calendarId}/changes
    ?syncToken=abc123

Response:

{
  "updated": [
    {
      "id": "event_123",
      "version": 8
    }
  ],
  "deleted": [
    "event_456"
  ],
  "nextSyncToken": "xyz789"
}

So:

Last sync
   ↓
syncToken = abc123
   ↓
GET changes
   ↓
Only changes
   ↓
nextSyncToken = xyz789
----------------------------------------
What is the syncToken API actually for?

The important distinction is:

Initial load

When I open Calendar for the first time:

GET /calendars/cal_123/events
    ?start=Aug10
    &end=Aug17

Server returns events and a sync token:

{
  "events": [...],
  "nextSyncToken": "abc123"
}

Think of abc123 as:

"This is the point up to which you are synchronized."

Later, something changes

Suppose:

10:00 AM
User A creates Event 1

10:05 AM
User B updates Event 2

10:10 AM
User C deletes Event 3

Your frontend doesn't need to download everything again.

It already has:

syncToken = abc123

So it asks:

GET /calendars/cal_123/changes?syncToken=abc123

Server says:

{
  "updated": [
    {
      "id": "event_1",
      "version": 2
    },
    {
      "id": "event_2",
      "version": 5
    }
  ],

  "deleted": [
    "event_3"
  ],

  "nextSyncToken": "xyz789"
}

Meaning:

"Since abc123, these are the changes. You're now synchronized up to xyz789."

Then client stores:

syncToken = xyz789
2. Is this API called by the Service Worker?

It can be, but that's not its primary purpose.

This is important.

We have two different synchronization scenarios.

Scenario A — Realtime connection is alive
Backend
   │
   │ WebSocket
   ▼
Event Pipeline
   │
   ▼
React Query Cache

You receive changes immediately.

Scenario B — Client missed realtime events

Suppose:

Calendar tab
    ↓
WebSocket connected

Then:

Internet lost
    ↓
WebSocket disconnected
    ↓
Backend changes happen
    ↓
Client misses those events

When connection comes back, we don't want to assume:

"I received everything."

Instead:

Reconnect
   ↓
GET /calendars/{id}/changes?syncToken=abc123
   ↓
Get everything missed
   ↓
Update React Query
   ↓
nextSyncToken = xyz789

So incremental sync is primarily a reconciliation mechanism.
-------------------------------------------------------------------
*/