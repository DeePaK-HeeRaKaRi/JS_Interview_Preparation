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
    size() {
        return this.heap.length
    }
    printHeap(){
        return this.heap
    }
}
 
function taskScheduler(tasks,n) {
    if(n==0) return tasks.length
    let tasksCount = {}
    tasks.forEach((val,i)=>{
        if(!tasksCount[val]){
            tasksCount[val] = 1
        }
        else{
            tasksCount[val] += 1
        }
    })
    console.log(Object.values(tasksCount))
    let maxHeap = new MaxHeap()
    Object.values(tasksCount).forEach((val,i) => {
        maxHeap.push(val)
    })
    let queue = []
    let time = 0
    while(maxHeap.size() > 0 || queue.length > 0){
        time+=1
        if(maxHeap.size() > 0) {
            let currTaskCount = maxHeap.pop()
            let availableAt = time+n
            if(currTaskCount - 1 > 0){
                queue.push([currTaskCount-1,availableAt])
            }
        }
        
        if(queue.length > 0 && queue[0][1]==time) {
            const cur = queue.shift()
            maxHeap.push(cur[0])
        }
         
    }
    return time
}
const tasks = ["A","A","A","B","B","B"]
const n = 3
console.log(taskScheduler(tasks,n))