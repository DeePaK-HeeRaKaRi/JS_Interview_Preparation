
var postorderTraversal = function(root) {
    if(!root) return []
    let post = []
    let stack = []
    let node = root
    while(node || stack.length !== 0){
        if(node) { // Go as deep left as possible
            stack.push(node)
            node = node.left
        }
        //  hit a null on the left, so check the right side
        else {
            let temp = stack[stack.length - 1].right
            // If there is no right child, or we just came back from it
            if(!temp) {
                temp = stack[stack.length - 1]
                stack.pop()
                post.push(temp.val)
                // If the node we just processed is the right child of the new top,
                // it means we are done with that subtree too, so process the parent.
                while(stack.length !==0 && temp == stack[stack.length - 1].right) {
                    temp = stack[stack.length - 1] 
                    stack.pop()
                    post.push(temp.val)
                }
            }
            // If there is a right child, move to it
            else {
                node = temp
            }
        }
    }
    return post
};