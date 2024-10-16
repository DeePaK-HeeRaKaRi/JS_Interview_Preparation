
var longestConsecutive = function(nums) {
    let hash_set = new Set()
    for(let i of nums) {
        hash_set.add(i)
    }
    let ans = 0
    for(let i of nums) {
        if(!hash_set.has(i-1)) {
            let curr = i
            let count = 0
            //he while loop doesn't recheck already processed numbers
            while(hash_set.has(curr)) {
                count++
                curr++
            }
            ans = Math.max(ans,count)
        }
    }
    return ans

    // Tc - O(n) Sc- O(n)
};

let nums = [100,4,200,1,3,2]
nums = [0,3,7,2,5,8,4,6,0,1]
console.log(longestConsecutive(nums))