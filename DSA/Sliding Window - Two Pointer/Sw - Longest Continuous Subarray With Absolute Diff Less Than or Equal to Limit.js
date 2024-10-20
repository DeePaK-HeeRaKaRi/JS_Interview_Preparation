// Same as Continous Subarrays

var longestSubarray = function(nums,limit) {
    let maxQ = []
    let minQ = []
    let l = 0
    let r = 0
    let ans = 0
    while(r < nums.length) {
        while(maxQ.length > 0 && nums[r] > maxQ[maxQ.length-1]) {
            maxQ.pop()
        }
        while(minQ.length > 0 && nums[r] < minQ[minQ.length-1]) {
            minQ.pop()
        }
        maxQ.push(nums[r])
        minQ.push(nums[r])
        while((maxQ[0] - minQ[0]) > limit) {
            if(nums[l] == maxQ[0]) {
                maxQ.shift()
            }
            if(nums[l] == minQ[0]) {
                minQ.shift()
            }
            l+=1
        }
        ans = Math.max(ans,r-l+1)
        r+=1
    }
    return ans
}
let nums = [10,1,2,4,7,2]
let limit = 5
nums = [4,2,2,2,4,4,2,2]
limit = 0
nums = [8,2,4,7]
limit = 4
console.log(longestSubarray(nums,limit))