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

var topKFrequent = function(nums, k) {
    let freq_map = new Map()
    let min_heap = new MinHeap()
    for(let i of nums) {
        if(freq_map.has(i)) {
            const get_count = freq_map.get(i)
            freq_map.set(i,get_count + 1)
        }
        else {
            freq_map.set(i,1)
        }
    }

    for(let [key, value] of freq_map) {
        if(min_heap.size() < k) {
            min_heap.heappush([value, key])
        }
        else if(value > min_heap.top()[0]){
            min_heap.heappop()
             min_heap.heappush([value, key])
        } 
    }

    let result = []
    for(let i of min_heap.printHeap()) {
        result.push(i[1])
    }

    return result
};

let nums = [1,2,1,2,1,2,3,1,3,2]
let k = 2
nums= [1], k=1
console.log(topKFrequent(nums,k))