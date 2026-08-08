/*
7. React Query vs IndexedDB

This is the mental model I want you to use in the interview:

                 SERVER DATA
                     │
                     ▼
              React Query
            "What UI needs now"
                     │
                     ▼
                   UI

Whereas:

             DURABLE CLIENT DATA
                     │
                     ▼
                 IndexedDB
                     │
              ┌──────┴──────┐
              │             │
          Outbox        Optional
        mutations      cached data
React Query
events
calendars
availability
attendees

Fast runtime server-state cache.

IndexedDB
pending CREATE
pending UPDATE
pending DELETE

Must survive tab/browser lifecycle.

And optionally:

recent events
calendar metadata
last sync token

if we want offline reads.



*/