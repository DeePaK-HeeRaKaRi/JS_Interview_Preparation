// node './Two Pointers - Minimum Swaps to Group All 1s Together II.js'
// var minSwaps = function(nums) {
//     let l = 0
//     let r = 0
//     let ans = Infinity
//     let zeros = 0
//     let ones = 0
//     for(let i of nums) {
//         if(i == 1){
//             ones++
//         }
//     }
//     console.log('-----ones',ones)
//     nums = [...nums,...nums] //Circular array > first element is adjacent to last element
//     console.log('-------nums length',nums.length)
//     let currDistance = 0
//     while(r<nums.length){
//         if(nums[r] == 0){
//             zeros++
//         }
//         currDistance = r-l+1
//         // To swap atleast we need how many ones are present
//         if(currDistance>=ones &&  currDistance - zeros <= ones){ // so we can swap and it will become ones subarray
//             ans = Math.min(ans,zeros)
//             if(nums[l] == 0){
//                 zeros--
//             }
//             l++
//         }
//         r++
//     }
//     return ans
// };

var minSwaps = function(nums) {
    let l = 0
    let r = 0
    let ans = Infinity
    let ones = 0
    for(let i of nums) {
        if(i == 1){
            ones++
        }
    }
    if(ones == 0) return 0
    nums = [...nums,...nums] //Circular array > first element is adjacent to last element
    let zeroCount = 0
    let oneCount = 0
    while(r<nums.length){
        if(nums[r] == 0){
            zeroCount++
        }else{
            oneCount++
        }
        // To swap atleast we need how many ones are present
        if(zeroCount+oneCount == ones){ // so we can swap and it will become ones subarray
            ans = Math.min(ans,zeroCount)
            if(nums[l] == 0){
                zeroCount--
            }else{
                oneCount--
            }
            l++
        }
        r++
    }
    return ans
}
let nums = [0,1,0,1,1,0,0]
// nums = [0,1,1,1,0,0,1,1,0]
// nums = [1,1,0,0,1]
// nums = [1,0,0,1,0,0,1,0]
nums = [1,1,1,0,0,1,0,1,1,0]
console.log(minSwaps(nums))