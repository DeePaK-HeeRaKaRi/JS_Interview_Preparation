
var isCousins = function(root, x, y) {
    let queue = [root]
    while(queue.length) {
        const n = queue.length
        let count = 0
        for(let i=0; i<n; i++ ) {
            const curr = queue.shift()
            if(curr.left && curr.right) {
                if((curr.left.val == x && curr.right.val ==y) || (curr.left.val == y && curr.right.val ==x)) {
                    return false // same parent
                }
            }
            if(curr.val == x || curr.val == y){//Each node  is unique
                count+=1
            }
            if(curr.left) {
                queue.push(curr.left)
            }
            if(curr.right) {
                queue.push(curr.right)
            }
        }
        if(count == 2) return true
    }
    return false

};