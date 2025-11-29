// class MaxHeap{
//     constructor() {
//         this.heap = [];
//     }

//     heapifyUp() {
//         let currentIndex = this.heap.length - 1;
//         while(currentIndex > 0){
//             let parentIndex = Math.floor((currentIndex-1)/2)
//             if(this.heap[parentIndex] < this.heap[currentIndex]) {
//                 [this.heap[parentIndex],this.heap[currentIndex]] = [this.heap[currentIndex] , this.heap[parentIndex]]
//                 currentIndex = parentIndex
//             } else {
//                 break
//             }
//         }
//     }

//     push(val){
//         this.heap.push(val);
//         this.heapifyUp()
//     }

//     heapifyDown(){
//         let currentIndex = 0
//         let leftIndex = 2 * currentIndex + 1
//         let rightIndex = 2 * currentIndex + 2
//         while (leftIndex < this.heap.length) {
//             let temp = currentIndex
//             if(this.heap[temp] < this.heap[leftIndex]) {
//                 temp = leftIndex
//             }
//             if(rightIndex < this.heap.length  && this.heap[temp] < this.heap[rightIndex]) {
//                 temp = rightIndex
//             }
//             if(temp == currentIndex ){
//                 return
//             }
//             [this.heap[temp],this.heap[currentIndex]] = [this.heap[currentIndex] ,this.heap[temp]]
//             currentIndex = temp
//             leftIndex = 2 * currentIndex + 1
//             rightIndex = 2 * currentIndex + 2
//         }
//     }

//     pop(){
//         if(this.heap.length == 1) {
//             return this.heap.pop()
//         }
//         let result = this.heap[0];
//         this.heap[0] = this.heap.pop();
//         this.heapifyDown();
//         return result;
//     }

//     printHeap(){
//         return this.heap
//     }

//     peek() {
//         return this.heap.length > 0 ? this.heap[0] : null
//     }

//     size() {
//         return this.heap.length
//     }
// }


class MinHeap{
    constructor() {
        this.heap = [];
    }

        // comparator: negative if a < b, positive if a > b
    compare(a, b) {
        if (a[0] != b[0]) return a[0] - b[0]; // compare counts
        return a[1] - b[1]; // tie-break by index
    }

    heapifyUp_array() {
        let currentIndex = this.heap.length - 1;
        while(currentIndex > 0){
            let parentIndex = Math.floor((currentIndex-1)/2)
            if(this.compare(this.heap[parentIndex],this.heap[currentIndex]) > 0) {
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
            if(this.compare(this.heap[temp], this.heap[leftIndex]) > 0) {
                temp = leftIndex
            }
            if(rightIndex < this.heap.length && this.compare(this.heap[temp],this.heap[rightIndex]) > 0) {
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

function getCount(arr) {
    let left = 0
    let right = arr.length - 1
    while( left <= right) {
        let mid = Math.floor((left + right) / 2)
        if(arr[mid] == 0) {
            right = mid - 1
        }
        else{
            left = mid + 1
        }
    }
    return left
}
var kWeakestRows = function(mat, k) {
    let heap = new MinHeap()
    for(let i=0; i < mat.length; i++) {
        const count = getCount(mat[i])
        heap.heappush([count,i])
    }

    let result = []
    for(let i=0; i<k ;i++) {
        result.push(heap.heappop()[1])
    }
    return result
};

let mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]]
let k = 3
// mat = 
// [[1,0,0,0],
//  [1,1,1,1],
//  [1,0,0,0],
//  [1,0,0,0]]
// k = 2
console.log(kWeakestRows(mat,k))