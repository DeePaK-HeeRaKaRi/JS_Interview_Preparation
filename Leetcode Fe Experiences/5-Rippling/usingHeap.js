class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    push(item) {
      this.heap.push(item);
      this._heapifyUp();
    }
  
    pop() {
      if (this.heap.length === 1) return this.heap.pop();
      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this._heapifyDown();
      return min;
    }
  
    _heapifyUp() {
      let index = this.heap.length - 1;
      while (index > 0) {
        let parentIdx = Math.floor((index - 1) / 2);
        if (this.heap[parentIdx].length <= this.heap[index].length) break;
        [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
        index = parentIdx;
      }
    }
  
    _heapifyDown() {
      let index = 0;
      let length = this.heap.length;
      while (true) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;
  
        if (left < length && this.heap[left].length < this.heap[smallest].length) smallest = left;
        if (right < length && this.heap[right].length < this.heap[smallest].length) smallest = right;
  
        if (smallest === index) break;
        [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
        index = smallest;
      }
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
  }
  
  function flattenByLength(arr) {
    let result = [];
    
    function process(arr) {
      let subArrays = new MinHeap();
  
      arr.forEach(item => {
        if (Array.isArray(item)) {
          subArrays.push(item); // Insert into heap
        } else {
          result.push(item); // Push numbers directly
        }
      });
  
      while (!subArrays.isEmpty()) {
        process(subArrays.pop()); // Process smallest-length array first
      }
    }
  
    process(arr);
    return result;
  }
  
  let arr = [
    1,
    2,
    [3, [4, 10, [90, 100], [900, 999]], 5],
    [100, 200, 300],
    6,
    [1000,2000],
    [7],
    [10],
  ];
  
  console.log(flattenByLength(arr));
  