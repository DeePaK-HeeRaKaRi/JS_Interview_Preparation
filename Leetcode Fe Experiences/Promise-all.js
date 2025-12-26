
const promisify = (fn,item) => {
   return new Promise((resolve,reject) => {
        fn(item,(error,value) => error ? reject(`Rejected at ${item}`) : resolve(value))
   }) 
}

const filterPromise=async(arr,fn)=>{
    const output=[]
    let tasks=0
    const results = await Promise.all(
        arr.map((item,i)=>{
            return promisify(fn,item)
            .then((res) => output[i] = res)
            // .catch(err => err) DONT KEEP CATCH HERE
        })
    )
    return results
}


/*
Rule to remember (very important)

async/await ❌ does not automatically mean parallel
await inside a loop → sequential
await Promise.all(...) → parallel

---------------------------------------------


All setTimeouts scheduled (parallel)
→ macrotasks resolve
→ microtasks (Promise.all)
→ await resumes once
→ final filtered result

------------------------------------------
DONT KEEP CATCH INSIDE THE PROMISE.ALL

Errors are caught and converted
Promise.all now never rejects
await always succeeds
Errors are silently swallowed ❌
This violates the requirement: “rejects it if any error occurs”
*/