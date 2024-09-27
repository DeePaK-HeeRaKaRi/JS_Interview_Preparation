var partitionDisjoint = function(nums) {
    let n =nums.length
    let minRightIndex = new Array(n).fill(-1)
    let maxLeftIndex = new Array(n).fill(-1)
    let l = 0
    let r = nums.length - 1
    let curLeftMax = -Infinity
    let curRightMin = Infinity
    while(l < n) {
        curLeftMax = Math.max(curLeftMax,nums[l])
        curRightMin = Math.min(curRightMin,nums[r])
        minRightIndex[r] = curRightMin
        maxLeftIndex[l] = curLeftMax
        l++
        r--
    }
    
    for(let i=1;i<n;i++) {
        if(maxLeftIndex[i-1]<=minRightIndex[i]){ //[i-1] > need one in the left
            return i
        }
    }
    // return ans
    // return 1
};
let nums  = [1,1,1,0,6,12]
nums = [5,0,3,8,6]
nums = [5,0,6,2,1,10,19,7]
console.log(partitionDisjoint(nums))