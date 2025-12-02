
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
var KthLargest = function(k, nums) {
    this.heap = new MinHeap()
    this.k = k
    for(let i of nums) {
        this.heap.heap_push(i)
        if(this.heap.size() > k) {
            this.heap.heap_pop()
        }
    }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
     this.heap.heap_push(val)
     if(this.heap.size() > k) {
        this.heap.heap_pop()
    }
    return this.heap.peek()
};

/*
Maintain min heap of size k, so that on top we get the kth largets element
3 ,[4,5,8,2]
After adding to the heap > [2,4,5,8] > remove 2 > [4,5,8] and return the peek > 4

add(3) => [3,4,5,8] >  remove 3 > [4,5,8] and return the peek > 4
add(5) => [4,5,5,8] >  remove 5 > [5,5,8] and return the peek > 5
add(10) => [5,5,8,10] >  remove 5 > [5,8,10] and return the peek > 5
add(9) => [5,8,9,10] >  remove 5 > [8,9,10] and return the peek > 8
add(4) => [4,8,9,10] >  remove 4 > [8,9,10] and return the peek > 8
*/