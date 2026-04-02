

function priorityResolve(promises) {
    return new Promise((resolve, reject) => {
        let states = []
        for(let i=0; i< promises.length; i++) {
            states.push({state:'pending', value:undefined, reason:undefined})
        }
        console.log(states)

        let settled = false
        let rejectCount = 0
        function checkPromisesThatAreFulfilled(){
            if(settled) return

            if(rejectCount == states.length) {
                settled= true
                reject(new AggregateError(
                    states.map(s => s.reason), 'All promises rejected'
                ))
            }
            for(let i of states) {
                const {state,value,reason} = i
                if(state == 'pending') return

                if(state == 'rejected') continue

                settled = true
                resolve(value)
                return;
            }

   
        }


        promises.forEach((p,index) => {
            p.then((value) => {
                states[index] = {state:'fulfilled', value: value}
                checkPromisesThatAreFulfilled()
            })
            .catch((err) => {
                states[index] = {state: 'rejected', reason: err}
                rejectCount++
                checkPromisesThatAreFulfilled()
            })
        })
    })
}
 
const p0 = new Promise((res, rej) => setTimeout(() => res('A'), 400));
const p1 = new Promise((res, rej) => setTimeout(() => res('B'), 100));
const p2 = new Promise((res, rej) => setTimeout(() => res('C'), 200));

priorityResolve([p0, p1, p2])
  .then(console.log).catch(err => {console.log(err)});
 
// Output:
// "A"

/*
const p0 = new Promise((res, rej) => setTimeout(() => rej('A'), 400));
const p1 = new Promise((res, rej) => setTimeout(() => rej('B'), 100));
const p2 = new Promise((res, rej) => setTimeout(() => rej('C'), 200));

priorityResolve([p0, p1, p2])
  .then(console.log).catch(err => {console.log(err)});
*/

// Output:
// "B"

/*
Example 2 (with rejection)
p0 rejects at 400ms
p1 resolves at 100ms
p2 resolves at 200ms
At 100ms

States:

0 pending
1 fulfilled
2 pending

Check:

i = 0 → pending → STOP
At 200ms

States:

0 pending
1 fulfilled
2 fulfilled

Check:

i = 0 → pending → STOP
At 400ms (p0 rejected)

States:

0 rejected
1 fulfilled
2 fulfilled

Now check:

i = 0 → rejected → continue
i = 1 → fulfilled → RESOLVE 'B'

Output:

"B"


*/


async function priorityResolveSequential(promises) {
  for (const p of promises) {
    try {
      return await p;
    } catch {}
  }
  
  throw new Error('All promises rejected');
}

/*
const p0 = new Promise((res, rej) => setTimeout(() => res('A'), 400));
const p1 = new Promise((res, rej) => setTimeout(() => res('B'), 100));
const p2 = new Promise((res, rej) => setTimeout(() => res('C'), 200));

priorityResolveSequential([p0, p1, p2])
  .then(console.log).catch(err => {console.log(err)});
*/

/*
Output:
"A"

*/