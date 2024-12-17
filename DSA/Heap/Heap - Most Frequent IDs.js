class MaxHeap {
    constructor() {
        this.heap = [];
        this.elementsMap = {}
    }

    heapifyUp_array(currentIndex = this.heap.length - 1) {
        // let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            let parentIndex = Math.floor((currentIndex - 1) / 2)
            if (this.heap[parentIndex][0] < this.heap[currentIndex][0]) {
                [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]]
                this.elementsMap[this.heap[currentIndex][1]] = currentIndex
                this.elementsMap[this.heap[parentIndex][1]] = parentIndex
                currentIndex = parentIndex
            } else {
                break
            }
        }
    }

    push(val) {
        this.heap.push(val);
        const index = this.heap.length - 1
        this.elementsMap[val[1]] = index
        this.heapifyUp_array()
    }


    heapifyDown() {
        let currentIndex = 0
        let leftIndex = 2 * currentIndex + 1
        let rightIndex = 2 * currentIndex + 2
        while (leftIndex < this.heap.length) {
            let temp = currentIndex
            if (this.heap[temp] < this.heap[leftIndex]) {
                temp = leftIndex
            }
            if (rightIndex < this.heap.length && this.heap[temp] < this.heap[rightIndex]) {
                temp = rightIndex
            }
            if (temp == currentIndex) {
                return
            }
            [this.heap[temp], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[temp]]
            currentIndex = temp
            leftIndex = 2 * currentIndex + 1
            rightIndex = 2 * currentIndex + 2
        }
    }

    heapifyDown_array(currentIndex = 0) {
        // let currentIndex = 0
        let leftIndex = 2 * currentIndex + 1
        let rightIndex = 2 * currentIndex + 2
        while (leftIndex < this.heap.length) {
            let temp = currentIndex
            if (this.heap[temp][0] < this.heap[leftIndex][0]) {
                temp = leftIndex
            }
            if (rightIndex < this.heap.length && this.heap[temp][0] < this.heap[rightIndex][0]) {
                temp = rightIndex
            }
            if (temp === currentIndex) {
                break
            }


            // const x = this.heap[temp][1]
            // const y = this.heap[currentIndex][1]
            // this.elementsMap[x] = currentIndex
            // this.elementsMap[y] = temp

            [this.heap[temp], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[temp]]
            this.elementsMap[this.heap[currentIndex][1]] = currentIndex
            this.elementsMap[this.heap[temp][1]] = temp

            currentIndex = temp
            leftIndex = 2 * currentIndex + 1
            rightIndex = 2 * currentIndex + 2
        }
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        let result = this.heap[0];
        const lastElement = this.heap.pop();
        this.heap[0] = lastElement
        // this.printElementsMap()
        this.elementsMap[0] = this.elementsMap[this.heap.length - 1] //Update the 0th index
        if (Array.isArray(result)) {
            this.heapifyDown_array();
        } else {
            this.heapifyDown();
        }
        return result;
    }

    size() {
        return this.heap.length
    }
    top() {
        return this.heap[0]
    }

   
    getElementByIdAndUpdate(id, freq) {
        const index = this.elementsMap[id];
        const currIndexElement = this.heap[index];
        currIndexElement[0] += freq;
        this.heap[index] = currIndexElement;
        if (freq > 0) {
            this.heapifyUp_array(index);
        } else {
            this.heapifyDown_array(index);
        }
    }
    printElementsMap() {
        console.log("Elements Map: ", this.elementsMap)
    }
}



var mostFrequentIDs = function(nums, freq) {
    const max_heap = new MaxHeap()
    let set = new Set()
    let res= []
    for(let i=0;i<freq.length;i++){
        if(set.has(nums[i])) {
            max_heap.getElementByIdAndUpdate(nums[i],freq[i])
            max_heap.heapifyUp_array()
        }else {
            set.add(nums[i]);
            max_heap.push([freq[i], nums[i]])
        }
        // console.log('ans',max_heap.heap[0])
        res.push(max_heap.heap[0][0])
    }
    console.log(res)
};
let nums = [2,4,2,5,9,9]
let freq = [7,3,-2,3,6,3]
nums = [2,3,2,1], freq = [3,2,-3,1]
nums = [5,5,3], freq = [2,-2,1]
nums = [2,6,9,6]
freq = [5,2,3,5]
mostFrequentIDs(nums,freq)