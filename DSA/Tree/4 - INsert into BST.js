var insertIntoBST = function(root, val) {
    let newNode = new TreeNode(val)
    if(root == null) return newNode
    
    let prev_left = null
    let prev_right = null
    let curr = root
    while(root) {
        if(val < root.val) {
            prev_left = root
            root = root.left
            flag = true
        }
        else {
            prev_right = root
            root = root.right
            flag = false
        }
    }

    if(flag) {
        prev_left.left = newNode
    }
    else {
        prev_right.right = newNode
    }

    return curr
};