var mergeTrees = function(root1, root2) {
    

    if(!root1) return root2
    if(!root2) return root1

    let sum = 0
    if(root1) sum+=root1.val
    if(root2) sum+=root2.val
    let node = new TreeNode(sum)

    node.left = mergeTrees(root1.left, root2.left)
    node.right = mergeTrees(root1.right, root2.right)
    
    return node
};