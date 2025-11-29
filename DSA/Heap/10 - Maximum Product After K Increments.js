class MinHeap{
    constructor() {
        this.heap = [];
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while(currentIndex > 0){
            let parentIndex = Math.floor((currentIndex-1)/2)
            if(this.heap[parentIndex] > this.heap[currentIndex]) {
                [this.heap[parentIndex],this.heap[currentIndex]] = [this.heap[currentIndex] , this.heap[parentIndex]]
                currentIndex = parentIndex
            } else {
                break
            }
        }
    }

    heap_push(val){
        this.heap.push(val);
        this.heapifyUp()
    }

    heapifyDown(){
        let currentIndex = 0
        let leftIndex = 2 * currentIndex + 1
        let rightIndex = 2 * currentIndex + 2
        while (leftIndex < this.heap.length) {
            let temp = currentIndex
            if(this.heap[temp] > this.heap[leftIndex]) {
                temp = leftIndex
            }
            if(rightIndex < this.heap.length  && this.heap[temp] > this.heap[rightIndex]) {
                temp = rightIndex
            }
            if(temp == currentIndex ){
                return
            }
            [this.heap[temp],this.heap[currentIndex]] = [this.heap[currentIndex] ,this.heap[temp]]
            currentIndex = temp
            leftIndex = 2 * currentIndex + 1
            rightIndex = 2 * currentIndex + 2
        }
    }

    heap_pop(){
        if(this.heap.length == 1) {
            return this.heap.pop()
        }
        let result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return result;
    }

    printHeap(){
        return this.heap
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null
    }

     size() {
        return this.heap.length
    }
}

var maximumProduct = function(nums, k) {
    
    let heap = new MinHeap()
    let result = 1
    const mod = Math.pow(10,9) + 7
    //O(n log n)
    for(let i of nums) {
        heap.heap_push(i)
    }
    // Check for count & k > if arr.length < k  then we need to pop, increment and push to heap

    //k × (log n + log n) = O(k log n)
    while(k > 0) {
        let curr = heap.heap_pop() + 1
        heap.heap_push(curr)
        k--
    }
    // O(n log n)
    while(heap.size() > 0) {
        
        result = (result * heap.heap_pop()) %  mod
    }

    return result % mod

    /*
      TC -   O((n + k) log n) , SC - O(n)
    */
};

let nums = [0,4]
let k = 5
 nums = [6,3,3,2], k = 2
console.log(maximumProduct(nums,k))