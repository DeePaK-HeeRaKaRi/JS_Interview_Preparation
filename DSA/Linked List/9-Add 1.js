//https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1


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

//  BF > reverse LL and DO Add and Reverse LL >  TC = o(3n) sc =o(1)
function addOne(head) {

 let curr = head
 
 function helper(node) {
    if(node == null) return 1  // If it is null means for the last node need to add 1

    let carry = helper(node.next)

    node.val = node.val + carry
     
    if(node.val < 10 ) {
        return 0
    }
    node.val = 0  //0 >  contaiins only single digits
    return 1  // 1
    // TC - o(n) , ASC = o(n)
 }

 let tmp = helper(curr)
 console.log('tmp',tmp)
 if(tmp == 1) {
    let new_node = new Node(1)
    new_node.next = head
    head = new_node
 }
 return head
//  console.log(printInput(curr))
}
let arr = [9,9,9,9]
arr = [4,9,9]
arr=[9]
let input = getHead(arr)
console.log({input})

let res = addOne(input)
let output = printInput(res)

// 456 > 457
// 9999 > 10000