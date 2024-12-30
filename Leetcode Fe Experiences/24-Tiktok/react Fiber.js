/*


Key Differences Between Reconciliation and React Fiber:
=====================================================
1. Definition
Reconciliation:

Reconciliation is the process React uses to determine which parts of the UI need to be updated when the application’s state or props change.
It compares the virtual DOM trees (diffing) and updates the actual DOM minimally and efficiently.
React Fiber:

React Fiber is a reimplementation of React's reconciliation algorithm. It’s a foundational architecture introduced in React 16 to improve how updates are handled, 
enabling features like time-slicing and priority-based rendering.
=====================================================
2. Purpose
Reconciliation:

Focuses on efficiently determining the changes required in the DOM.
Goal: Minimize the cost of rendering by reusing unchanged components and applying minimal updates.
React Fiber:

Optimizes how reconciliation is performed by splitting rendering work into incremental units and prioritizing tasks.
Goal: Improve UI responsiveness by breaking work into chunks and allowing interruptions.

=====================================================

3. Work Model
Reconciliation:

Used a synchronous, blocking model before React Fiber.
React would reconcile the entire virtual DOM tree in one go, potentially causing frame drops for large updates.
React Fiber:

Uses an asynchronous, incremental model.
Work is split into "fibers" (units of work), allowing React to pause, resume, and prioritize updates as needed.

=====================================================

4. Features
Reconciliation:

Core functionality for comparing and updating the DOM.
Does not consider task prioritization or breaking updates into chunks.
React Fiber:

Introduces advanced features like:
Time-slicing: Breaking updates into smaller tasks.
Concurrent Mode: Handling multiple tasks simultaneously.
Suspense: Gracefully handling async operations.

=====================================================

5. Analogy
Reconciliation:

It’s like figuring out the difference between two documents (virtual DOM trees) and updating only the changed parts (real DOM).
React Fiber:

It’s like adding a task scheduler that breaks the work of updating documents into manageable pieces and prioritizes urgent tasks first.



*/