/*
Question 1: What operations should users perform?

Possible answer:

View boards
View columns (Todo, In Progress, Done)
CRUD operations on cards
Move card between columns
Reorder cards inside a column

These are the core CRUD operations.
-----------------------------------------
Question 2: Is drag & drop required?

This changes the design significantly.

Yes.

Drag between columns
Drag within same column
Smooth animations
Optimistic updates
----------------------------------------
Question 3: Multiple users?Live updates

Yes, multiple users can edit simultaneously.

Real-time updates
Conflict handling[CRDT]
WebSocket/SSE
----------------------------------------

Question 4: How large can boards become?

This determines rendering strategy.

Example answer:

20 columns
500 cards each

or

10 columns
100 cards each

Large boards imply:

Virtualization
Memoization
Efficient drag/drop

------------------------------------------------

Question 5: Offline support?

Possible answer:yes users can do crud while offline 

IndexedDB
Queue mutations
Sync later
-----------------------------------
Question 6: Search/filter?

Example:

Search by title,teamnames
Filter by labels,teamnames,assignee etc
-----------------------------------
Non Functional reqs

Low latency UI(optimistic updates)
Device compatibility 
Performance
Scalability
Real-time collaboration
Offline support
Reliability
Accessibility
Security (auth,data rules),auditable with proper logs on who made changes
Responsive UI
Monitoring an observability


*/