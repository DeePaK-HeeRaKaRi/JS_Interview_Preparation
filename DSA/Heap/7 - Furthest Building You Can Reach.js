class MinHeap{
    constructor() {
        this.heap = [];
    }

    #heapifyUp() {
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

    push(val){
        this.heap.push(val);
        this.#heapifyUp()
    }

    #heapifyDown(){
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

    pop(){
        if(this.heap.length == 0) {
            return null
        }
        let result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.#heapifyDown();
        return result;
    }

    heapSize(){
        return this.heap.length
    }
}

var furthestBuilding = function(heights, bricks, ladders) {
   let heap_ladder = new MinHeap()
//    console.log(heap_ladder.heapifyDown())
   //Give the preference to the ladders first
   let bricksCount = 0
   for(let i=0; i<heights.length-1; i++) {
        if(heights[i+1] > heights[i]) {
            height_diff = heights[i+1] - heights[i]
            heap_ladder.push(height_diff)
            if(heap_ladder.heapSize() > ladders) {   //now use bricks
                bricksCount +=  heap_ladder.pop()
            }
            if(bricksCount > bricks) {  //Now you have used both ladders & bricks
                return i
            }
        }
   }
   return heights.length - 1
};
let heights = [4,12,2,7,3,18,20,3,6]
let bricks = 10
let ladders = 2
console.log(furthestBuilding(heights, bricks, ladders))