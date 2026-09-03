/**
 * @param {number[][]} isConnected
 * @return {number}
 */
class Queue1 {
    constructor() {
        this.elements = {}
        this.head = 0
        this.tail = 0
    }

    enqueue(val) {
        this.elements[this.tail] = val
        this.tail++
    }

    dequeue() {
        if(this.size() == 0) return null
        const first_element = this.elements[this.head]
        delete this.elements[this.head]
        this.head++
        return first_element
    }

    size() {
        return this.tail - this.head
    }
}
function bfs(i,vis,adjList) {
    vis[i] = 1
    let queue = new Queue1()
    queue.enqueue(i)
    let curr = null
    while(queue.size() > 0) {
        curr = queue.dequeue() // get the fisrt element
        for(let i of adjList.get(curr)) {
            if(vis[i] == 0) {
                vis[i] = 1
                queue.enqueue(i)
            }
        }
    }
}
var findCircleNum = function(isConnected) {
    // Create the adj list 
    let v = isConnected.length
    let adjList = new Map()
    for(let i=0;i<v; i++) {
        adjList.set(i,[])
    }

    // covert the adj matrix to adjlist
    for(let i=0;i<v;i++) {
        for(let j=0;j<v;j++) {
            if(i!=j && isConnected[i][j] == 1) { // bidirectional
                adjList.get(i).push(j)
                adjList.get(j).push(i)
            }
        }
    }

    // Visited array
    let vis = new Array(v).fill(0)

    let res = 0
    for(let i=0; i<v ;i++) {
        if(vis[i] == 0) {
            res++
            bfs(i,vis,adjList)
        }
    }

    return res
};

//TC o(v+e) sc v**2