
class Node {
    constructor(key,value,timestamp) {
        this.key = key;
        this.value = value;
        this.timestamp = timestamp;
        this.next = null;
        this.prev = null;
    }
}

class LRU {
    constructor(cacheMaxSize,expirytime) {
        this.cacheMaxSize = cacheMaxSize;
        this.expirytime = expirytime;
        this.cache = new Map()
        // this.interval = setInterval()
        this.head = new Node(null,null,null)
        this.tail = new Node(null,null,null)
        this.head.next = this.tail
        this.tail.prev = this.head
        this.interval = setInterval(() => this.cleanUp(), this.expiryTime) //Auto cache burst
    }

    memoize(fn){
        return async(args) => {
            const key = JSON.stringify(args)

            if(this.cache.has(key)) {
                const node = this.cache.get(key);
                const now = Date.now()
                if(now - node.timestamp < this.expirytime) {
                    this.cache.delete(key)
                    this.removeNode(node)
                    const newNode = new Node(key,node.value,node.timestamp)
                    this.addNode(newNode)
                    this.cache.set(key,newNode)
                    return node.value
                }
                else {
                      // Expired entry
                      this.cache.delete(key);
                      this.removeNode(node)
                }
            }

            if(this.cache.size >= this.cacheMaxSize) {
                const tailNode = this.removeTailPrevNode()
                this.cache.delete(tailNode.key)
            }
            // Insert right after the head.
            const result = await fn(args)
            const newNode = new Node(key,result,Date.now())
            this.cache.set(key,newNode)
            this.addNode(newNode)
            return result
        }
    }

    addNode(Node) {
        let head_next = this.head.next
        this.head.next = Node
        Node.prev = this.head
        Node.next = head_next
        head_next.prev = Node
    }

    // Remove The Least recently used
    removeTailPrevNode() {
        const node = this.tail.prev
        this.removeNode(node)
        return node
    }

    removeNode(node) {
        node.prev.next = node.next
        node.next.prev = node.prev
    }

    //Clean up expired entries
    cleanUp() {
        const now = Date.now()
        for(let [key,node] of this.cache.entries()) {
            if(now - node.timestamp >= this.expirytime) {
                this.cache.delete(key)
                this.removeNode(node)
            }
        }
    }

    clear() {
        this.cache.clear()
        clearInterval(this.interval)
        this.head.next = this.tail
        this.tail.prev = this.head
    }
}

const maxSize = 3
const expiryTime = 5000 // 1 second
const lrucache = new LRU(maxSize,expiryTime)
const memoizedFetch = lrucache.memoize(async (url) => {
    // console.log({url})
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
