 
var lowestCommonAncestor = function(root, p, q) {
    function helper(root) {
        if(root == null) return root

        if(root == p || root == q) {
            return root
        }
        const left = helper(root.left)
        const right = helper(root.right)
        if(left == null) return right
        if(right == null) return left
        return root
    }
    return helper(root)
};