//https://dev.to/dhilipkmr/software-engineer-2-ui-interview-at-microsoft-1i0b

// The Map maintains insertion order, and accessing a key does not automatically update its position.
// By deleting and reinserting a key, you can move it to the end of the iteration order, effectively implementing LRU behavior.

function LRU_Test() {
    const cache = new Map()
    
    cache.set('A',1)
    cache.set('B',2)
    cache.set('C',3)

    // console.log(cache)
    // console.log(Array.from(cache.entries()))
    console.log(Array.from(cache.keys()))  // ['A', 'B', 'C']

    const value = cache.get('B')

    console.log(Array.from(cache.keys()))  // ['A', 'B', 'C']

    // To move B to the end . we delete it and re insert it
    cache.delete('B')

    console.log(Array.from(cache.keys()))  // ['A', 'C']

    // Reinsert it 
    cache.set('B', 2)

    console.log(Array.from(cache.keys()))  // ['A', 'C', 'B']

    // Insert a new key 'D' , by evicting the least recently used ['A']

    console.log(cache.size)
    if(cache.size >= 3 ){
        console.log('Hello')
        const oldestKey = cache.keys().next().value // Get the First Key 'A'
        console.log({oldestKey})
        cache.delete(oldestKey)

        // After Deleteing the 'A'

        console.log('After Deleteing the A',Array.from(cache.keys()))  // ['C', 'B']
    }

    cache.set('D',4)
    console.log(Array.from(cache.keys()))  // [ 'C', 'B','D"]

    if(cache.size >= 3 ){
        console.log('Hello')
        const oldestKey = cache.keys().next().value // Get the First Key 'C'
        console.log({oldestKey})
        cache.delete(oldestKey)

        // After Deleteing the 'C'

        console.log('After Deleteing the A',Array.from(cache.keys()))  // [ 'B','D']
    }
}

// LRU_Test()

/*
Performance Comparison
Operation	Doubly Linked List + Hash Map	JavaScript Map
Get	            O(1)                                O(1)
Set/Insert	    O(1)                                O(1)
Delete	        O(1)                                O(1)
Evict (LRU)	    O(1)                                O(1)
In JavaScript, I’m using the Map object to implement the LRU Cache. Map maintains insertion order, allowing me to move the most recently accessed element to the end of the iteration order easily. 

This avoids the complexity of managing a doubly linked list while still achieving 

O(1) for lookups, inserts, and deletions. If I were implementing this in a language like C++ or Java, I would use a combination of a hash map and a doubly linked list to achieve the same functionality.
*/

/*
The most recently accessed key is now considered the "most recently used" and moved to the end of the cache.

The key at the start of the cache is the "least recently used" and is the first candidate for eviction when the cache size exceeds the limit.
*/

class LRU_Map {
    constructor(cacheMaxSize,expiryTime) {
        this.cacheMaxSize = cacheMaxSize
        this.expiryTime = expiryTime
        this.cache = new Map()
        this.interval = setInterval(() => this.cleanUp(), this.expiryTime) //Auto cache burst
    }

    memoize(fn) {
        return async (args) => {
            console.log('-------',args)
            console.log({ args });

            const key = JSON.stringify(args);
            if (this.cache.has(key)) {
                const { value, timeStamp } = this.cache.get(key);
                if (Date.now() - timeStamp < this.expiryTime) {
                    //The most recently accessed key is now considered the "most recently used" and moved to the end of the cache.
                    this.cache.delete(key)
                    this.cache.set(key, {value,timeStamp})  // Ex - Auth tokens that refresh the expiry when accessed
                    // this.cache.set(key, {value, timeStamp : Date.now()}) // Suitable for caches with strict expiry rule.
                    console.log(`Fetching from cache: ${args}`);
                    return value
                } else {
                    // Expired entry
                    this.cache.delete(key);
                }
            }
            console.log(`Fetching from url: ${args}`);
            // Compute the value and store it in the cache
            const result = await fn(args);
            console.log({ result });
            this.set(key, result);
            return result;
        };
    }

    set(key,value) {
        if(this.cache.size >= this.cacheMaxSize) {
            //The key at the start of the cache is the "least recently used" and is the first candidate for eviction when the cache size exceeds the limit.
            const oldestKey = this.cache.keys().next().value
            this.cache.delete(oldestKey)
        }
        this.cache.set(key, {value, timeStamp : Date.now()})
    }

    // Auto cleanup the expired entires
    cleanUp() {
        const now = Date.now()
        for(let [key , key_value] of this.cache.entries()) {
            // console.log({key,key_value})
            if(now - key_value.timeStamp >= this.expiryTime) {
                this.cache.delete(key)
            }
        }
    }

    clear() {
        this.cache.clear()
        clearInterval(this.interval)
    }
}

const maxSize = 3
const expiryTime = 5000 // 1 second
const lrucache = new LRU_Map(maxSize,expiryTime)
const memoizedFetch = lrucache.memoize(async (url) => {
    console.log({url})
    const response = await fetch(url);
    return response.json();
});
(async () => {
    await memoizedFetch('https://jsonplaceholder.typicode.com/todos/1');
    console.log('---1',lrucache.cache)
    await memoizedFetch('https://jsonplaceholder.typicode.com/todos/1'); // Cached
    console.log('---1',lrucache.cache)
    await memoizedFetch('https://jsonplaceholder.typicode.com/todos/2');
    console.log('---2',lrucache.cache)
    await memoizedFetch('https://jsonplaceholder.typicode.com/todos/3');
    console.log('---3',lrucache.cache)
    await memoizedFetch('https://jsonplaceholder.typicode.com/todos/4'); // Evicts the oldest
    console.log('---4',lrucache.cache)
  
    setTimeout(async () => {
      await memoizedFetch('https://jsonplaceholder.typicode.com/todos/2'); // Expired
      console.log('---5',lrucache.cache)
    }, 6000); // After 6 seconds, the cache expires
  })();
