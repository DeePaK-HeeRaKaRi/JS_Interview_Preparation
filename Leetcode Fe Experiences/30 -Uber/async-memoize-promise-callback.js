class LRUCache {
    constructor(maxSize = 3){
        this.map = new Map()
        this.maxSize = maxSize
    }

    get(key) {
        if(!this.map.has(key)) return null
        const value = this.map.get(key)
        this.map.delete(key)
        this.map.set(key,value) // Move to the most recent one
        return value
    }

    set(key,value) {
        if(this.map.has(key)) {
            this.map.delete(key)
        }
        else if(this.map.size >= this.maxSize){
            const least_reently_used_key = this.map.keys().next().value
            this.map.delete(least_reently_used_key)
        }
        this.map.set(key,value)
    }

    delete(key) {
        this.map.delete(key)
    }

    clear() {
        this.map.clear()
    }
}

function memoizeAsync(fn,options = {}) {
    const {
        maxSize = 3,
        ttl = Infinity,
        key = (...args) => JSON.stringify(args),
        abort = false,
        latestWins = false
    } = options

    const cache = new LRUCache(maxSize)
    const inFlight = new Map()
    return async function(...args) {

        const cacheKey = key(...args)

        const now = Date.now()
        
        const cached = cache.get(cacheKey)

        if(!latestWins && cached && now < cached.expiry) {
            return cached.value
        }

        /*
        We store the in-flight Promise itself. Subsequent calls return the same Promise. When it resolves, 
        the event loop schedules all attached .then() handlers as microtasks, ensuring consistent async behavior.”
        */
        if(!latestWins && inFlight.has(cacheKey)) {
            return inFlight.get(cacheKey).promise
        }

        if(latestWins && inFlight.has(cacheKey)) {
            inFlight.get(cacheKey).controller?.abort()
            inFlight.delete(cacheKey)
        }

        const controller = abort ? new AbortController() : null
        const promise = fn(...args,controller?.signal)
            .then(result => {
                inFlight.delete(cacheKey)
                cache.set(cacheKey, {
                    value: result,
                    expiry : now +ttl
                })
                return result
            })
            .catch((err) => {
                 inFlight.delete(cacheKey)
                 throw err
            })

        inFlight.set(cacheKey,{
            controller,
            promise
        })

        return promise
    }
}

function fakeSearch(query, signal) {
    return new Promise((resolve,reject) => {
         console.log(`Started ${query}`)

        const id = setTimeout(() => {
            console.log(`Completed: ${query}`)
            resolve(`Result for ${query}`)
        }, 2000)

        signal?.addEventListener("abort", () => {
            clearTimeout(id)
            console.log(`Aborted: ${query}`)
            reject(new Error("Aborted"))
        })
    })
   
}

/*
const search = memoizeAsync(fakeSearch)
search("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // cache miss
search("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // cache hit
*/
// first computation
// " started: react"
// " completed: react"
// "react" 

// from cache
// "react" 


/*
const search = memoizeAsync(fakeSearch, {ttl: 3000});

search("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // first computation
setTimeout(() => {
  search("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // cache hit
}, 1000);
// first computation
// " started: react"
// " completed: react"
// "react" 

// from cache
// "react" 


setTimeout(() => {
  search("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // cache miss, re-computation
}, 3500);
// re-computation
// " started: react"
// " completed: react"
// "react"
*/

/*
const search = memoizeAsync(fakeSearch, {maxSize: 2});

search("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // first entry
search("react hooks").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // second entry
// " started: react"
// " started: react hooks"
// " completed: react"
// "react"
// " completed: react hooks"
// "react hooks"

setTimeout(() => {
  search("react 19").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // third entry, evicts first
}, 2500);
// " started: react 19"
// " completed: react 19"
// "react 19"

setTimeout(() => {
  search("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // re-computation
}, 5500);
// " started: react"
// " completed: react"
// "react"
*/

const search = memoizeAsync(fakeSearch, {
  abort: true,
  latestWins: true
});

search("react").catch(() => {});
// " started: react"
// " aborted: react"

search("react").catch(() => {});
// " started: react"
// " aborted: react"

search("react").catch(() => {});
// " started: react"
// " completed: react"

/*
People often say:
“Microtasks have higher priority than macrotasks”

That statement is incomplete and therefore misleading.

Correct version:
Microtasks have higher priority after a macrotask finishes.

They cannot interrupt a running macrotask.

| Macrotask A |
| Microtasks |
| Macrotask B |
| Microtasks |

setTimeout callback runs (macrotask)

resolve() is called

.then() callbacks are queued as microtasks

Macrotask finishes

Microtasks run

👉 That’s why the macrotask always runs first.
*/