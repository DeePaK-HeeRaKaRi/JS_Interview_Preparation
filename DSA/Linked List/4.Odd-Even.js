
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
 
        console.log(head.val + '>>')
        head = head.next
    }
 
}

function oddeven(head) {
    if(head == null || head.next == null) {
        return head
    }

    let odd_curr = head
    let even_head = head.next
    let even_curr = even_head
    //Since odd will come before even. so no need of checking for odd
    while(even_curr !=null && even_curr.next!=null) {
        odd_curr.next = odd_curr.next.next
        even_curr.next = even_curr.next.next

        odd_curr = odd_curr.next
        even_curr = even_curr.next
    }
    //At the end of the loop, odd_curr will be at the end of the odd list and attach to even head
    odd_curr.next = even_head
    return head
}
let arr = [2,3,5,6,7]
let input = getHead(arr)
console.log({input})

let res = oddeven(input)
let output = printInput(res)
console.log({output})