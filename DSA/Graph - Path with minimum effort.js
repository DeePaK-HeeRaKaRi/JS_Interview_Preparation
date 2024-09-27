/**
 * @param {number[][]} heights
 * @return {number}
 */
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

    push(val){
        this.heap.push(val);
        if(Array.isArray(val)) {
            this.heapifyUp_array()
        }else {
            this.heapifyUp()
        }
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
                break
            }
            [this.heap[temp],this.heap[currentIndex]] = [this.heap[currentIndex] ,this.heap[temp]]
            currentIndex = temp
            leftIndex = 2 * currentIndex + 1
            rightIndex = 2 * currentIndex + 2
        }
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
    
    pop(){
        if(this.heap.length == 0) {
            return null
        }
        if (this.heap.length === 1) return this.heap.pop();
        let result = this.heap[0];
        this.heap[0] = this.heap.pop();
        if(Array.isArray(result)) {
            this.heapifyDown_array();
        }else {
            this.heapifyDown();
        }
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
var minimumEffortPath = function(heights) {
    let row_size = heights.length
    let col_size = heights[0].length
    let distance = []
    for(let i=0;i<row_size;i++) {
        let temp=[]
        for(let j=0;j<col_size;j++) {
            temp.push(Infinity)
        }
        distance.push(temp)
    }
    distance[0][0] = 0
    let x_dir = [-1,0,1,0]
    let y_dir = [0,-1,0,1]
    let heap = new MinHeap()
    heap.push([0,0,0])
    while(heap.size() > 0) {
        let [curr_dis,m,n] = heap.pop()
        for(let i=0;i<4;i++) {
            let x = m+x_dir[i]
            let y= n+y_dir[i]
            if(x>=0 && y>=0 && x<row_size && y<col_size) {
                let maxAbsDiff = Math.max(Math.abs(heights[m][n]-heights[x][y]),curr_dis)
                if(maxAbsDiff < distance[x][y]) {
                    distance[x][y] = maxAbsDiff
                    heap.push([maxAbsDiff,x,y])
                }
            }
        }
    }
    return distance[row_size-1][col_size-1]
};
let heights = [[1,2,2],[3,8,2],[5,3,5]]
console.log(minimumEffortPath(heights))