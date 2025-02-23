var recoverTree = function(root) {
    let first = null
    let mid = null
    let last = null
    let prev = new TreeNode(-Infinity)

    function inorder(root) {
        if(!root) return null
        inorder(root.left)
        if(prev!=null && root.val < prev.val) {
            if(!first) {
                first = prev
                mid = root
            }
            else {
                last = root
            }
        }
        prev = root //Prev -infinity change to curr root., so root.val < prev n the next iteration
        inorder(root.right)
    }

    inorder(root)
    if(first && last) {
        [first.val,last.val] = [last.val,first.val]
    }
    else {
        [first.val,mid.val] = [mid.val,first.val]
    }
    return root
};