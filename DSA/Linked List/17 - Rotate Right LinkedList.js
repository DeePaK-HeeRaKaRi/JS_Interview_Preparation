
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

function rotateByRight(head,k) {
     if(k == 0 || head == null || head.next == null) return head
     let curr = head
    
     let size = 1
    while(head.next != null) {
        head = head.next
        size++
    }
    head.next =curr
    
    if( k % size == 0) return head

    if(k < size) {
        k = size - k
    }
    else {
        k = k % size
        k = size - k
    }
    let prev = null
    for(let i=0;i<k; i++) {
        prev = curr
        curr = curr.next
    }
    prev.next = null
    return curr
}
let arr = [1,2,3,4,5]
let k = 2
let input = getHead(arr)
// console.log({input})
let res=   rotateByRight(input,k)
let output = printInput(res) // [4,5,1,2,3]
 