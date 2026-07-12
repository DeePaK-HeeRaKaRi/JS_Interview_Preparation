/*
1. Authentication & Authorization ⭐⭐⭐⭐⭐ (Start with this)

"First, I'd ensure that only authenticated users can access the board, and every API call carries an access token."

Example:

Authorization: Bearer <JWT>

Frontend responsibilities:

Store tokens securely (prefer HttpOnly cookies if architecture allows)
Refresh expired tokens
Redirect to login on 401
Protect routes

Also mention:

"The frontend should hide actions the user isn't allowed to perform, but the backend remains the source of truth for authorization."

Example:

Viewer
❌ Delete Card

Editor
✅ Delete Card
2. XSS (Most Important for Kanban) ⭐⭐⭐⭐⭐

This is the biggest risk.

Why?

Users can enter

card titles
descriptions
comments

Someone could type:

<script>alert("Hacked")</script>

or

<img src=x onerror=fetch('/token')>

I'd say:

"Since this is collaborative software, all user-generated content should be treated as untrusted."

Frontend:

Never use dangerouslySetInnerHTML
Escape HTML
Sanitize rich text (if supported)
3. Attachments & External Links ⭐⭐⭐⭐

Exactly what you mentioned.

Suppose someone adds

https://evil-site.com

or uploads

virus.exe

Frontend should:

Validate file type
Validate file size
Preview only supported files
Open external links safely

Example:

target="_blank"
rel="noopener noreferrer"

This prevents reverse tabnabbing.

4. CSP (Content Security Policy) ⭐⭐⭐⭐

Mention this briefly.

Example:

Only allow scripts from

self

cdn.company.com

Not

random.com

This helps reduce XSS impact.

5. CSRF ⭐⭐⭐⭐

If authentication uses cookies, then mention CSRF.

Example:

PATCH /cards

Browser automatically sends cookies.

A malicious website could trigger requests.

Mitigation:

CSRF token
SameSite cookies

If using JWT in the Authorization header, CSRF is much less of a concern.

6. CORS ⭐⭐⭐

Say one sentence.

"I'd configure CORS so that only trusted frontend origins can call our backend APIs."

Example:

Allowed Origin

kanban.company.com

Not

evil.com
7. Input Validation ⭐⭐⭐⭐

Frontend validation improves UX.

Backend validation enforces security.

Example:

Card title

5000 characters

Reject.

Attachment

2 GB

Reject.

8. Secure File Uploads ⭐⭐⭐⭐

Since Kanban has attachments.

Mention:

Allowed MIME types
Max size
Virus scanning (backend)
Signed upload URLs (S3/GCS)
9. Sensitive Data ⭐⭐⭐

Don't log

JWT
Cookies
Access Tokens
PII

Example:

console.log(userToken)

❌

10. HTTPS ⭐⭐⭐

Always.

Protects

Tokens
Cookies
API traffic
WebSocket (wss://)
Interview Answer (60 seconds)

I'd answer like this:

"For security, I'd first ensure proper authentication and authorization using JWT or secure cookies, 
while relying on the backend for permission enforcement. Since users can create cards and comments, 
I'd sanitize all user-generated content and avoid rendering raw HTML to prevent XSS. For attachments and external links,
 I'd validate file types and sizes, use signed upload URLs, and open external links with noopener noreferrer. 
 If cookies are used, I'd protect against CSRF using SameSite cookies and CSRF tokens. 
 I'd also enforce HTTPS, configure CORS to allow only trusted origins, apply a Content Security Policy to restrict executable resources, 
and perform both client-side and server-side input validation.


*/
