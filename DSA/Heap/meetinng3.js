class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root;
    }

    heapifyUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex][0] > this.heap[currentIndex][0]) {
                [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        let currentIndex = index;
        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestIndex = currentIndex;
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex][0] < this.heap[smallestIndex][0]) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex][0] < this.heap[smallestIndex][0]) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex !== currentIndex) {
                [this.heap[currentIndex], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[currentIndex]];
                currentIndex = smallestIndex;
            } else {
                break;
            }
        }
    }

    peek() {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}

class Solution {
    mostBooked(n, meetings) {
        let available_rooms = new MinHeap();
        let endTime_rooms_heap = new MinHeap();
        let room_count = new Array(n).fill(0); // Initialize room count array

        for (let i = 0; i < n; i++) {
            available_rooms.push(i);
        }

        meetings.sort((a, b) => a[0] - b[0]);

        for (let [start, end] of meetings) {
            let room;
            while (endTime_rooms_heap.size() > 0 && endTime_rooms_heap.peek()[0] <= start) {
                const curr_ = endTime_rooms_heap.pop();
                room = curr_[1];
                console.log('-----room while',room)
                available_rooms.push(room);
            }

            if (available_rooms.size() > 0) {
                room = available_rooms.pop();
                console.log('--if room',room)
                endTime_rooms_heap.push([end, room]);
            } else {
                const curr = endTime_rooms_heap.pop();
                const endTime = curr[0];
                room = curr[1];
                console.log('--else room',room)
                endTime_rooms_heap.push([endTime + (end - start), room]);
            }
            console.log('------room',room)
            room_count[room] += 1;
        }
        console.log(room_count)
        // let maxRoomIndex = 0;
        // let prev = -Infinity;
        // let maxi = -Infinity;
        // for (let i = 0; i < roomCount.length; i++) {
        //     maxi = Math.max(maxi, roomCount[i]);
        //     if (maxi > prev) {
        //         maxRoomIndex = i;
        //         prev = maxi;
        //     }
        // }
        // return maxRoomIndex;
    }
}

// class Solution {
//     mostBooked(n, meetings) {
//         const roomCount = new Array(n).fill(0);
//         const availableRooms = new MinHeap();
//         const endTimeRoomsHeap = new MinHeap();

//         meetings.sort((a, b) => a[0] - b[0]);

//         for (let i = 0; i < n; i++) {
//             availableRooms.push(i);
//         }

//         for (const [start, end] of meetings) {
//             while (endTimeRoomsHeap.size() > 0 && endTimeRoomsHeap.peek()[0] <= start) {
//                 const [endTime, room] = endTimeRoomsHeap.pop();
//                 availableRooms.push(room);
//             }

//             if (availableRooms.size() > 0) {
//                 const room = availableRooms.pop();
//                 endTimeRoomsHeap.push([end, room]);
//             } else {
//                 const [endTime, room] = endTimeRoomsHeap.pop();
//                 endTimeRoomsHeap.push([endTime + end - start, room]);
//             }
//             roomCount[endTimeRoomsHeap.peek()[1]]++;
//         }


//         // let maxRoomIndex = 0;
//         // let prev = -Infinity;
//         // let maxi = -Infinity;
//         // for (let i = 0; i < roomCount.length; i++) {
//         //     maxi = Math.max(maxi, roomCount[i]);
//         //     if (maxi > prev) {
//         //         maxRoomIndex = i;
//         //         prev = maxi;
//         //     }
//         // }
//         // return maxRoomIndex;
//     }
// }

// Example usage:

const solution = new Solution();
let n = 4
let meetings = [[18,19],[3,12],[17,19],[2,13],[7,10]]
console.log(solution.mostBooked(n, meetings)); // Output will depend on the input
