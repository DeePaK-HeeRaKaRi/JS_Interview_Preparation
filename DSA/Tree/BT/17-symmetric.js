var isSymmetric = function(root) {
    function helper(l,r) {
        if(l == null && r == null) return true
        if(l == null || r == null) return false

        if(l.val == r.val) {
            return helper(l.left,r.right) && helper(l.right,r.left)
        }
        else {
            return false
        }
    }

    return helper(root.left,root.right) 
};