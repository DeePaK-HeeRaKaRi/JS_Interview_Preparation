/*

interface Conversation {
  id: string;
  type: "direct" | "group";
  title: string;
  participants: UserSummary[];
  lastMessage?: MessagePreview;
  unreadCount: number;
  lastActivityAt: string;
  isPinned: boolean;
  isMuted: boolean;
  avatarUrl?: string;
}

interface Message {
  id: string;
  clientId?: string;
  conversationId: string;
  senderId: string;
  text: string;
  type:
    | "text"
    | "image"
    | "file"
    | "system";
  createdAt: string;
  editedAt?: string;
  status:
      | "pending"
      | "sent"
      | "delivered"
      | "read"
      | "failed";
  attachments?: Attachment[];
}
If interviewer asks

Why clientId?

Because

Offline

↓

Generate UUID

↓

Store Pending

↓

Server Returns Real ID

↓

Map clientId → serverId
interface UserSummary{
    id:string;
    name:string;
    avatarUrl:string;
    presence:
      |"online"
      |"offline"
      |"away";
}

interface Attachment{
    id:string;
    url:string;
    mimeType:string;
    size:number;
}

interface ChatEvent{
    eventId:number;
    type:
      |"MESSAGE_CREATED"
      |"MESSAGE_EDITED"
      |"MESSAGE_DELETED"
      |"READ_RECEIPT"
      |"USER_TYPING";
    conversationId:string;
    payload:any;
    timestamp:string;
}

interface SyncMetadata{
    lastSyncToken:number;
    updatedAt:string;
}

interface PendingMessage{
    clientId:string;
    conversationId:string;
    retryCount:number;
    status:"pending";
}

interface Draft{
    conversationId:string;
    text:string;
    updatedAt:string;
}

ACK Event (Sender)

The sender receives

{
  "eventId": 10234,
  "type": "MESSAGE_CREATED",
  "conversationId": "chat123",
  "message": {
    "id": "msg789",
    "clientMessageId": "tmp-abc123",
    "senderId": "deepak",
    "text": "Hello John",
    "status": "sent",
    "createdAt": "2026-07-05T10:00:01Z"
  }
}

"When the user sends a message, the client generates a temporary clientMessageId and stores the message as pending in IndexedDB before sending it over the WebSocket. 
The server persists the message, generates the permanent messageId, and publishes a MESSAGE_CREATED event containing both IDs. The sender matches the clientMessageId, updates the local record from pending to sent, replaces the temporary ID with the server ID, and updates the React Query cache.
 The receiver simply inserts the new message using the server-generated messageId."
------------------------------------------------------
Conversation APIs
GET /conversations
GET /conversations?page=2
GET /conversations/:id

Message APIs

GET /messages?conversationId=123
GET /messages?before=messageId
POST /messages
DELETE /messages/:id
PATCH /messages/:id

User APIs
GET /users/:id
GET /users/search?q=deepak

Presence APIs
Usually WebSocket.

But REST

GET /presence

is acceptable.

WebSocket Events

Much more important.

MESSAGE_CREATED
MESSAGE_EDITED
MESSAGE_DELETED
USER_TYPING
USER_ONLINE
USER_OFFLINE
READ_RECEIPT
*/