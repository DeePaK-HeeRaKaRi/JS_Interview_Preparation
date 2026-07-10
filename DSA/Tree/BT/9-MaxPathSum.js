
var maxPathSum = function(root) {
    let maxi = -Infinity
    function getMaxPathSum(root) {
        if(root == null) return 0
        let left = Math.max(0, getMaxPathSum(root.left))
        let right = Math.max(0, getMaxPathSum(root.right))
        maxi = Math.max(maxi,left + right + root.val)
        return Math.max(left,right)+root.val
    }
    getMaxPathSum(root)
    return maxi

};