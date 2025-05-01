// https://leetcode.com/discuss/post/4265464/goldman-sachs-coderpad-by-anonymous_user-iwo9/

// var topKFrequent = function(words, k) {
//     let hm = {}
//     for(let i of words) {
//         hm[i] = (hm[i] || 0) + 1
//     }
//     let result = []
//     let hm_arr = Object.entries(hm).sort((a,b) => {
//         if (b[1] === a[1]) {
//             return a[0].localeCompare(b[0]); // Sort alphabetically if frequency matches
//           }
//           return b[1] - a[1]; // Sort by frequency descending
//     })
//     console.log({hm_arr})
//     let count = 0
//     for(let [key,value] of hm_arr) {
//         if(count != k) {
//             result.push(key)
//             count += 1
//         }
//         else {
//             break
//         }
//     }
//     return result
// };

class MinHeap {
    constructor() {
        this.heap = [];
    }

    compare(a, b) {
        if (a[1] !== b[1]) return a[1] - b[1]; // lower freq comes first
        return b[0].localeCompare(a[0]);       // for same freq, higher word first
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parent]) < 0) {
                [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
                index = parent;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        let index = 0;
        let length = this.heap.length;
        while (true) {
            let smallest = index;
            let left = 2 * index + 1;
            let right = 2 * index + 2;

            if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }

            if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return top;
    }

    size() {
        return this.heap.length;
    }

    top() {
        return this.heap[0];
    }

    getAll() {
        return this.heap.slice();
    }
}


var topKFrequent = function(words, k) {
    let freqMap = {};
    for (let word of words) {
        freqMap[word] = (freqMap[word] || 0) + 1;
    }

    let heap = new MinHeap();

    for (let [word, freq] of Object.entries(freqMap)) {
        heap.push([word, freq]);
        if (heap.size() > k) {
            heap.pop(); // Remove the least important
        }
    }

    // Build the result in reverse since heap gives least first
    let res = new Array(k).fill(-1);
    let index = res.length - 1
    while (heap.size()) {
        // res.unshift(heap.pop()[0]); // get only the word
        res[index] = heap.pop()[0]
        index--
        // index++;
    }

    return res;
};
let words = ["i","love","leetcode","i","love","coding"]
let k = 2
// console.log(topKFrequent(words,k))
words = ["the","day","is","sunny","the","the","the","sunny","is","is"]
k = 4
// console.log(topKFrequent(words,k))
// words = ["i","love","leetcode","i","love","coding"]
// k = 3
console.log(topKFrequent(words,k))

/*
Min-Heap	O(n + m log k)	O(m + k)

*/