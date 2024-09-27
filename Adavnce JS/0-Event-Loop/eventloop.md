JavaScript's runtime environment, typically provided by a browser or Node.js, includes an internal mechanism called a "timer" to handle delays such as those created by setTimeout. Here's how JavaScript knows if the delay is completed:

Set the Timer: When you call setTimeout(callback, delay), JavaScript's runtime sets a timer for the specified delay.

Timer Countdown: The runtime has a system clock that keeps track of the current time. It starts counting down the delay time.

Event Loop and Timer Check:

JavaScript's event loop constantly runs, checking for tasks that need to be processed.
The runtime keeps an eye on the system clock and the timers that have been set.
Timer Expiration:

When the system clock indicates that the delay has elapsed (i.e., the specified delay time has passed), the runtime considers the timer expired.
It then places the callback function into the event queue.
Event Loop Execution:

The event loop checks if the call stack is empty. If it is, it dequeues the next task from the event queue.
The callback function from the expired timer is then pushed onto the call stack and executed.
In essence, JavaScript's runtime uses a combination of a system clock and an event loop to monitor and manage the execution of delayed functions.

<!-- WHY IT WILL TAKE TASKS FROM FROM EVENT QUEUE AFTER CALLSTACK IS EMPTY ?  -->

The reason the event loop checks if the call stack is empty before taking the next task from the event queue is rooted in how JavaScript handles asynchronous operations and ensures a smooth, non-blocking execution model. Here's a detailed explanation:

JavaScript Execution Model
Single-Threaded Nature:

JavaScript is single-threaded, meaning it can execute one piece of code at a time.
The "call stack" is a data structure that keeps track of function calls. When a function is invoked, it is pushed onto the call stack, and when it returns, it is popped off the call stack.
Event Loop and Event Queue:

The "event loop" is a mechanism that coordinates the execution of code, collecting and processing events and executing queued tasks.
The "event queue" (or "task queue") is a list of tasks (callbacks) that need to be processed after asynchronous operations complete (e.g., setTimeout, network requests, etc.).
Why Wait for an Empty Call Stack?
Avoiding Interruptions:

If the event loop were to take tasks from the event queue while the call stack is not empty, it could interrupt currently executing code, leading to unexpected behavior and potential issues with state consistency.
Ensuring Order of Execution:

By waiting until the call stack is empty, JavaScript ensures that synchronous code (which is currently executing) completes before asynchronous callbacks are processed. This maintains a predictable order of execution.
Non-Blocking Behavior:

This model allows JavaScript to handle I/O operations (e.g., reading a file, making an HTTP request) without blocking the execution of other code. While waiting for an I/O operation to complete, JavaScript can continue executing other code. Once the I/O operation is complete, the callback is queued and will be executed when the call stack is empt