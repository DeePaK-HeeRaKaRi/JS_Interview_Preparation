 
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
class Solution {
    topView(root) {
        // code here
        let verticals_map = {}
        let result = []
        let queue = new Queue1()
        queue.enqueue([root,0])
        while(queue.size()) {
            let n = queue.size()
            for(let i=0;i<n;i++) {
                const [node,vertical] = queue.dequeue()
                if(!verticals_map[vertical]) {
                    verticals_map[vertical] = node.data
                }
                
                if(node.left) {
                    queue.enqueue([node.left,vertical-1])
                }
                
                if(node.right) {
                    queue.enqueue([node.right,vertical+1])
                }
            }
        }
        let vertical_keys = Object.keys(verticals_map).map(Number).sort((a,b) => a-b)
        
        for(let i of vertical_keys) {
            result.push(verticals_map[i])
        }
        
        return result
        
    }
}