// var sortArrayByParityII = function(nums) {
//     let n = nums.length
//     let evenIndex = 0
//     let oddIndex = 1
//     let ans = new Array(n).fill(-1)
//     for(let i = 0; i < n; i++){
//         if(i%2 == 0 ) {
//             if(nums[i]%2 == 0){
//                 ans[evenIndex] = nums[i]
//                 evenIndex+=2
//             }else{
//                 ans[oddIndex] = nums[i]
//                 oddIndex+=2
//             }
//         }else{
//             if(nums[i]%2 == 0){
//                 ans[evenIndex] = nums[i]
//                 evenIndex+=2
//             }else{
//                 ans[oddIndex] = nums[i]
//                 oddIndex+=2
//             }
//         }
//     }
//     console.log(ans)
// };

var sortArrayByParityII = function(nums) {
    let n = nums.length
    let evenIndex = 0
    let oddIndex = 1
    for(let i = 0; i < n; i++){
        if(i%2 == 0 ) {
            if(nums[i]%2 == 0){
                [nums[evenIndex],nums[i]] = [nums[i],nums[evenIndex]]
                evenIndex+=2
            }else{
                [nums[oddIndex],nums[i]] = [nums[i],nums[oddIndex]] 
                oddIndex+=2
            }
        }else{
            if(nums[i]%2 == 0){
                [nums[evenIndex],nums[i]] = [nums[i],nums[evenIndex]]
                evenIndex+=2
            }else{
                [nums[oddIndex],nums[i]] = [nums[i],nums[oddIndex]] 
                oddIndex+=2
            }
        }
    }
    console.log(nums)
};
let nums = [4,2,5,7]
// nums = [2,3]
console.log(sortArrayByParityII(nums))