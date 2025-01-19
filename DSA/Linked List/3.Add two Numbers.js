
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
     
    while(head != null) {
        
        console.log(head.val + '>>')
        head = head.next
    }
     
}

function addTwoNmbers(head1, head2) {
    let dummy = new Node(0)
    let prev = dummy
    let count = 0
    while(head1 !=null || head2!=null || count!=0) {
        let sum = 0
        if(head1 != null) {
            sum+= head1.val
            head1 = head1.next
        }

        if(head2!=null) {
            sum+= head2.val
            head2 = head2.next
        }

        // Lets say sum = 13 ,  13/10 = 1, 13%10 = 3
        sum += count
        console.log(sum,head1?.val,head2?.val)
        let curr_Node = new Node(sum%10)
        prev.next = curr_Node
        prev = curr_Node

        count = Math.floor(sum / 10)
    }

    return dummy.next
}
let arr = [2,4,3]
let arr2 = [5,6,7,9]

let head1 = getHead(arr)
let head2 = getHead(arr2)
let res = addTwoNmbers(head1, head2)

let output = printInput(res)
console.log({output})