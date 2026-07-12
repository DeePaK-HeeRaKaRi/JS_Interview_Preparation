/*
type Board {
    id: string
    title: string
    members: BoardMember[]
    columnIds: string[]
    createdAt: string
    updatedAt: string
}

type BoardMember {
    userId: string
    role: "Admin" | "Editor" | "Viewer"
}

type User {
    id: string
    name: string
    avatar: string
    teamIds: string[]
}

type Team {
    id: string
    name: string
}

type Column {
    id: string
    boardId: string
    title: string
    order: number
    cardIds: string[]
}

type Card {
    id: string
    boardId: string
    columnId: string
    title: string
    description: string
    assigneeId: string
    reporterId: string
    labelIds: string[]
    attachmentIds: string[]
    commentIds: string[]
    dueDate: string
    priority: "Low" | "Medium" | "High"
    type: "Epic" | "Story" | "Task" | "Bug"
    status: "Todo" | "InProgress" | "Done"
    createdAt: string
    updatedAt: string
}

type Comment {
    id: string
    cardId: string
    userId: string
    text: string
    createdAt: string
}

type Attachment {
    id: string
    url: string
    fileName: string
}

type Label {
    id: string
    name: string
    color: string
}

------------------------------
2. Server State (React Query)

Now explain

"I'll normalize these entities."

{
  "boards": {
    "byId": {},
    "allIds": []
  },

  "columns": {
    "byId": {},
    "allIds": []
  },

  "cards": {
    "byId": {},
    "allIds": []
  },

  "users": {
    "byId": {}
  },

  "labels": {
    "byId": {}
  }
}
  This is where optimistic updates happen.

Example

Move Card

↓

cards.byId.c123.columnId = done-
-------------------------------
3. Client State (Zustand)

Only UI state.

{
  "selection": {
    "selectedBoardId": "",
    "selectedColumnId": "",
    "selectedCardId": ""
  },

  "dragState": {
    "draggingCardId": "",
    "sourceColumnId": "",
    "targetColumnId": "",
    "dropIndex": 0
  },

  "filters": {
    "searchText": "",
    "assigneeIds": [],
    "labelIds": [],
    "priority": [],
    "sortBy": "updatedAt"
  },

  "ui": {
    "isCardDrawerOpen": false,
    "isCreateModalOpen": false,
    "isFilterPanelOpen": false,
    "isSidebarCollapsed": false
  },

  "preferences": {
    "theme": "dark",
    "boardZoom": 1,
    "columnWidths": {}
  }
}

Notice

NO

cards

columns

board

Those belong to React Query.

------------------------------------
4. Offline State (IndexedDB)
{
  "offlineQueue": [
    {
      "mutationId": "",
      "status": "pending",
      "payload": {}
    }
  ],

  "drafts": {
    "card123": {
      "description": "..."
    }
  },

  "cachedBoards": {},

  "cachedCards": {},

  "syncMetadata": {
    "lastSyncToken": "",
    "lastSyncedAt": ""
  }
}
  -------------------------------------

  5. Mutation Model

Very important.

{
  "mutationId": "m101",

  "type": "MOVE_CARD",

  "status": "pending",

  "payload": {
    "cardId": "c123",

    "sourceColumnId": "todo",

    "targetColumnId": "done",

    "position": 2
  },

  "createdAt": ""
}

Other examples

CREATE_CARD

UPDATE_CARD

DELETE_CARD

MOVE_CARD

ADD_COMMENT
---------------------------
6. Realtime Event Model
{
  "eventId": "e101",

  "mutationId": "m101",

  "boardId": "b1",

  "type": "CARD_MOVED",

  "version": 15,

  "timestamp": "",

  "payload": {
    "cardId": "c123",

    "sourceColumnId": "todo",

    "targetColumnId": "done",

    "position": 2
  }
}
Why do we need both?

Mutation

Outgoing

Event

Incoming

Mutation

Client

↓

Server

Event

Server

↓

Everyone
-------------------------------------------
7. WebSocket Subscription Model

Usually people forget this.

{
  "boardId": "board-1",

  "subscriptionId": "sub123",

  "status": "CONNECTED",

  "lastHeartbeat": "",

  "lastSequenceNumber": 101
}

This helps resume after reconnect.
--------------------------------------------------
8. Sync State

Also important.

{
  "status": "ONLINE",

  "pendingMutations": 4,

  "lastSyncToken": "",

  "lastSyncedAt": "",

  "isReconnecting": false
}

-----------------------------------------------------

*/