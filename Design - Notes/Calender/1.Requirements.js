
/*
Functional

Create / Edit / Delete Events
Users can create, update, and delete calendar events.

View Calendar
Day, Week, and Month views.
Navigate between dates.


Invite Attendees
Add/remove attendees.
Attendees can Accept / Decline / Tentative.

Search events by title, attendee, location, etc.

Real time events - Changes made by other users/devices should reflect without a manual refresh.

Timezones - Events should correctly handle different time zones 

Conflict Resolution - The application should detect and provide options to resolve conflicting events.

Recurring Events
Support daily, weekly, monthly, and custom recurring events.

------------------------------------------------------------
Non Functional

Performance - Faster intial load &  smooth calender navigation
Device Support
Security - Only authorized users should be able to see the events
Observability -  track any erros,performance etc
Accesibility - screen readers 
scability - like it should support atleast 50+ events in a day (may be 100) without degrading perfromance

----------------------------------------------------

Now pick 5 functional reqs

Why these 5?

Because each one drives an important part of our frontend architecture:

Requirement	Later design topic

Create/Edit/Delete	            State management + API + optimistic updates
Calendar Views	                Rendering + performance
Recurring Events	            Data modeling + rendering
Attendees + Availability	    API + derived state
Real-time Updates	            WebSocket + synchronization + conflicts
*/