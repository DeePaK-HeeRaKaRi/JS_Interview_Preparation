// var numSubarraysWithSum = function(nums, goal) {
//     let hm = new Map()
//     let ans = 0
//     let sum = 0
//     for(let i of nums) {
//         sum += i
//         if(sum == goal) {
//             ans++
//         }
//         if(hm.has(sum - goal)) {
//             ans += hm.get(sum - goal)
//         }
//         if(hm.has(sum)) {
//             hm.set(sum,hm.get(sum)+1)
//         }else {
//             hm.set(sum,1)
//         }
//     }
    
//     return  ans;
// };

/*
Reducing the SC to o(1) 
Using the two pointer technique
Find the no. of subarrays <= goal - no.of subarrays <= goal - 1
*/
var numSubarraysWithSum = function(nums, goal) {
    /*
        Here we have 0 or 1. we can eliminate the space
        To cont the number of subarrays with sum
        The only sums that are counted in the first group but not in the second group are those that equal goal.
        So the difference isolates sum = goal.

        atMostK(goal) - atmostk(goal - 1)
        count the length

        exact_sum(goal) = atMost(goal) − atMost(goal − 1)
    */
    function atMostK(nums,goal) {
        if(goal < 0) return 0  // This edge cases hadles when goal = 0

        let left = 0
        let right = 0
        let n = nums.length
        let count = 0
        let sum = 0
        while(right < n) {
            sum += nums[right]
           
            while(sum > goal) {
                sum -= nums[left]
                left++
            }
            size = right - left + 1
            count += size
            right++
        }

        return count
    }

    return atMostK(nums,goal) - atMostK(nums,goal - 1)
}
let nums = [1,0,1,0,1]
let goal = 2
console.log(numSubarraysWithSum(nums,goal))