/*
AbortController is a browser API used to: Cancel asynchronous operations
Most commonly:

fetch() requests
streams
async tasks

Just Imagine 

User opens page
↓
API request starts
↓
User quickly leaves page
↓
API still completes later

This can cause:

memory leaks
unwanted state updates
race conditions
unnecessary network usage

So we cancel the request.

Core Idea

AbortController has:

1. controller
2. signal

AbortController
       ↓
creates signal
       ↓
fetch listens to signal
       ↓
controller.abort()
       ↓
fetch immediately stops

const controller = new AbortController();

fetch(url, {
  signal: controller.signal,
});

controller.abort();

*/