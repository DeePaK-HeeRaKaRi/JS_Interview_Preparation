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

    heap_pop(){
        if(this.heap.length == 1) {
            return this.heap.pop()
        }
        let result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return result;
    }

    print_heap(){
        return this.heap
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null
    }

    size() {
        return this.heap.length
    }
}


var largestInteger = function(num) {
    let str = String(num)
    let even_heap = new MaxHeap()
    let odd_heap = new MaxHeap()
    for(let i of str) {
        let n = Number(i)
        if(n % 2 == 0) {
            even_heap.heap_push(n)
        }
        else {
            odd_heap.heap_push(n)
        }
    }
    // Only two swaps & the it should be both odd or both even
    let result = 0
    for(let i of str) {
       let n = Number(i)
       let d = (n % 2 == 0) ? even_heap.heap_pop() : odd_heap.heap_pop()
       result = result * 10 + d
    }
    return result

};


let num = 65875
// num = 1234
console.log(largestInteger(num))