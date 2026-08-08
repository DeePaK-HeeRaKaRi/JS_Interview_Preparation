/*
where exactly is the server communication in this offline flow?", it's here:

                Calendar UI
                    │
                    ▼
                Controller
                    │
          ┌─────────┴─────────┐
          │                   │
       ONLINE              OFFLINE
          │                   │
          ▼                   ▼
     API Service         IndexedDB
          │                Outbox
          │                   │
          │            Service Worker
          │                   │
          │            Background Sync
          │                   │
          └──────────┬────────┘
                     ▼
                API Service
                     │
                     ▼
                HTTP / HTTPS
                     │
                     ▼
                 Backend
*/