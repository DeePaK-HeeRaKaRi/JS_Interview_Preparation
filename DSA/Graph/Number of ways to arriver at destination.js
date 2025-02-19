class MinHeap{
    constructor(){
        this.heap=[]
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1
        //  Find parent Index
        while(currentIndex > 0){
            let parentIndex = Math.floor((currentIndex-1)/2)
            if(this.heap[parentIndex][0] > this.heap[currentIndex][0]){
                // Compare with parent index with current index , if PI > CI swap
                [this.heap[parentIndex],this.heap[currentIndex]] =  [this.heap[currentIndex],this.heap[parentIndex]]
                currentIndex = parentIndex
            }
            else{
                break
            }
        }
    }

    heapifyDown() {
        let currIndex = 0
        let leftIndex = 2 * currIndex + 1
        let rightIndex = 2 * currIndex + 2
        while(leftIndex < this.heap.length) {
            let temp = currIndex
            if(this.heap[temp][0] > this.heap[leftIndex][0]){
                temp = leftIndex
            }
            if(rightIndex < this.heap.length && this.heap[temp][0] > this.heap[rightIndex][0]) {
                temp = rightIndex
            }

            // both sides are greater
            if(temp == currIndex) {
                break
            }
            [this.heap[temp],this.heap[currIndex]] = [this.heap[currIndex],this.heap[temp]]
            currIndex = temp
            leftIndex = 2 * currIndex + 1
            rightIndex = 2 * currIndex + 2
        }
    }

    heap_push(val) {
        this.heap.push(val);
        this.heapifyUp()
    }

    heap_pop(){
        
        if(this.heap.length == 1) return this.heap.pop()
        let result = this.heap[0] //Min value in heap
        this.heap[0] = this.heap.pop()
        this.heapifyDown()
        return result

    }

    heap_length(){
        return this.heap.length
    }
}

function number_of_ways(roads,n) { 

    let dis = new Array(n).fill(Infinity)
    let ways = new Array(n).fill(0)
    let heap = new MinHeap()
    let adjList = new Map()
    for(let [u,v,time] of roads) {
        // if(adjList.has(u)) {
        //     let cur = adjList.get(u)
        //     adjList.set(u,[...cur,[v,time]])
        // }
        // else {
        //     adjList.set(u,[[v,time]])
        // }
        if (!adjList.has(u)) adjList.set(u, []);
        if (!adjList.has(v)) adjList.set(v, []);
        adjList.get(u).push([v, time]);
        adjList.get(v).push([u, time]);
    }
    
    let src = 0
    let time = 0
    heap.heap_push([src,time])

    dis[0] = 0
    ways[0] = 1
    let mod = Math.pow(10,9) + 7
    while(heap.heap_length() > 0) {
        let [curr_time,curr_node] = heap.heap_pop()
        if(adjList.has(curr_node)) {
            let adj_nodes = adjList.get(curr_node)
            console.log(adj_nodes)
            for(let [node,time] of adj_nodes) {
                let total_time = curr_time + time
                if(total_time < dis[node]) {
                    dis[node] = total_time
                    ways[node] = ways[curr_node]
                    heap.heap_push([total_time,node])
                }
                else if(total_time == dis[node]) {
                    ways[node] += ways[curr_node] % mod
                }
            }
        }
        
    }
    // console.log({ways})
    return ways[ways.length-1] % mod
}

let roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
let n= 7
console.log(number_of_ways(roads,n))