
/*

--------------- Functional Requirements --------------------
Infinite canvas where users can draw shapes, connectors, text, and freehand lines  zoom in / out

Real-time collaboration — multiple users see each other's changes in under 100ms

Live cursors — users see each other's cursor positions and what each person has selected

Undo/redo that works correctly when multiple people are editing at the same time

Save the board so users can come back and continue where they left off

Export to PNG

------- Core drawing 

Create shapes
    rectangle
    circle/ellipse
    line/arrow
    freehand drawing
    text

Select objects.

Move objects.

Resize/rotate objects.

Delete objects.

Change properties:
    color
    stroke
    background
    thickness
    font size, etc.


---------- Collaboration requirements ⭐⭐⭐

This is where the interview becomes interesting.

Multiple users

Suppose:

Alice ───────┐
             │
Bob ─────────┼──> Same Board
             │
Charlie ─────┘

All users should see changes from other users in near real time.

For example:

Alice:
Move rectangle
      ↓
Frontend
      ↓
WebSocket
      ↓
Server
      ↓
WebSocket
      ↓
Bob + Charlie
      ↓
Update canvas

---------------. Conflict handling ⭐⭐⭐⭐⭐
                    Rectangle
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
           Alice                Bob
          moves it              resizes it
             ↓                   ↓
             └─────────┬─────────┘
                       ↓
                    Server

For example:

Alice changes x
Bob changes width

Could potentially merge them.

But:

Alice changes x = 100
Bob changes x = 500

Now we have a conflict.

We need a conflict-resolution strateg

-----------5. Persistence

The board shouldn't disappear when everyone closes the browser.

We need:

Canvas state
     ↓
Backend
     ↓
Database

When a user opens:

Board ID
   ↓
Fetch board
   ↓
Render existing objects
   ↓
Connect WebSocket
   ↓
Receive real-time updates

-------------- Reconnection

Real-world browsers lose connections.

For example:

User
  ↓
WebSocket connected
  ↓
Internet lost
  ↓
WebSocket disconnected
  ↓
User continues editing
  ↓
Internet restored
  ↓
Reconnect
  ↓
Synchronize missing changes

This is another Senior-level discussion.

We need to avoid:

"Just reconnect the WebSocket."

We need to answer:

How does the client know which changes it missed?

We'll get into sequence numbers / revisions / operation logs later.

---------------------------
*/