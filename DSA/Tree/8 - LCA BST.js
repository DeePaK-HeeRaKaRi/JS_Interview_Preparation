var lowestCommonAncestor = function(root, p, q) {
    while(root) {
        let curr = root
        if(p.val < curr.val && q.val < curr.val) {
            root = root.left
        }
        else if(p.val > curr.val && q.val > curr.val) {
            root = root.right
        }
        else {
            return curr
        }
    }
};