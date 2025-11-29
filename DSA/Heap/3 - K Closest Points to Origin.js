class MaxHeap{
    constructor() {
        this.heap = [];
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while(currentIndex > 0){
            let parentIndex = Math.floor((currentIndex-1)/2)
            if(this.heap[parentIndex][0] < this.heap[currentIndex][0]) {
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
            if(this.heap[temp][0] < this.heap[leftIndex][0]) {
                temp = leftIndex
            }
            if(rightIndex < this.heap.length  && this.heap[temp][0] < this.heap[rightIndex][0]) {
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

    size() {
        return this.heap.length
    }
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null
    }
}

function getEuclideanDistance(x,y) {
     
    return x*x + y*y
}
var kClosest = function(points, k) {
    let heap = new MaxHeap()
    
    for(let i=0; i<points.length;i++) {
        let distance = getEuclideanDistance(points[i][0], points[i][1])
        if (heap.size() < k) {
            heap.push([distance, i]);
        } else if (heap.peek()[0] > distance) { // Remove the large distance
            heap.pop();
            heap.push([distance, i]);
        }
    }
   
    let result = [] 
 
   for(let i=0;i<k;i++) {
        let [dist, index] = heap.pop()
        result.push(points[index])
    }
    
 
    return result
};

/*
Building initial k elements: O(k log k)
Scanning remaining n−k elements: each element causes at most one push and at most one pop (each O(log k)) → O((n−k) log k)
Popping k elements to form the result: O(k log k)
Sum = O(k log k) + O((n−k) log k) + O(k log k) = O(n log k)

*/

let points = [[3,3],[5,-1],[-2,4]]
let k = 2
points = [[1,3],[-2,2]], k = 1
// points = [[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[1,1]] , k= 1
console.log(kClosest(points,k))