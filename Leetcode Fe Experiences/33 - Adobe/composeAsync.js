
function composeAsync(...functions) {
    return async (...args) => {
        let result = args;

        for (let i = functions.length - 1; i >= 0; i--) {
            result = await functions[i](
                ...(Array.isArray(result) ? result : [result])
            );
        }

        return result;
    };
}
function a(x,y) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(x * y),100))
}

function b(z) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(z + 5), 100))
}

function c(r) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(r / 10), 100))
}


composeAsync(c, b, a)(5,3)
.then((result) => console.log(result))
.catch((err) => console.log(err))

/*
High-Level Flow
composeAsync(c, b, a)(5,3)

→ a(5,3)
→ b(15)
→ c(20)
→ 2

But internally, it’s much more interesting 👇

🔥 Step-by-Step Diagram (Engine View)
✅ Step 0: Initial Call
composeAsync(c, b, a)(5, 3)
Call Stack:
[ async function execution starts ]
Memory:
result ───▶ [5, 3]   (array reference)
🔁 Step 1: Calling a(5,3)
result = await a(5,3)
Call Stack:
composeAsync
  → a(5,3)
Inside a:
return new Promise(resolve => setTimeout(() => resolve(15), 100))
⏸️ await kicks in

👉 VERY IMPORTANT PART

What await does:
1. Pause composeAsync
2. Remove it from call stack
3. Register continuation in microtask queue
Call Stack:
[ empty ]
Microtask Queue:
[ resume composeAsync after Promise resolves ]
⏱️ After 100ms → Promise resolves
Event Loop:

Takes resolved value 15

Pushes continuation to microtask queue

▶️ Resume execution
Call Stack:
composeAsync resumes
Now:
result = 15
Memory:
result ───▶ 15   (primitive)

👉 Old [5,3] → garbage collected

🔁 Step 2: Calling b(15)
result = await b(15)
Same flow repeats:
Call Stack:
composeAsync
  → b(15)
Then:
await → pause → microtask queue
▶️ Resume again
result = 20
Memory:
result ───▶ 20
🔁 Step 3: Calling c(20)

Same pattern:

result = await c(20)

Final:

result ───▶ 2
🧠 Final Internal Flow (Condensed)
[5,3]
  ↓
a → Promise → await pause → resume → 15
  ↓
b → Promise → await pause → resume → 20
  ↓
c → Promise → await pause → resume → 2
🔥 What’s REALLY happening (core concepts)
1. No chaining magic

👉 Just this repeatedly:

result = await func(result)
2. Call stack is cleared during await

👉 Prevents blocking

3. Microtask queue resumes execution

👉 After Promise resolves

4. Memory behavior
Iteration 1: result → [5,3] (reference)
Iteration 2: result → 15    (value)
Iteration 3: result → 20
Iteration 4: result → 2

👉 Always reassigned, never shared

🎯 Interview Gold Answer (Diagram version)

“Each async function call returns a Promise. When we use await, the function pauses and its continuation is moved to the microtask queue. 
Once the Promise resolves, execution resumes, and we reassign the resolved value to result. This process repeats for each function, forming a sequential async pipeline.”

🚀 If interviewer pushes further

You can add:

👉 “Because await uses the microtask queue, it runs before macrotasks like setTimeout, ensuring predictable sequencing.”

*/

//===================================================================
/*
Great question — this is exactly where most people get confused between call stack, microtask queue, and memory.

Let’s answer it clearly 👇

🔥 Short Answer (interview-ready)

👉 result does NOT belong to any “phase” like microtask or macrotask.
👉 It lives in the execution context (memory) of the async function.

🧠 Correct Mental Model

You have 3 different things:

1. Call Stack → executes code
2. Microtask Queue → schedules continuation (await, .then)
3. Memory (Execution Context) → stores variables (result)

👉 result belongs to #3 (memory)

🔍 Where exactly does result live?

Inside your async function:

return async (...input) => {
    let result = input;
}

👉 result is stored in:

Execution Context (Lexical Environment)
   ├── result → current value
   ├── functions
   └── other variables
🔁 What happens during await
Before await:
Call Stack:
  composeAsync()

Memory:
  result → [5,3]
⏸️ When await happens:
result = await a(5,3)

👉 Engine does:

1. Pause function
2. Save execution context (INCLUDING result)
3. Move continuation to microtask queue
Important 🔥

👉 result stays in memory
👉 It does NOT go to microtask queue

▶️ After Promise resolves

Microtask queue runs:

Call Stack:
  resume composeAsync()

Now:

result = 15

👉 Same memory slot updated

🧠 Visual Model
Execution Context (Memory)
--------------------------------
result → [5,3]

(await happens)

Execution Context is "paused but preserved"

Microtask Queue:
[ resume function ]

(resume)

Execution Context:
result → 15
🔥 KEY INSIGHT

👉 Microtask queue stores “what to run next”
👉 Memory stores “data like result”

❌ Common Mistake

“result is stored in microtask queue”

❌ WRONG

Microtask queue only stores:

→ continuation callbacks
→ promise reactions
✅ Correct Statement

👉 “The variable result lives in the async function’s execution context. 
When await pauses execution, the context (including result) is preserved, and only the continuation is queued in the microtask queue.”

🎯 One-line takeaway

👉 “result stays in memory; only execution control moves through microtask queue.”

🚀 Bonus (very strong answer)

If interviewer pushes:

“Does async function lose its variables during await?”


You say:

👉 “No, the execution context is preserved. When resumed via the microtask queue, it continues with the same variables.”

If you want, next I can show:

🔥 exact V8-level breakdown (PromiseJobs, closure retention, GC behavior) — that’s top 1% understanding.
*/