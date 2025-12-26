var countNiceSubarrays = (nums,k) => {
    // Same as sum of subarrays equal to k

    // convert odd to 1 and even to 0 and make the sum that equal to k
    function atMostK(nums,goal) {
        if(goal < 0) return 0  // This edge cases hadles when goal = 0

        let left = 0
        let right = 0
        let n = nums.length
        let count = 0
        let sum = 0
        while(right < n) {
            sum += (nums[right] % 2)
           
            while(sum > goal) {
                sum -= (nums[left] % 2)
                left++
            }
            size = right - left + 1
            count += size
            right++
        }

        return count
    }

    return atMostK(nums,k) - atMostK(nums,k - 1)
  
}
let nums = [2,2,2,1,2,2,1,2,2,2]
let k = 2

console.log(countNiceSubarrays(nums,k))