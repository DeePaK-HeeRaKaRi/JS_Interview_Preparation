 
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
var verticalTraversal = function(root) {
    if(root == null) return []
    let verticals_map = {}
    let queue = new Queue1()
    let level = 0
    let vertical = 0
    queue.enqueue([root,0,0])
    while(queue.size()) {
        let n = queue.size()
        let curr_level_map = {}
        for(let i=0;i<n;i++) {
            let [node,vertical,level] = queue.dequeue()
            if(!curr_level_map[vertical]){
                curr_level_map[vertical] = []
            }
            (curr_level_map[vertical] = curr_level_map[vertical] || []).push(node.val);
            if(node.left) {
                queue.enqueue([node.left,vertical-1,level+1])
            }
            if(node.right) {
                queue.enqueue([node.right,vertical+1,level+1])
            }
        }

        //Sort the nodes in the curr level(same row, same col) & update the verticals map
        for(let vertical in curr_level_map) {
            if(!verticals_map[vertical]) {
                verticals_map[vertical] = []
            }
            verticals_map[vertical] = [...verticals_map[vertical],...curr_level_map[vertical].sort((a,b) => a-b)]
        }
    }

    let vertical_keys = Object.keys(verticals_map).map(Number).sort((a,b) => a-b)
    let result = []
    for(let i of vertical_keys) {
        result.push(verticals_map[i])
    }

    return result
};