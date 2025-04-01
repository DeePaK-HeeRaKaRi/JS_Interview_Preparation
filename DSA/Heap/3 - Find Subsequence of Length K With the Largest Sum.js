class MinHeap{
    constructor() {
        this.heap = [];
    }

    heapifyUp_array() {
        let currentIndex = this.heap.length - 1;
        while(currentIndex > 0){
            let parentIndex = Math.floor((currentIndex-1)/2)
            if(this.heap[parentIndex][0] > this.heap[currentIndex][0]) {
                [this.heap[parentIndex],this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]]
                currentIndex = parentIndex
            } else {
                break
            }
        }
    }

    heappush(val){
        this.heap.push(val);
        this.heapifyUp_array()
    }

    heapifyDown_array(){
        let currentIndex = 0
        let leftIndex = 2 * currentIndex + 1
        let rightIndex = 2 * currentIndex + 2
        while (leftIndex < this.heap.length) {
            let temp = currentIndex
            if(this.heap[temp][0] > this.heap[leftIndex][0]) {
                temp = leftIndex
            }
            if(rightIndex < this.heap.length && this.heap[temp][0] > this.heap[rightIndex][0]) {
                temp = rightIndex
            }
            if(temp === currentIndex) {
                break
            }
            [this.heap[temp],this.heap[currentIndex]] = [this.heap[currentIndex],this.heap[temp]]
            currentIndex = temp
            leftIndex = 2*currentIndex+1
            rightIndex = 2*currentIndex+2
        }
    }
    
    heappop(){
        if(this.heap.length == 0) {
            return null
        }
        if (this.heap.length === 1) return this.heap.pop();
        let result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown_array();
        return result;
    }

    printHeap(){
        return this.heap
    }

    size(){
        return this.heap.length
    }

    top(){
        return this.heap[0]
    }
}

let min_heap = new MinHeap()
let nums = [2,1,3,3]
let k = 2
nums = [3,4,3,3], k = 2
for(let i=0;i<k;i++) {
    min_heap.heappush([nums[i],i])
}
console.log(min_heap.printHeap())
for(let i=k;i<nums.length;i++) {
    min_heap.heappush([nums[i],i])
    if(min_heap.size() > k) {
        min_heap.heappop()
    }
}

let heap_arr = min_heap.printHeap()
console.log({heap_arr})
let result = []
for(let i=0;i<k;i++) {
    let curr = heap_arr[i]
    console.log({curr})
    result[curr[1]]  = curr[0]
}
console.log(result.filter(item => item != undefined))