
var binaryTreePaths = function(root) {
    let curr_path = []
    let res = []
    function helper(root) {
        if(root == null) {
            return []
        }
        curr_path.push(root.val)
        if(root.left == null && root.right == null) {
            let str = curr_path.join('->')
            res.push(str)
        }
        helper(root.left)
        helper(root.right)
        curr_path.pop()
        return
    }
    helper(root)
    return res
};