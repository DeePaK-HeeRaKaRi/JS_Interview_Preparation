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
function memoizeCallback(fn, options = {}) {
    const {
        ttl = Infinity,
        maxSize = 100,
        key = (...args) => JSON.stringify(args),
        abort = false,
        latestWins = false
    } = options

   const cache = new LRUCache()

   const inFlight = new Map()

   return function(...args) {
    const callback = args.pop() //console.log

    const cacheKey = key(...args)

    const now = Date.now()

    const cached = cache.get(cacheKey)

    /* Serve from the cache if not expired */
    /* So in the fakesearch the time is 2 secs,now call the searchmemeo after 2 secs , 
    It should fetch form the cache not run again
    */
    if(!latestWins && cached && now < cached.expiry) {
        console.log(cached)
        return queueMicrotask(() => callback(null, cached.value))
    }

    if(!latestWins && inFlight.has(cacheKey)) {
        inFlight.get(cacheKey).callbacks.push(callback)
        return;
    }

    if(latestWins && inFlight.has(cacheKey)) {
        inFlight.get(cacheKey).controller?.abort()
        inFlight.delete(cacheKey)
    }
    // start the new task
    const controller = abort ?  new AbortController() : null

    // mark the task as ongoing

    inFlight.set(cacheKey, {
        controller,
        callbacks:[callback]
    })

    //Invoke the callback
    fn(args[0], controller?.signal, (err, result)=>{
        const flight = inFlight.get(cacheKey);
        if(!flight) return; // already aborted & replaced

        inFlight.delete(cacheKey)

        // cache the result
        if(!err) {
            cache.set(cacheKey, {
                value: result,
                expiry: now+ttl
            })
        }

        // Invoke all the callbacks with result
        flight.callbacks.forEach(cb => cb(err,result))
    })
   }
}

function fakeSearch(query, signal, cb) {
     
    console.log(`Started ${query}`)

    const id = setTimeout(() => {
        console.log(`Completed: ${query}`)
        cb(null, `Result for ${query}`)
    }, 2000)

    signal?.addEventListener("abort", () => {
        clearTimeout(id)
        console.log(`Aborted: ${query}`)
        cb(new Error("Aborted"))
    })
}

/*=========== TEST CASES ===========*/

/*
const searchMemo = memoizeCallback(fakeSearch)
searchMemo("react", console.log) 
searchMemo("react", console.log)
searchMemo("react", console.log)
setTimeout(() => searchMemo('react',console.log),3000)
*/

/*
const searchTTL = memoizeCallback(fakeSearch, {ttl:3000})
searchTTL('react',console.log)
setTimeout(() => searchTTL('react',console.log),1000) // cached
setTimeout(() => searchTTL('react',console.log),4000) // re-run
*/

/*
const searchLRU = memoizeCallback(fakeSearch,{maxSize:2,ttl:3000})
searchLRU('a',console.log)
searchLRU('b',console.log)
setTimeout(() => searchLRU('c',console.log),2500) // evicts a
setTimeout(() => searchLRU('a',console.log),5500) // cache miss rerun
*/

const searchLatestWin = memoizeCallback(fakeSearch,{abort:true,latestWins:true})
searchLatestWin('react',(err) => {console.log(err)})
setTimeout(() => searchLatestWin('react',(err) => {console.log(err)}),500)
setTimeout(() => searchLatestWin('react',(err) => {console.log(err)}),1000)