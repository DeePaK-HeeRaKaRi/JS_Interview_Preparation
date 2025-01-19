
class Node{
    constructor(val) {
        this.val = val
        this.next = null
    }
}



function getHead(arr) {
    let head = null
    let tail = null
    for(let i of arr) {
        let new_node = new Node(i)
        if(head == null) {
            head = new_node
            tail = new_node
        }
        else {
            tail.next = new_node
            tail = new_node
        } 
    }
    return head
}

function printInput(head) {
    console.log('--head')
 
    while(head != null) {
 
        console.log(head.val + '>' +'\t')
        head = head.next
    }
 
}

function middle(head) {
    // use slow and fast pointers for middle & reverse slow.next 
    // [1,2,3,4,5] > 3 , fast will be at last index
    // [1,2,3,4,5,6] > 3 , fast will be at null 

    let slow = head
    let fast = head
    while(fast!=null && fast.next!=null) { // Handles for odd and even length
        slow = slow.next
        fast = fast.next.next
    }
   return slow
}
let arr = [1,2,3,3,2,1]
arr = [1,2,3,4,5,6]
let input = getHead(arr)
// console.log({input})
let res=  middle(input)
let output = printInput(res)
 