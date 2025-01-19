
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
let arr = [1,2,3,4,5]

let input = getHead(arr)
console.log({input})

let res = reverse(input)
let output = printInput(res)
 