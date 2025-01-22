
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

function reverseKNodes(head,k) {
    if(k == 1) return head
     let curr = head
     
     //[1,2,3,4,5,6,7,8] k=3 > No need of reversing 7,8
     for(let i=0;i<k;i++) {
        if(curr == null) return head
        curr = curr.next
     }

    let curr_node = head
    let prev = null
    let next_node= null
    for(let i=0 ; i<k ; i++) {
        next_node = curr_node.next
        curr_node.next = prev
        prev = curr_node
        curr_node = next_node
    }

    head.next = reverseKNodes(curr_node,k)
    return prev
}
let arr = [1,2,3,4,5,6,7,8,9,10]
let k = 1
let input = getHead(arr)
// console.log({input})
let res=   reverseKNodes(input,k)
let output = printInput(res)
 