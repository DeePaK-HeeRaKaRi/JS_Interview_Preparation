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

var isNStraightHand = function(hand, groupSize) {
    let n = hand.length
    if( n % groupSize ) return false
    let heap = new MinHeap() 
    let hash_map = new Map()
    for(let i of hand) {
        if(hash_map.has(i)) {
            hash_map.set(i, hash_map.get(i) + 1)
        }
        else {
            heap.heap_push(i)
            hash_map.set(i, 1)
        }
    }
    // For each group first get the min value from heap
    // Iterate untill group size with the peek element
    // if not found in hash map return false
    // Decrement in hashmap, if it becomes 0 and if current element & peek !=0 return false

    while(heap.size()) {
        let min_element = heap.peek()
        for(let i=min_element; i<min_element + groupSize; i++) {
            if(!hash_map.has(i)) {
                return false
            } 
            hash_map.set(i, hash_map.get(i) - 1)
            if(hash_map.get(i) == 0) {
                if(i != heap.peek()) {  /*[1,1,3,6,2,3,4,7,8] gs = 3  // The group will not form next time*/
                    return false
                }
                heap.heap_pop()
                hash_map.delete(i)
            }
        }
    }
    return true
  
   
};

let hand = [1,2,3,6,2,3,4,7,8]
let groupSize = 3

hand = [1,1,3,6,2,3,4,7,8]
groupSize = 3
console.log(isNStraightHand(hand,groupSize))