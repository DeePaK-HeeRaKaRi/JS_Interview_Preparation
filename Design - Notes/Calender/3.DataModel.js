
/*
Core Domain Models

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  timezone: string;
};

type Calendar = {
  id: string;
  name: string;
  ownerId: string;
  color: string;
  timezone: string;
  userPreferences: UserPreferences;
  videoConference?: VideoConference;
  availability_time: AvailabilityTime
};

type VideoConference = {
  provider: "google_meet" | "zoom" | "teams";
  meetingUrl: string;
};

type TimeRange = {
  from: string; // "09:00"
  to: string;   // "17:00"
};

type AvailabilityTime = {
  monday: TimeRange[];
  tuesday: TimeRange[];
  wednesday: TimeRange[];
  thursday: TimeRange[];
  friday: TimeRange[];
  saturday: TimeRange[];
  sunday: TimeRange[];
};

09:00 - 12:00
13:00 - 17:00

So TimeRange[] is more flexible.

type UserPreferences = {
  timeFormat: "12h" | "24h";
  dateFormat: "MM/DD/YYYY" | "DD/MM/YYYY";
};

type Event = {
  id: string;
  calendarId: string;

  title: string;
  description?: string;

  start: DateTime;
  end: DateTime;

  timezone: string;

  location?: string;

  organizerId: string;

  attendees: Attendee[];

  recurrence?: RecurrenceRule;

  status: "confirmed" | "cancelled";

  version: number;

  createdAt: string;
  updatedAt: string;
};

type Attendee = {
  userId: string;
  email: string;

  response:
    | "accepted"
    | "declined"
    | "tentative"
    | "needsAction";
};

type RecurrenceRule = {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval?: number;

  daysOfWeek?: number[];

  until?: string;
  count?: number;
};

------------------------------------------------------------------------
2. Why version is important

I would definitely keep:

version: number;

Because we already decided that conflicts matter.

Example:

Client has:

Event 123
version = 10

Another user changes it:

Server
version = 11

Our offline client later sends:

UPDATE Event 123
baseVersion = 10

Server sees:

currentVersion = 11
baseVersion = 10

→ 409 Conflict

So the data model directly supports our conflict-resolution requirement.
-----------------------------------------------------------------------

4. Client/UI State

This should be separate from server state.

I'd use Zustand for things like:

type CalendarUIState = {
  selectedDate: string;

  view:
    | "day"
    | "week"
    | "month";

  selectedCalendarIds: string[];

  isEventModalOpen: boolean;

  editingEventId?: string;

  filters: {
    search?: string;
  };
};

-----------------------------------------------------------------------

5. React Query State

Conceptually:

React Query Cache

calendar:
  calendar-1

events:
  [event-1]
  [event-2]
  [event-3]

availability:
  [user-1]
  [user-2]

You can think of the cache as:

type CalendarServerState = {
  calendars: Calendar[];
  events: Event[];
  availability: Availability[];
};

"I would normalize entities if the dataset and update frequency justify it, especially because the same users/calendars can be referenced by many events."

-------------------------------------------------
7. Sync Metadata

Because we have realtime + incremental synchronization, I'd introduce:

type SyncMetadata = {
  lastSyncToken?: string;

  lastSyncedAt?: string;

  connectionState:
    | "connected"
    | "disconnected"
    | "reconnecting";
};

This is not calendar domain data.

It's synchronization metadata.

Example:

Calendar data
       +
Sync metadata

The syncToken can be used when asking the backend:

"Give me changes since my last synchronization."

---------------------------------------------------------------------
8. Offline Outbox

This is where our previous discussion becomes important.

We need a separate model:

type PendingMutation = {
  mutationId: string;
  operation:
    | "CREATE_EVENT"
    | "UPDATE_EVENT"
    | "DELETE_EVENT";

  eventId?: string;
  payload: unknown;
  baseVersion?: number;
  createdAt: string;
  retryCount: number;
  status:
    | "pending"
    | "syncing"
    | "conflict"
    | "failed";
};

This goes into:

IndexedDB
   ↓
pending_mutations

Not React Query.
---------------------------------------------------------------------
9. Why mutationId?

Suppose the user updates an event:

mutationId = mut-123

Request reaches server.

But response is lost:

Client ─── PATCH ───> Server
Client <── X network failure

Client doesn't know whether the server processed it.

It retries:

mutationId = mut-123

The backend can recognize:

"I've already processed mut-123."

and avoid applying the same mutation twice.

This gives us idempotency.
---------------------------------------------------------------------
10. Conflict State

If server responds:

409 Conflict

we shouldn't keep retrying forever.

The outbox entry becomes:

{
  mutationId: "mut-123",
  eventId: "event-456",

  status: "conflict",

  baseVersion: 10,

  payload: {
    start: "...",
    end: "..."
  }
}

And we can keep the server's latest version separately when needed:

type Conflict = {
  mutationId: string;

  localVersion: Event;

  serverVersion: Event;

  reason: "VERSION_CONFLICT";
};

Then the UI can show:

Your version
     VS
Server version

[Keep Mine]
[Keep Server]
[Merge]


*/
