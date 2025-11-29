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

    printHeap(){
        return this.heap
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null
    }

    size() {
        return this.heap.length
    }
}

var repeatLimitedString = function(s, repeatLimit) {
    let heap = new MaxHeap();
    let freqMap = new Map();
    for(let i of s) {
        if(!freqMap.has(i)) {
            freqMap.set(i,1)
        }
        else {
            const count = freqMap.get(i)
            freqMap.set(i,count+1)
        }
    }

    for(let [key,value] of freqMap) {
        heap.push([key,value])
    }
    let result = ''
    while(heap.size() > 0) {
        let [char, count] = heap.pop()
        let remainingCount = Math.min(count, repeatLimit) // in the map we may exist the count can be lesser than repeatLimit and if the repetLimit < count 
        result += char.repeat(remainingCount)
        count -= remainingCount

        //If still the same character exists
        if(count > 0 && heap.size() > 0) {
            let [char2,count2] = heap.pop()
            result += char2 // add another one character
            count2 -= 1

            if(count2 > 0) { 
                heap.push([char2,count2])
            }
            // push remaining of the original char back
            heap.push([char,count])
        }
        console.log(heap.printHeap())
    }

    return result
};

let s = "cczazcc"
let repeatLimit = 3
s = "aababab", repeatLimit = 2
s="bplpcfifosybmjxphbxdltxtfrjspgixoxzbpwrtkopepjxfooazjyosengdlvyfchqhqxznnhuuxhtbrojyhxwlsrklsryvmufoibgfyxgjw"
repeatLimit = 1
console.log(repeatLimitedString(s,repeatLimit))