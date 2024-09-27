var maxSubarrayLength = function(nums, k) {
    let l = 0
    let r = 0
    let hm = {}
    let ans = 0
    while (r<nums.length){
        if(hm.hasOwnProperty(nums[r])){
            hm[nums[r]] += 1
        }else{
            hm[nums[r]] = 1
        }
        if(hm[nums[r]] > k) {
            while(nums[l]!=nums[r]) {  //1 4 4 4 3 output 2
                hm[nums[l]]--
                l++
            }
            hm[nums[l]]--
            l++
        }
        ans = Math.max(ans, r-l+1)
        r++
    }
    return ans
};
let nums = [1,2,3,1,2,3,1,2]
let k = 2
nums = [1,2,1,2,1,2,1,2], k = 1
nums = [5,5,5,5,5,6,5], k = 4
console.log(maxSubarrayLength(nums,k))