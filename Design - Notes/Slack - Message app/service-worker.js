/*
Primary Responsibilities
1. Cache static assets (App Shell)
2. Cache HTTP responses
3. Background Sync
4. Push Notifications
5. Offline fallback

1️⃣ App Shell Caching (Most Important)theyneverchange
Cache
✓ index.html
✓ main.js
✓ vendor.js
✓ runtime.js
✓ styles.css
✓ Fonts
✓ SVG Icons
✓ Logo
✓ Emoji Sprites

Flow

First Visit

Browser
     │
     ▼
Service Worker
     │
     ▼
Network
     │
     ▼
Cache Storage

--------------------------------

Second Visit

Browser
     │
     ▼
Service Worker
     │
     ▼
Cache Storage
     │
     ▼
Instant Load

Interview Line

"I cache the App Shell so repeat visits load instantly without downloading the JavaScript bundle again."

2️⃣ Avatar / Profile Picture Caching ⭐⭐⭐

Instead of downloading

John.png

Alex.png

Mike.png

every refresh

Use

Cache First Strategy

Flow

<img src="/avatar/john.png">

↓

Service Worker

↓

Cache ?

│

├── Hit
│      ↓
│   Return
│
└── Miss
       ↓
    Network
       ↓
 Cache Storage
       ↓
    Return

Interview Line

"Profile images rarely change, so Cache First is a good strategy."

3️⃣ Background Sync ⭐⭐⭐⭐⭐

Very important for Chat Apps.

Example

Offline

↓

User sends message

↓

IndexedDB (Outbox)

↓

Message Sync Manager

↓

Internet Back

↓

Retry Send

For file uploads

Offline

↓

Upload Image

↓

Service Worker Background Sync

↓

Retry Upload

↓

Success

Interview Line

"Background Sync retries failed uploads or network operations once connectivity returns."

4️⃣ Push Notifications ⭐⭐⭐⭐⭐

Server

New Message

↓

Push API

↓

Service Worker

↓

Show Notification

↓

Click Notification

↓

Open Chat
5️⃣ Offline Fallback ⭐⭐⭐⭐

Suppose internet goes down.

Still show

App Shell

+

Messages from IndexedDB

instead of blank page.

Cache Strategies (Must Know)
Cache First

Good for

✓ Avatars
✓ Icons
✓ Fonts
✓ Logos
✓ Emoji Sprites

Flow

Cache

↓

Hit ?

↓

Return

↓

Miss

↓

Network

↓

Update Cache
Network First

Good for

✓ Conversation List
✓ User Profile
✓ Settings

Flow

Network

↓

Success

↓

Update Cache

↓

Return

↓

Fail

↓

Cache
Stale While Revalidate ⭐⭐⭐⭐⭐

My favorite.

Flow

Cache

↓

Return Immediately

↓

Background Network Request

↓

Update Cache

Good for

✓ Avatars
✓ Channel Icons
✓ Frequently Opened Attachments
Storage Decision (Interview Gold)
Data	Storage
Messages	IndexedDB
Drafts	IndexedDB
Pending Queue	IndexedDB
Sync Token	IndexedDB
Conversation Metadata	IndexedDB
React Query Cache	Memory
JS Bundle	Cache Storage
CSS	Cache Storage
Fonts	Cache Storage
Profile Images	Cache Storage
SVG Icons	Cache Storage
Emojis	Cache Storage
How it fits into YOUR Chat Architecture
Browser

        │

────────┼──────────────

        │

Service Worker

        │

────────┼──────────────

        │

Cache Storage
(App Shell)

        │

────────┼──────────────

        │

React App

        │

────────┼──────────────

        │

IndexedDB
(Messages, Drafts, Outbox)

        │

────────┼──────────────

        │

React Query
(UI Memory Cache)
⭐ 30-Second Interview Answer (Memorize)

"In a chat application, I use Service Workers primarily for App Shell caching, avatar and icon caching, push notifications, and background sync for failed uploads or network operations. I don't store messages in the Service Worker cache; those belong in IndexedDB.
 React Query remains an in-memory cache for active server state, while Cache Storage is optimized for static assets and HTTP responses."



--------------------------------------
How does cache validation happen for profile pictures?

Never assume cached images are always valid.

Use HTTP Cache Headers.

Option 1 (Best) — Cache-Control + ETag ⭐⭐⭐⭐⭐

Server response:

Cache-Control: max-age=86400
ETag: "avatar-v15"

Next request:

If-None-Match: "avatar-v15"

Server replies:

304 Not Modified

or

200 OK
(new image)

Browser/Service Worker automatically updates the cache

"Where does Service Worker come into the picture?"

I would answer:

"When the application is active, the Message Sync Manager handles retries by listening for network reconnection or WebSocket reconnection events. The Service Worker is complementary—it enables 
Background Sync and retries network operations even when the web application is in the background or the tab has been closed. Both operate on the same IndexedDB outbox.

Part 1: Service Worker + App Shell Caching
First Visit

User visits:

https://chat.company.com

Browser downloads

index.html
main.8f4d.js
vendor.23fd.js
styles.2ab.css
logo.svg
emoji-sprite.svg

Service Worker intercepts and caches them.

Browser
      │
      ▼
Service Worker
      │
      ▼
Network
      │
      ▼
Cache Storage
Register Service Worker
// index.tsx

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
sw.js
const CACHE_NAME = "chat-app-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/main.js",
  "/styles.css",
  "/logo.svg",
  "/emoji-sprite.svg"
];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => {

      return cache.addAll(APP_SHELL);

    })

  );

});

First visit

Network

↓

Cache Storage
Second Visit

Browser requests

main.js

Instead of

Browser

↓

Network

it becomes

Browser

↓

Service Worker

↓

Cache Storage

↓

main.js

Instant.

But...

You asked the MOST important interview question.

How do we know main.js changed?

Excellent.

Cache Versioning ⭐⭐⭐⭐⭐

Suppose deployment happens.

Old

main.js

New

main.98acfe.js

Webpack/Vite automatically generates

main.98acfe.js

instead of

main.js

The URL changes.

So

Cache

main.123.js

is never requested again.

Browser downloads

main.98acfe.js

Automatically.

Another strategy

Suppose

CACHE_NAME = "chat-app-v1"

New deployment

CACHE_NAME = "chat-app-v2"

Activate event

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys

          .filter(key => key !== CACHE_NAME)

          .map(key => caches.delete(key))

      )

    )

  );

});

Old cache removed.

Interview Answer

"For application bundles I rely on hashed filenames generated by the bundler. During deployments the filename changes, so the Service Worker automatically downloads the new version and removes the previous cache."

This is exactly how production React apps work


-------------------
How does the Service Worker know assets changed?
Build tools generate hashed filenames (main.a1b2.js → main.x8y9.js).
index.html references the new hashed files after deployment.
The browser downloads the updated index.html and requests the new asset URLs.
The Service Worker caches the new assets.
During the activate phase, old cache versions are deleted (often using a new CACHE_NAME or automatically via Workbox).

Key point: The Service Worker does not compare file contents. It sees new URLs, and that's what triggers downloading and caching the updated assets. 
This cache-busting strategy is why hashed filenames are used in almost all modern production builds.

When does Activate happen?

When

All tabs

using

SW v1

are closed.

Browser says

Great

Nobody is using v1 anymore.

Let's activate v2.

Then

Activate

↓

Delete old cache

↓

Take control

Now

SW v2

is active.
---------------------------------------
Install
↓

Download & Cache

--------------------

Activate
↓

Cleanup Old Cache

--------------------

Fetch
↓

Intercept Requests

--------------------

Sync
↓

Retry Offline Work

--------------------

Push
↓

Show Notifications
*/