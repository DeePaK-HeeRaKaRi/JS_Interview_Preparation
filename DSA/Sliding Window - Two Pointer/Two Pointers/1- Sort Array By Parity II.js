

// var sortArrayByParityII = function(nums) {
//     let n = nums.length
//     let evenIndex = 0
//     let oddIndex = 1
//     for(let i = 0; i < n; i++){
//         if(i%2 == 0 ) {
//             if(nums[i]%2 == 0){
//                 [nums[evenIndex],nums[i]] = [nums[i],nums[evenIndex]]
//                 evenIndex+=2
//             }else{
//                 [nums[oddIndex],nums[i]] = [nums[i],nums[oddIndex]] 
//                 oddIndex+=2
//             }
//         }else{
//             if(nums[i]%2 == 0){
//                 [nums[evenIndex],nums[i]] = [nums[i],nums[evenIndex]]
//                 evenIndex+=2
//             }else{
//                 [nums[oddIndex],nums[i]] = [nums[i],nums[oddIndex]] 
//                 oddIndex+=2
//             }
//         }
//     }
//     console.log(nums)
// };

var sortArrayByParityII = function(nums) {
    // In que they mentions that nums contain half of the integers are odd & even
    let even_index = 0
    let odd_index = 1
    while(odd_index < nums.length) {
        if(nums[even_index] % 2 == 0) {
            even_index+=2
        }
        else if(nums[odd_index] % 2 == 1) {
            odd_index+=2
        }
        else {
            [nums[even_index], nums[odd_index]] = [nums[odd_index], nums[even_index]]
            even_index+=2
            odd_index+=2
        }
    }
    return nums
}
let nums = [4,2,5,7]
nums = [5,7,9,2,4,6]
// nums = [2,3]
console.log(sortArrayByParityII(nums))