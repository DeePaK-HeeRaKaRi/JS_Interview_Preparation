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


function dijkstra(V,Adj,S)
{
    //code here
    let dist = new Array(V).fill(Infinity)
    dist[S] = 0
    let minheap = new MinHeap()
    let currDist = 0
    minheap.heap_push([currDist,S])

    while(minheap.heap_length() > 0) {
        let [currdist,currnode] = minheap.heap_pop()

        for(let i of Adj[currnode]) {
            const [edge,wt] = i
            const newDist = currdist + wt
            if(dist[edge] > newDist) {
                dist[edge] = newDist
                minheap.heap_push([newDist,edge])
            }
        }
    }
    return dist
}

let V= 3
let E =3
let Adj = [
        [[1,1],[2,6]],
        [[2,3],[0,1]],
        [[1,3],[0,6]]
    ]

let S = 2

console.log(dijkstra(V,Adj,S))