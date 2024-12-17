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
    
    heappop(){
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

var mostBooked = function(n,meetings) {
    let available_rooms = new MinHeap();
    let endTime_rooms_heap = new MinHeap();
    let room_count = new Array(n).fill(0); // Initialize room count array

    for (let i = 0; i < n; i++) {
        available_rooms.push(i);
    }

    meetings.sort((a, b) => a[0] - b[0]);

    for (let [start, end] of meetings) {
        let room;
        while (endTime_rooms_heap.size() > 0 && endTime_rooms_heap.top()[0] <= start) {
            const curr_ = endTime_rooms_heap.heappop();
            room = curr_[1];
            available_rooms.push(room);
        }

        if (available_rooms.size() > 0) {
            room = available_rooms.heappop();
            endTime_rooms_heap.push([end, room]);
        } else {
            const curr = endTime_rooms_heap.heappop();
            const endTime = curr[0];
            room = curr[1];
            endTime_rooms_heap.push([endTime + (end - start), room]);
        }
        room_count[room] += 1;
    }
    console.log(room_count)
    let maxRoom_index = 0;
    let prev = -Infinity
    let maxi = -Infinity
    for (let i = 0; i < room_count.length; i++) {
        maxi = Math.max(maxi, room_count[i])
        if (maxi > prev) {
            maxRoom_index = i;
            prev = maxi
        }
    }
    return maxRoom_index;
}

let n = 4
let meetings = [[18,19],[3,12],[17,19],[2,13],[7,10]]
// let heap = new MinHeap()
// for(let i=0;i<meetings.length;i++){
//     heap.push(meetings[i])
// }
// for(let i=0;i<meetings.length;i++) {
//     let t = heap.pop()
//     console.log('-------t',t)
// }
console.log(mostBooked(n,meetings))