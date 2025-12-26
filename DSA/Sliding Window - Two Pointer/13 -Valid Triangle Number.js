// node './Two Pointers - BS -Valid Triangle Number.js'
// var triangleNumber = function(nums) {
//     let ans = 0
//     for(let l=0;l<nums.length-2;l++) {
//         for(let r=l+1;r<nums.length-1;r++){
//             for(let i=r+1;i<nums.length;i++){
//                 if(nums[l]+nums[r]>nums[i]){
//                     ans++
//                 }else{
//                     break
//                 }
//             }
//         }
//     }
//     return ans
// };

var triangleNumber = function (nums) {
  // a+b>c , b+c>a, a+c>b
  // so instead of checking all the combinations, we can check only the combinations where a+b>c by doing sorting
  nums = nums.sort((a, b) => a - b);
  let ans = 0;
  for(let i=2;i<nums.length;i++) {
    let l = 0
    let r = i-1
    while(l<r){
        if(nums[l] + nums[r] > nums[i]) {
            ans += (r-l)
            r--
        }else{
          l++
        }
    }
  }
  return ans;
};
let nums = [2, 6, 7, 8, 16, 21];
nums = [4,2,3,4]
console.log(triangleNumber(nums));
