
var inorderTraversal = function(root) {
    // let result = []
    // function helper(root) {
    //     if(!root) return 
    //     helper(root.left)
    //     result.push(root.val)
    //     helper(root.right)
    // }
    // helper(root)
    // return result

    if(!root) return []

    let inorder = []
    let stack = [] // left root right
    let node = root
    while(true) {
        if(node != null) {
            stack.push(node)
            node = node.left // Travserse untill left
        }
        else {
            if(stack.length == 0) {
                break
            }
            const top = stack.pop()
            inorder.push(top.val) 

            node = top.right 
        }
    }
    return inorder
};