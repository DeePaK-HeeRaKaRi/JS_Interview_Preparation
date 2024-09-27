var numSubarrayProductLessThanK = function(nums, k) {
    if(k==0) return 0
    let mul = 1
    let count = 0;
    let l = 0
    let r = 0 
    
    while(r<nums.length) {
        mul = mul * nums[r]
        while(l<r && mul >= k) {
            mul = Math.floor(mul / nums[l])
            l++
        }

        count += r-l+1
        r += 1
    }
    return count
};
let nums = [10,5,2,6]
let k = 100
nums = [1,2,3]
k = 0
console.log(numSubarrayProductLessThanK(nums,k))