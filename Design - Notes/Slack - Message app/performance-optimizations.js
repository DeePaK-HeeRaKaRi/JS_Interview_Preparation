/*
🚀 Performance Optimizations (Chat App)

1. Service Worker + Cache Storage ⭐⭐⭐⭐⭐
Cache the App Shell (JS bundles, CSS, fonts, icons, logos, emoji sprites) to improve boot time and support offline loading.
Use Background Sync for retrying uploads or failed requests when the app is not active.

2. Virtualization ⭐⭐⭐⭐⭐
Virtualize the message list (react-window, react-virtualized) so only visible messages are rendered.
Essential for conversations with thousands of messages.

3. Pagination / Infinite Scroll ⭐⭐⭐⭐⭐
Load recent messages initially.
Fetch older messages only when the user scrolls up.
Cursor-based pagination is preferred over offset pagination.

4. Prefetching ⭐⭐⭐⭐☆
Prefetch conversation metadata, avatars, or recently opened chats when the user hovers or is likely to open them.
Improves perceived performance.

Which should you use?
Preload

Use for

Fonts
Logo
Critical CSS
Main Bundle
Needs immediately.

Prefetch downloads when browser is idle
Use for

Next Conversation
Settings
Emoji Picker
GIF Picker
Recently Opened Chat

May need soon.

5. Efficient Image Loading ⭐⭐⭐⭐☆
Use srcset, responsive images, and lazy loading (loading="lazy").
Serve SVGs for icons whenever possible.

6. HTTP Caching ⭐⭐⭐⭐⭐
Use ETag, Cache-Control, and versioned asset URLs.
Prevent unnecessary downloads while keeping assets fresh.

7. Optimistic UI ⭐⭐⭐⭐⭐
Show the message immediately with pending status before server acknowledgement.
Update to sent after ACK or failed if delivery fails.

8. Debouncing / Throttling ⭐⭐⭐⭐☆
Debounce:
Search users
Search conversations
Typing indicator events
Throttle:
Scroll events
Resize events

⚠️ I would not debounce sending chat messages. Users expect each press of Enter to send immediately. Batching typed chat messages is uncommon for normal chat apps.

9. Remember Scroll Position ⭐⭐⭐⭐☆
Preserve scroll position when switching conversations.
Restore it when the user returns.

10. Responsive Design ⭐⭐⭐⭐☆
Mobile, tablet, desktop layouts.
Adaptive sidebar and message pane.

11. Accessibility (A11y) ⭐⭐⭐⭐⭐
Keyboard shortcuts (Enter, Shift+Enter, Esc)
Proper ARIA labels
Focus management
Screen reader support

12. Progressive Web App (PWA) ⭐⭐⭐⭐☆
Installable app
Offline App Shell
Push notifications
Background Sync

⭐ Things I'd ADD (Important)
13. Code Splitting / Lazy Loading ⭐⭐⭐⭐⭐
Lazy load heavy features (emoji picker, GIF picker, file preview, settings page).
Reduces initial bundle size.

14. Memoization ⭐⭐⭐⭐⭐
Use React.memo, useMemo, and useCallback to avoid unnecessary re-renders.
Especially useful for message rows and conversation list items.

15. Request Cancellation ⭐⭐⭐⭐☆
Cancel in-flight API requests when switching conversations quickly.
Prevents stale responses from updating the UI.

16. WebSocket Reconnection ⭐⭐⭐⭐⭐
Automatic reconnect with exponential backoff.
Resume subscriptions after reconnect.

17. Error Boundaries ⭐⭐⭐⭐☆
Prevent the entire chat application from crashing due to a component error.
Show a graceful fallback UI.

18. Bundle Optimization ⭐⭐⭐⭐☆
Tree shaking
Minification
Compression (Brotli/Gzip)
Dynamic imports

⭐ Chat-specific Optimizations (Senior Interview Gold)
19. Dedupe & Ordering ⭐⭐⭐⭐⭐
Deduplicate duplicate WebSocket/API events.
Maintain message order using timestamps or server sequence numbers.

20. Offline Queue ⭐⭐⭐⭐⭐
Persist unsent messages in IndexedDB.
Retry automatically when connectivity returns.

21. Multi-tab Synchronization ⭐⭐⭐⭐☆
Use BroadcastChannel so multiple tabs stay in sync without polling.
What I would actually say in an interview

You don't need to list all 21 items. I usually mention these 10 because they cover almost everything:

✅ Service Worker + App Shell caching
✅ Virtualized message list
✅ Cursor-based pagination / Infinite scroll
✅ React Query + IndexedDB caching strategy
✅ Optimistic UI updates
✅ Lazy loading & code splitting
✅ WebSocket reconnect with exponential backoff
✅ Offline queue + retry
✅ Accessibility & keyboard shortcuts
✅ Responsive + PWA support

*/