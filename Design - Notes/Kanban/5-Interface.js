/*
Board APIs
Method	Endpoint	Purpose
GET	/boards	Fetch all accessible boards
GET	/boards/{boardId}	Fetch board metadata (title, members, settings)
POST	/boards	Create a new board
PATCH	/boards/{boardId}	Update board details
DELETE	/boards/{boardId}	Delete/archive a board
-------------------------------------------------------
Column APIs
Method	Endpoint	Purpose
GET	/boards/{boardId}/columns	Fetch all columns
POST	/boards/{boardId}/columns	Create a column
PATCH	/columns/{columnId}	Rename/update column
PATCH	/columns/{columnId}/move	Reorder columns
DELETE	/columns/{columnId}	Delete column
-------------------------------------------------------
Card APIs ⭐⭐⭐⭐⭐
Method	Endpoint	Purpose
GET	/boards/{boardId}/cards?cursor=&limit=	Fetch cards (supports pagination)
GET	/cards/{cardId}	Fetch card details
POST	/cards	Create card
PATCH	/cards/{cardId}	Update title, description, assignee, labels, etc.
PATCH	/cards/{cardId}/move	Move card between columns / reorder
DELETE	/cards/{cardId}	Delete card
------------------------------------------------------------------
Move Card Request
{
  "sourceColumnId": "todo",
  "targetColumnId": "inprogress",
  "position": 2,
  "version": 15,
  "mutationId": "m123"
}
  ---------------------------------------------
Comment APIs
Method	Endpoint	Purpose
GET	/cards/{cardId}/comments	Fetch comments
POST	/cards/{cardId}/comments	Add comment
PATCH	/comments/{commentId}	Edit comment
DELETE	/comments/{commentId}	Delete comment

------------------------------------------------------------------
Attachment APIs
Method	Endpoint	Purpose
POST	/cards/{cardId}/attachments	Upload attachment
DELETE	/attachments/{attachmentId}	Remove attachment
------------------------------------------------------------------
Member APIs
Method	Endpoint	Purpose
GET	/boards/{boardId}/members	Fetch board members
POST	/boards/{boardId}/members	Invite member
PATCH	/boards/{boardId}/members/{memberId}	Update role
DELETE	/boards/{boardId}/members/{memberId}	Remove member
------------------------------------------------------------------
Search APIs
Method	Endpoint	Purpose
GET	/boards/{boardId}/search?q=&labels=&assignee=&status=	Search and filter cards
------------------------------------------------------------------
WebSocket Interface

Unlike REST, WebSocket typically has one connection and one subscription, with multiple event types.

Connection
WS /ws
Subscribe
{
  "action": "SUBSCRIBE_BOARD",
  "boardId": "board-1"
}
Unsubscribe
{
  "action": "UNSUBSCRIBE_BOARD",
  "boardId": "board-1"
}
Incoming Event Types
Event	Purpose
CARD_CREATED	New card created
CARD_UPDATED	Card details updated
CARD_MOVED	Card moved/reordered
CARD_DELETED	Card deleted
COLUMN_CREATED	Column created
COLUMN_UPDATED	Column renamed/reordered
COLUMN_DELETED	Column removed
COMMENT_ADDED	Comment added
COMMENT_UPDATED	Comment edited
MEMBER_ADDED	Member joined
MEMBER_REMOVED	Member removed
BOARD_UPDATED	Board metadata updated
------------------------------------------------------------------

What I'd actually write in an interview

You don't need to write 25 APIs. I'd keep it to the essentials:

Resource	APIs
Board	GET /boards, GET /boards/{id}, POST /boards, PATCH /boards/{id}
Column	POST /columns, PATCH /columns/{id}, PATCH /columns/{id}/move
Card ⭐	GET /cards, POST /cards, PATCH /cards/{id}, PATCH /cards/{id}/move, DELETE /cards/{id}
Comment	GET/POST /comments
Members	GET/POST /members
WebSocket	SUBSCRIBE_BOARD, UNSUBSCRIBE_BOARD, board event stream
*/