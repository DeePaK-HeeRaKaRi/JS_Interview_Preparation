/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
class MinHeap{
    constructor() {
        this.heap = [];
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
        this.heapifyUp_array()
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
var mergeKLists = function(lists) {
     const minheap = new MinHeap()
    for(let i=0;i<lists.length;  i++) {   //O(klogk).  > insert o(logk)
        if(lists[i] != null) {
            minheap.push([lists[i].val,lists[i]]) // Push the 0th index of the lists
        }
    }

    let dummy = new ListNode(-1)
    let temp = dummy
    while(minheap.size() > 0) { //O(Nlogk)
        let [val,node] = minheap.pop()  // o(logk)
        temp.next = node
        temp = temp.next
        if(node.next) {
            minheap.push([node.next.val,node.next]) //Then push curr node next 
        }
    }
    temp.next = null
    return dummy.next

    //tc O(klogk)+O(Nlogk)=O(Nlogk)
    // sc o(k)
};

/*

Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
*/