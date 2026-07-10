
var minDepth = function(root) {
    if(!root) return 0
    if(!root.left && !root.right) {
        return 1
    }
    const left = minDepth(root.left)
    const right = minDepth(root.right)
    if(left !==0  && right !== 0) {
        return Math.min(left,right) + 1
    }
    else if(left !== 0 && right == 0) {
        return left + 1
    }
    else {
        return right + 1
    }
};