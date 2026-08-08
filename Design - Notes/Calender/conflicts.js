/*
you've identified two different meanings of "conflict." This is important because in our Calendar design, we should distinguish them.

1. Scheduling conflict — User has overlapping meetings

This is your example:

User A

10:00 ───────── 11:00
        Meeting 1

10:30 ───────── 11:30
        Meeting 2

The user has two meetings overlapping.

That's a calendar/scheduling conflict.

The frontend can detect this and show:

⚠️ You already have another event during this time.

But this does NOT necessarily mean the API should return 409.

The user might intentionally want overlapping events.

For example:

10:00 - 11:00
Team Meeting

10:30 - 11:30
Optional Webinar

Calendar should allow it.

So I'd call this:

Scheduling overlap / availability conflict
------------------------------------------------------------------------------
2. Concurrent update conflict — THIS is what I meant by 409

This is a completely different problem.

Suppose:

Event 123
10:00 - 11:00
version = 10

User A opens the event
User A
Event 123
version 10

User B opens the same event
User B
Event 123
version 10

Now:

User A changes it
10:00 → 11:00
        ↓
Server
version 10 → 11

User B is offline

B still has:
Event 123
version = 10

B changes:
10:00 → 12:00

Later B reconnects and sends:

UPDATE event-123
baseVersion = 10

But server says:

Current version = 11
Client version  = 10

So:

409 Conflict

This is a data synchronization conflict.

So we have TWO conflicts
Conflict	Example	How we handle
Scheduling conflict	User has Meeting A 10–11 and Meeting B 10:30–11:30	Warn/suggest alternatives
Concurrent update conflict	User A and B edit the same event based on different versions	409 Conflict + reconciliation
This distinction is VERY important for your interview.

Your functional requirement:

Conflict Resolution

was actually ambiguous.

I'd change it to:

Functional requirement

Scheduling & Concurrent Update Handling

Detect overlapping events when scheduling.
Handle concurrent edits to the same event without silently overwriting changes.

Then when we discuss the data model:

Event
 ├── version
 └── updatedAt

version is specifically for concurrent update conflict, not for detecting overlapping meetings.

How do we detect overlapping meetings?

That's actually a separate problem.

Suppose user wants:

10:30 → 11:30

We already have:

10:00 → 11:00

We can check:

newStart < existingEnd
AND
newEnd > existingStart

So:

10:30 < 11:00  ✅
11:30 > 10:00  ✅

→ OVERLAP

But again:

Overlap doesn't necessarily mean reject the event.

Google Calendar can show the user that they're double-booked.

For our architecture

I'd therefore have:

                Calendar
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
 Scheduling Conflict    Data Conflict
          │                   │
   Overlapping events    Concurrent edits
          │                   │
          ▼                   ▼
 Availability /          version / ETag
 overlap detection             │
          │                    ▼
          │                  409
          │                    │
          │                    ▼
          │               Reconciliation
          ▼
 Warning / suggestion

This is a much cleaner model.

And for our D (Data Model) discussion, the Event.version we added is specifically there for the second type — concurrent update conflicts.

*/
