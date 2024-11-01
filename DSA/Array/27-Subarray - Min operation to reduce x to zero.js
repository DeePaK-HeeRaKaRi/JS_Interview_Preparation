var minOperations = function(nums, x) {
    let s = nums.reduce((prev,curr) => prev+curr,0)
    if(x > s) return -1  //[1,1] x = 3
    let target = s-x
    let max_subarray_length = -Infinity
    let l = 0
    let r = 0
    let curr_sum = 0
    while(r < nums.length) {
        curr_sum += nums[r]

        while(curr_sum > target) {
            curr_sum -= nums[l]
            l++
        }
        if(curr_sum == target) {
            max_subarray_length = Math.max(max_subarray_length,r-l+1)
        }
        r++
    }

    if(max_subarray_length == -Infinity) return -1

    return nums.length - max_subarray_length
};

let nums = [1,1,4,2,3], x = 5
console.log(minOperations(nums,x))