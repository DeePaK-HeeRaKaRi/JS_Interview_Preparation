var rightSideView = function(root) {
    let result = []
    // Do reverse pre-order > root > right > left
    function helper(root,level) {
        if(root == null) return 
        if(level == result.length) {
            result.push(root.val)
        }
        helper(root.right,level+1)
        helper(root.left,level+1)
        // return result
    }
    helper(root,0)
    return result
};