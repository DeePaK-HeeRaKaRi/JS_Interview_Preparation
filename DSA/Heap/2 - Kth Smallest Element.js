class MaxHeap{
    constructor() {
        this.heap = [];
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while(currentIndex > 0){
            let parentIndex = Math.floor((currentIndex-1)/2)
            if(this.heap[parentIndex] < this.heap[currentIndex]) {
                [this.heap[parentIndex],this.heap[currentIndex]] = [this.heap[currentIndex] , this.heap[parentIndex]]
                currentIndex = parentIndex
            } else {
                break
            }
        }
    }

    push(val){
        this.heap.push(val);
        this.heapifyUp()
    }

    heapifyDown(){
        let currentIndex = 0
        let leftIndex = 2 * currentIndex + 1
        let rightIndex = 2 * currentIndex + 2
        while (leftIndex < this.heap.length) {
            let temp = currentIndex
            if(this.heap[temp] < this.heap[leftIndex]) {
                temp = leftIndex
            }
            if(rightIndex < this.heap.length  && this.heap[temp] < this.heap[rightIndex]) {
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

    pop(){
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

    peak() {
        return this.heap.length > 0 ? this.heap[0] : null
    }
}
var findKthSmallest = function(nums, k) {
    let n = nums.length
    let maxHeap = new MaxHeap()
    for(let i=0;i<k; i++) {
        maxHeap.push(nums[i])
    }

    for(let i=k; i< n; i++) {
        if(nums[i] < maxHeap.peak()) {
            maxHeap.pop()
            maxHeap.push(nums[i])
        }
    }

    return maxHeap.peak()
};

// TC - O(klogk)+O((n−k)logk)=O(nlogk) , sc (k)

let nums = [7, 10, 4, 3, 20, 15]
let k = 3
console.log(findKthSmallest(nums, k) )