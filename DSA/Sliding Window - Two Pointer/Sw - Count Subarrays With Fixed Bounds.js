var countSubarrays = function(nums, minK, maxK) {
    let isMaxElement = false
    let isMinElement = false
    let maxElementIndex = -1
    let minElementIndex = -1
    let r = 0
    let ans = 0
    let l = 0
    while(r < nums.length) {
        if(nums[r] == minK) {
            isMinElement = true
            minElementIndex = r
        }

        if(nums[r] == maxK) {
            isMaxElement = true
            maxElementIndex = r
        }

        if(nums[r] > maxK || nums[r] < minK) {
            isMaxElement = false
            isMinElement = false
            maxElementIndex = -1
            minElementIndex = -1
            l = r + 1
        }

        if(isMaxElement && isMinElement) {
            // [2,2,3,5,2,4,1,2,7,3,1,2,5] min=1,max=5
            ans += Math.min(maxElementIndex,minElementIndex) - l + 1
        }
        r++
    }
    return ans
    
};

let nums = [1,3,5,2,7,5]
let minK = 1
let maxK =5
nums = [1,1,1,1]
minK = 1
maxK = 1

nums = [2,2,3,5,2,4,1,2,7,3,1,2,5]
minK = 1
maxK = 5
console.log(countSubarrays(nums,minK,maxK))