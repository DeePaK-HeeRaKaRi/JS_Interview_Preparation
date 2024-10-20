var subarraySum = function(nums, k) {
    let hm = {}
    let ans = 0
    let sum = 0
    for(let i of nums) {
        sum += i
        if(sum == k) {
            ans += 1
        }

        let target = sum - k
        if(target in hm) {
            ans += hm[target]
        }

        if(sum in hm) {
            hm[sum] += 1
        }
        else{
            hm[sum] = 1
        }
    }

    return ans
};

let nums = [1,2,3]
let k = 3

console.log(subarraySum(nums, k))