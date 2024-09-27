var longestOnes = function(nums, k) {
    let zeros = []
    let maxi = 0
    let l = 0
    let r = 0
    while(r<nums.length) {
        if(nums[r]==0){
            zeros.push(r)
        }
        if(zeros.length>k){
            l = zeros.shift()+1
        }
        maxi = Math.max(maxi, r-l+1)
        r++
    }
    return maxi;
};
let nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1]
let k = 3
console.log(longestOnes(nums,k))