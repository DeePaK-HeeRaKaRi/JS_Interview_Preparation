
function asyncParallel(tasks, callbacks) {
  let results = [];
  let tasksCompleted = 0;
  tasks.forEach((asyncTask) => {
      asyncTask()
      .then((value) => {
        console.log("value", value);
        results.push(value);
        tasksCompleted++;
        // Invoking the callback function at the end of the loop won’t work as the async tasks may finish at different intervals.
        // SO invoke the final callback once all the tasks are completed
        if (tasksCompleted >= tasks.length) {
          callbacks(results);
        }
       
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });
}


function createAsyncTask(i) {
//   const value = Math.floor(Math.random() * 10);
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("value in setTimeout", i);
        resolve(i);
      }, i * 1000);
    });
  };
}

const taskList = [
  createAsyncTask(3),
  createAsyncTask(1),
  createAsyncTask(5),
  createAsyncTask(2),
  createAsyncTask(10),
];
asyncParallel(taskList, (result) => {
  console.log("results", result);
});

// in the given taskList it is exceuted based on the less value
// here 1st 1,2,3,5,10


/*
setTimeout registers a timer →
when the timer expires →
its callback is placed into the macrotask queue →
then the event loop decides when to run it

setTimeout(cb, 1000);

Synchronous phase
setTimeout is executed
Timer is registered in Timers (Web APIs / libuv)
JS continues execution

📌 No queue involved yet

Timers (NOT queues)
-------------------
Timer A → expires at t=1s
Timer B → expires at t=2s
Timer C → expires at t=3s
They are just scheduled, not queued.
-------------------
What the Event Loop ACTUALLY does

while (true) {
  if (callStack is empty) {
    if (microtaskQueue not empty) {
      run ALL microtasks
    }
    else if (macrotaskQueue not empty) {
      take ONE macrotask
      push to callStack
    }
  }
}
-------------------
If call stack is empty →
1. Run ALL microtasks (if any)
2. Take ONE macrotask
3. Execute it
4. After it finishes → run ALL microtasks again
-------------------

Timeline for setTimeout(1000)
After 1 second:
Timer expires

Callback moves to macrotask queue

Macrotask Queue:
----------------
[ setTimeout(resolve(1)) ]

Event Loop Tick:

Call stack empty ✔
Microtask queue empty ✔
Take macrotask ✔

resolve(1)

Promise resolution → Microtask

resolve(1)

Microtask Queue:
----------------
[ thenHandler ]

Event loop IMMEDIATELY runs microtasks

results.push(1)
tasksCompleted++


Timer expires
     ↓
Macrotask Queue
[ setTimeout callback ]
     ↓
Call Stack
[ resolve(1) ]
     ↓
Microtask Queue
[ then handler ]
     ↓
Call Stack
[ results.push(1), tasksCompleted++ ]


The event loop executes only one macrotask at a time and then drains all microtasks to guarantee that Promise callbacks run immediately
 after the current task finishes, without being interleaved by unrelated tasks.

 What if microtasks never end? (important edge case)
 function infiniteMicrotask() {
  Promise.resolve().then(infiniteMicrotask);
}
infiniteMicrotask();
setTimeout(() => console.log("never runs"), 0);

(setTimeout never runs)

----------------------------------------------

setTimeout(() => {
  console.log("start");
  Promise.resolve().then(() => console.log("step 1"));
  Promise.resolve().then(() => console.log("step 2"));
  console.log("end");
}, 0);

setTimeout(() => console.log("other task"), 0);

start
end
step 1
step 2
other task

so once the macrotask is executes and it draina all the microtasks
*/