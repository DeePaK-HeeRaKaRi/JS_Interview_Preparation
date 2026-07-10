
var isBalanced = function(root) {
    function helper(root) {
        if(!root) {
            return [0, true]
        }
        const [leftHeight, isLeftHeightBalanced] = helper(root.left)
        const [rightHeight, isRightHeightBalanced] = helper(root.right)
        const height = 1 + Math.max(leftHeight,rightHeight)

        if(leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1) {
            return [height,false]
        }

        if(isLeftHeightBalanced && isRightHeightBalanced) {
            return [height, true]
        }
        else {
            return [height, false]
        }

    }
    let [height, isTreeBalanced] = helper(root)
    return isTreeBalanced
};