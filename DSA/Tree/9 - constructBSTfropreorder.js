var bstFromPreorder = function(preorder) {
    let i = 0
    function constructBST(intmax) {  // check for right bound
        if(i == preorder.length || preorder[i] > intmax) {
            return null // So you ned to go to right child
        }
        let root = new TreeNode(preorder[i])
        i+=1
        root.left = constructBST(root.val) // Pass the curr value so that its left child should be lees than the passed value
        root.right = constructBST(intmax)
        return root
    }

    return constructBST(Infinity)
};