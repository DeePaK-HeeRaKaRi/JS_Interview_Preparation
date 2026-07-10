

var preorderTraversal = function(root) {
    // let result = []
    // function helper(root) {
    //     if(!root) return
    //     result.push(root.val)
    //     helper(root.left)
    //     helper(root.right)
    // }
    // helper(root)
    // return result
    if(!root) return[]
    let stack = []
    let result = []
    stack.push(root)
    while(stack.length) {
        const top = stack.pop()
        result.push(top.val)

        if(top.right) {
            stack.push(top.right)
        }

        if(top.left) {
            stack.push(top.left)
        }
    }

    return result

};