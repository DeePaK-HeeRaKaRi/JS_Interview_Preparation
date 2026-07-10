

var diameterOfBinaryTree = function(root) {
     let res = 0
     function helper(root) {
        if(!root) return null
        const lh = helper(root.left)
        const rh = helper(root.right)
        res = Math.max(res, lh + rh)
        return 1 + Math.max(lh,rh)
     }
     helper(root)
     return res
};