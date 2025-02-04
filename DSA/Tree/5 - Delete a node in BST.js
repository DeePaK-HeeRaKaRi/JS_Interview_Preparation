var deleteNode = function(root, key) {
    function findLastNode(root) {
        if(root.right == null) return root
        return findLastNode(root.right)
    }
    function helper(root) {
        if(root.left == null) return root.right
        if(root.right == null) return root.left
        // Take the target right child & point towards the end of the left child so that it will becmoe a BST
        let right_child = root.right
        let left_child = findLastNode(root.left)
        left_child.right = right_child
        return root.left
    }

    if(root == null) return null

    if(root.val == key) {
        return helper(root)
    }

    let curr = root
    while(root) {
        if(key < root.val) {
            if(root.left != null && root.left.val == key) {
                root.left = helper(root.left)
                break
            } else {
                root = root.left
            }
        }
        else {
            if(root.right != null && root.right.val == key) {
                root.right = helper(root.right)
                break
            } else {
                root = root.right
            }
        }
    }

    return curr
};