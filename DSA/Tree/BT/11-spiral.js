 
class Queue1 {
    constructor(){
        this.elements = {}
        this.head = 0
        this.tail = 0
    }

    enqueue(val) {
        this.elements[this.tail] = val
        this.tail++
    }

    dequeue() {
        if(this.size() == 0) return null
        const element = this.elements[this.head]
        delete this.elements[this.head]
        this.head++
        return element
    }

    size() {
        return this.tail - this.head
    }

    peek(){
        return this.elements[this.head]
    }
}
var zigzagLevelOrder = function(root) {
    if(root == null) return []
    let result = []
    let queue = new Queue1()
    queue.enqueue(root)
    let flag = true
    while(queue.size()) {
        let n = queue.size()
        let level = new Array(n)
        for(let i=0;i<n;i++) {
            let node = queue.dequeue()
            let index = flag ? i : n-i-1
            level[index] = node.val
            if(node.left) {
                queue.enqueue(node.left)
            }
            if(node.right) {
                queue.enqueue(node.right)
            }
        }
        result.push(level)
        flag = !flag
    }
    return result

};