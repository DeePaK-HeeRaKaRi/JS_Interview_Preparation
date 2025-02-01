var sortedArrayToBST = function(nums) {
    // if(nums.length == 0) return null
    // let mid = Math.floor(nums.length/2)
    // let root = new TreeNode(nums[mid])
    // let left_arr = nums.slice(0,mid)
    // let right_arr = nums.slice(mid+1)
    // root.left = sortedArrayToBST(left_arr)
    // root.right = sortedArrayToBST(right_arr)
    // return root

    function buildBST(left,right) {
        if(left > right) return null
        let mid = Math.floor((left + right) / 2)
        let root = new TreeNode(nums[mid])
        root.left = buildBST(left,mid-1)
        root.right = buildBST(mid+1,right)
        return root
    }
    return buildBST(0,nums.length-1)
};