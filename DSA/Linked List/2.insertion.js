
class Node{
    constructor(data) {
        this.data = data
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

function insertatlast(head,x) {
    let prev = head
    while(prev.next != null) {
        prev = prev.next
    }
    let new_node = new Node(x)
    prev.next = new_node
    prev = new_node
    return head
}

function printInput(head) {
    console.log('--head')
   
    while(head != null) {
        
        console.log(head.data + '>>')
        head = head.next
    }
   
}
let arr = [2,3,5,6,7]
let input = getHead(arr)
console.log({input})
let insert_at_last = insertatlast(input,10)


printInput(insert_at_last)