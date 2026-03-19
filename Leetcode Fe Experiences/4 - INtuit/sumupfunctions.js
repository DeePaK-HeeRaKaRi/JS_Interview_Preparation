const wait = (num) => {
  return new Promise(resolve => setTimeout(resolve, num * 1000, num));
}

const A = async () => {
  return wait(2);
}

const B = async () => {
  return wait(3);
}

/** 
 * These will be run in sequence, because we call
 * a function and immediately wait for each result.
 */
const series = async () => {
  // This will be executed first
  const result1 = await A();

  // This will be executed after
  const result2 = await B();

  return result1 + result2;
}

const parallel = async() => {
    const results = await Promise.all([A(), B()])
    return results[0] + results[1]
}


const evaluate = async (fn, label) => {
  const startTime = performance.now();
  console.log(`Executing ${label} task starts...`);
  let result = await fn();
  const endTime = performance.now();
  console.log(`Task ${label} finished in ${ Number.parseInt(endTime - startTime) } milliseconds with sum:`, result);
}

 
evaluate(series, 'sequential');
evaluate(parallel, 'parallel');

 /*
"Task sequential starting..."

"Task parallel starting..."

"Task parallel finished in 3029 milliseconds with," 5

"Task sequential finished in 5011 milliseconds with," 5

*/

/*
A -> waits 2s
B -> waits 3s
🔸 Case 1: series (Sequential)
const result1 = await A(); // waits 2s
const result2 = await B(); // waits 3s AFTER A finishes
Timeline ⏱️
0s ---- A starts
2s ---- A ends, B starts
5s ---- B ends

👉 Total time = 2 + 3 = 5 seconds

Because:

You wait for A to finish

Then start B

🔸 Case 2: parallel
const results = await Promise.all([A(), B()]);
What happens internally:

A() is called → starts timer (2s)

B() is called → starts timer (3s)

Both run at the same time

Timeline ⏱️
0s ---- A starts
0s ---- B starts
2s ---- A ends
3s ---- B ends

👉 Total time = max(2, 3) = 3 seconds

Because:

Both are already running

Promise.all just waits for the slowest one

🔥 Core Difference (Interview Answer)
❗ Sequential

"Each async task starts only after the previous one completes."

Total time = sum of all durations

❗ Parallel

"All async tasks are started immediately, and we wait for all to complete."

Total time = maximum duration

🧠 Important Insight (Your confusion)

You said:

"both are having the same time right?"

👉 No — they don't start at the same time

Function	Sequential	Parallel
A start	0s	0s
B start	2s	0s

👉 That’s the entire difference.

⚡ Behind the Scenes (Event Loop)

setTimeout registers a timer in Web APIs

When time completes → callback goes to callback queue

await pauses execution until promise resolves

👉 In series:

JS waits before even scheduling B

👉 In parallel:

Both timers are scheduled immediately

💡 One-liner to remember

Sequential = start → wait → start → wait
Parallel = start all → wait once

If interviewer pushes further, you can say:

"The key difference is not in execution time of functions, but in when they are scheduled. Sequential delays scheduling of next task, while parallel schedules all tasks upfront."


*/

/*
x async functions are invoked immediately, and their promise resolutions go to the microtask queue when completed

*/