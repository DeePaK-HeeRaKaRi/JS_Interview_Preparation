/*
If you're following the RADIO framework (Requirements → API → Data Model → Interface → Optimizations), 
Observability is usually discussed at the very end, after you've finished the core design.

When should you bring it up?

Usually in one of these situations:

The interviewer asks: "How would you make this production-ready?"
The interviewer asks: "Anything else you'd consider?"
You've completed the architecture and want to conclude with operational concerns.

You can say something like:

"Before wrapping up, I'd also think about production readiness.
 I'd add monitoring and observability to understand how the application behaves in production."
 -------------------------
API Performance

Is the backend responding quickly?

Monitor:

API latency (P50, P95, P99)
API success rate
API failure rate (4xx, 5xx)
Timeout rate
--------------------------------------------------------
2. Frontend Errors

Did the React app crash?

Monitor:

JavaScript exceptions
React Error Boundaries
Unhandled Promise rejections

------------------------------------
4. Drag & Drop Performance

Very important for Kanban.

Monitor:

Drag start time
Drop completion time
Frames Per Second (FPS)
Long tasks (>50 ms)

If dragging becomes janky on large boards, you'll want to know.

---------------------------------------
5. Rendering Performance

Monitor:

Initial page load
Largest Contentful Paint (LCP)
Interaction to Next Paint (INP)
Time to Interactive (TTI)
Number of React re-renders

--------------------------------------
WebSocket Health (if real-time collaboration is supported)

Monitor:

Connection success rate
Reconnection attempts
Disconnect frequency
Message delivery failures
Average message latency
---------------------
7. Network Requests

Monitor:

Number of API calls
Duplicate requests
Cache hit ratio (if using React Query)
Retry count

Example:

---------------------------------
8. Memory Usage

Large boards can consume significant memory.

Monitor:

Heap size
Memory leaks
Detached DOM nodes
Cached data size
------------------------

9. Bundle Performance

Monitor:

JavaScript bundle size
Lazy-loaded chunk sizes
Chunk download time

Example:

Main bundle

3 MB ❌

Should ideally be much smaller.

-------------------------------

10. User Experience Metrics

Monitor:

Page load time
Search response time
Drag-and-drop responsiveness
Time to open a card
Time to save edits

These reflect what users actually experience.
-------------------------------
11. Business Metrics (optional but valuable)

Track product usage such as:

Boards created per day
Cards created per user
Most active boards
Daily Active Users (DAU)
Weekly Active Users (WAU)
-------------------------------
These help product teams understand adoption.

Common tools (if asked)
Error monitoring: Sentry
Performance monitoring / RUM: Datadog, New Relic
Analytics: Google Analytics, Mixpanel
Logs and traces: Grafana Labs with Loki/Tempo, or the ELK stack.

*/