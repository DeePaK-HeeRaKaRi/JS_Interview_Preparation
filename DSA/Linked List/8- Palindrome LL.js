
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

function reverse(head) {
 let prev = null
 let curr

 while(head != null) {
    curr = head.next
    head.next = prev
    prev = head
    head = curr
 }
 return prev
}

function palindrome(head) {
    // use slow and fast pointers for middle & reverse slow.next 

    let slow = head
    let fast = head
    while(fast.next!=null && fast.next.next!=null) { // Handles for odd and even length
        slow = slow.next
        fast = fast.next.next
    }

    let newHead = reverse(slow.next)
   
    while(head != null && newHead!=null) {
        if(head.val != newHead.val) {
            return false
        }
        head = head.next
        newHead = newHead.next
    }
    return true
}
let arr = [1,2,3,3,2,1]
arr = [1,2]
let input = getHead(arr)
// console.log({input})
console.log(palindrome(input))
 