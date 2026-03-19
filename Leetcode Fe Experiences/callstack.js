

/*
Call Stack:
  A() runs → registers setTimeout(2s)
  B() runs → registers setTimeout(3s)
👉 Both timers go to Web APIs

Web APIs:
  Timer A (2s)
  Timer B (3s)

👉 Nothing in microtask queue yet ❗

What happens?

Timer callback goes to Macrotask queue
Event loop picks it → executes callback
Inside callback → resolve() is called
NOW a microtask is created

Timer → macrotask → executes → THEN creates microtask



After every macrotask → drain ALL microtasks before moving on

Macrotask:
  Timer A callback

→ executes resolve()

Microtask Queue:
  Promise resolution of A

→ immediately executed

STEPS
1. Call Stack:
   A(), B() executed

2. Web APIs:
   Timers registered

3. After 2s:
   Macrotask Queue:
     Timer A callback

4. Event Loop:
   → moves Timer A to Call Stack

5. Inside callback:
   → resolve() → adds Microtask

6. Microtask Queue:
   → resolve A

7. Event Loop:
   → executes microtask immediately

8. Repeat for B
-------------------------------------------------

Because:

👉 Promise resolution does NOT happen in timer directly
👉 It happens when the timer callback executes

And:

Timer callback = macrotask
Promise resolution = microtask (created inside it)
*/