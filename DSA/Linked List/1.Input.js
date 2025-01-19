
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

function printInput(head) {
    console.log('--head')
    let count = 0
    while(head != null) {
        count++
        console.log(head.data + '>>')
        head = head.next
    }
    return count
}
let arr = [2,3,5,6,7]
let input = getHead(arr)
console.log({input})
let output = printInput(input)
console.log({output})