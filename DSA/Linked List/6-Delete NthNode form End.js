
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

function deletenthNode(head,k) {
  //BruteForce - Find Length and travne upto length - k nodes  TC> 2*len

  let fast = head
  let slow = head
  for(let i=0;i<k;i++) {
    fast = fast.next
  }
  if(fast == null) return head.next // if K == Length of LinkedlIst

  while(fast.next !=null) {
    fast = fast.next
    slow = slow.next
  }
  //slow is now at node before node to be deleted
  let deleteNode = slow.next
  slow.next = deleteNode.next
  return head
}
let arr = [1,2,3,4,5]
let k = 3
let input = getHead(arr)
console.log({input})

let res = deletenthNode(input,k)
let output = printInput(res)
 