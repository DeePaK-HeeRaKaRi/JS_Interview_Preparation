var canJump = function(nums) {

    let max_jump = 0
    let n = nums.length
    for(let i=0; i<n; i++) {
        if(i > max_jump) return false
        max_jump = Math.max(max_jump, nums[i] + i)
    }
    return true
};

console.log(canJump([2,3,1,1,4]))