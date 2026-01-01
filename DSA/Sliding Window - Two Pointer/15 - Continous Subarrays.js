var continuousSubarrays = function(nums) {
    let maxQ = []
    let minQ = []
    let l = 0
    let r = 0
    let ans = 0
    while(r < nums.length) {
        // Maintain Descreasing order in maxQ
        while(maxQ.length > 0 && nums[r] > maxQ[maxQ.length-1]) {  //like [7,5,2]
            maxQ.pop()  
        }
        // Maintain Increasing order in minQ
        while(minQ.length > 0 && nums[r] < minQ[minQ.length-1]) {   //like [3,6,8]
            minQ.pop()
        }
        maxQ.push(nums[r])
        minQ.push(nums[r])
        while(Math.abs(maxQ[0] - minQ[0]) > 2) {
            if(nums[l] == maxQ[0]) {
                maxQ.shift()
            }
            if(nums[l] == minQ[0]) {
                minQ.shift()
            }
            l+=1
        }
        ans += r-l+1
        r+=1
    }
    return ans
};

let nums = [10,11,9,5,8,6,4,1,7]
nums = [5,4,2,4]
nums = [7,6,2,5,4,3]
console.log(continuousSubarrays(nums))