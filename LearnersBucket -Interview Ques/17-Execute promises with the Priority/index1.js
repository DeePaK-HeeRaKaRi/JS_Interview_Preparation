function resolvePromiseWithPriority(promises) {
    let reject_response = {}
    let resolved_response = {}
    let tasks_completed = 0
    let mostPriorityIndex = 0
    promises.sort((a,b) => a.priority - b.priority)

    return new Promise((resolve,reject) => {
        promises.forEach(({task,priority},index) => {
            task()
            .then((value) => {
                resolved_response[index] = value
            })
            .catch((err) => {
                reject_response[index] = true

                if(index == mostPriorityIndex) {
                    mostPriorityIndex++
                }
            })
            .finally(() => {
                if(!reject_response[mostPriorityIndex] &&
                     resolved_response[mostPriorityIndex]) {
                    resolve(`Priority ${promises[mostPriorityIndex].priority} has been resolved`)
                }
                /* To avoid race conditions */
                else if(reject_response[mostPriorityIndex]) mostPriorityIndex++
                tasks_completed++

                if(promises.length == tasks_completed) {
                    reject('All async tasks are failed')
                }
            })

        })
    })
}

/*
function createAsyncTask(val) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(val > 5) {
                reject('Promise has rejected')
            }
            else {
                resolve(`Resolved ${val}`)
            }
        },val*1000)
    })
}

const promises = [
    {task : () => createAsyncTask(6),priority: 1},
    {task : () => createAsyncTask(3),priority: 4},
    {task : () => createAsyncTask(8),priority: 3},
    {task : () => createAsyncTask(7),priority: 2},
]

*/

//The below example domanstrates why the mostPriorityIndex should be updated in the final block
function createAsyncTask(delayMs, willResolve, label) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (willResolve) resolve(`Resolved ${label} after ${delayMs}ms`);
        else reject(`Rejected ${label} after ${delayMs}ms`);
      }, delayMs);
    });
}

// priorities are used after sorting ascending.
// Timings chosen to create the race:
// - priority 2 rejects at 100ms (earlier)
// - priority 1 rejects at 200ms (later)
// - priority 3 resolves at 300ms
// - priority 4 resolves at 400ms
const promises = [
  { task: createAsyncTask(200, false, 'p1'), priority: 1 }, // will reject at 200ms
  { task: createAsyncTask(100, false, 'p2'), priority: 2 }, // will reject at 100ms (race)
  { task: createAsyncTask(300, true,  'p3'), priority: 3 }, // will resolve at 300ms
  { task: createAsyncTask(400, true,  'p4'), priority: 4 }, // will resolve at 400ms
];

// Use with your existing `resolvePromiseWithPriority(promises)` to reproduce the race-case.
resolvePromiseWithPriority(promises)
.then((result) => console.log(`Result - ${result}`))
.catch((err) => console.log(err))