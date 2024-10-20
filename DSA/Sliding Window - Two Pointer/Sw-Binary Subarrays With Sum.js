var numSubarraysWithSum = function(nums, goal) {
    let hm = new Map()
    let ans = 0
    let sum = 0
    for(let i of nums) {
        sum += i
        if(sum == goal) {
            ans++
        }
        if(hm.has(sum - goal)) {
            ans += hm.get(sum - goal)
        }
        if(hm.has(sum)) {
            hm.set(sum,hm.get(sum)+1)
        }else {
            hm.set(sum,1)
        }
    }
    // console.log(hm.keys())
    // console.log(hm.values())
    // console.log(hm.size)
    return  ans;
};

// var numSubarraysWithSum = function(nums, goal) {
//     let hm = {}
//     let ans = 0
//     let sum = 0
//     for(let i of nums) {
//         sum += i 
//         if(sum == goal) {
//             ans++
//         }
//         if(hm.hasOwnProperty(sum-goal)) {
//             ans += hm[sum-goal]
//         }
//         if(hm.hasOwnProperty(sum)) {
//             hm[sum] += 1
//         }
//         else{
//             hm[sum] = 1
//         }
//     }
//     console.log(Object.keys(hm))
//     console.log(Object.values(hm))
//     console.log(Object.keys(hm).length)
//     return ans
// }
let nums = [1,0,1,0,1]
let goal = 2
console.log(numSubarraysWithSum(nums,goal))