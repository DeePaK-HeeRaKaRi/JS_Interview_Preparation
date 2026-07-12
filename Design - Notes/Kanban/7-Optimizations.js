/*
https://bits2bytes.hashnode.dev/building-a-realtime-offline-ready-kanban-board-frontend-system-design

7. Client-side performance
Virtualize long lists: Use libraries like react-window or react-virtualized to efficiently render thousands of cards without DOM performance issues.

Debounce expensive operations: For actions like autosave or heavy computations, debounce or throttle updates to reduce unnecessary work.

Incremental updates: Apply server-sent patches or deltas instead of re-fetching the full board, minimizing network load and UI re-renders.

Lazy loading media: For cards with attachments or images, load content lazily as users scroll into view.

Efficient data structures: Maintain normalized state (e.g., separate cards, columns, and board entities) to minimize deep object copies and state updates.

*/