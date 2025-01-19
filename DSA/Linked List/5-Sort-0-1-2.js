
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

function sort012(head) {
    if(head == null || head.next == null) {
        return head
    }

    let zeroHead = new Node(-1)
    let oneHead = new Node(-1)
    let twoHead = new Node(-1)
    let zero = zeroHead
    let one = oneHead
    let two = twoHead
    // Changing the links
    while(head != null) {
        if(head.val == 0) {
            zero.next = head
            zero = zero.next
        }
        else if(head.val == 1) {
            one.next = head
            one = one.next
        }
        else {
            two.next = head
            two = two.next
        }

        head = head.next
    }

    zero.next = oneHead.next ? oneHead.next : twoHead.next
    one.next = twoHead.next
    two.next = null

    return zeroHead.next 
}
let arr = [1,0,1,2,2,0,0,2,1,0,1]
let input = getHead(arr)
console.log({input})

let res = sort012(input)
let output = printInput(res)
 