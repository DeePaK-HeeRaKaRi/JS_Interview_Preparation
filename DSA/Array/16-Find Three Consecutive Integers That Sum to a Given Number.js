var sumOfThree = function (num) {
  // let range = Math.floor(num/3)
  // for(let i=range;i>=1;i--) {
  //     let sum = (i-1) + i +(i+1)
  //     if(sum==num) {
  //         return [i-1,i,i+1]
  //     }
  // }
  // return []

  let low = 0;
  // let high = num
  let high = Math.floor(num / 3); //At max the mid will lie in num/3
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let target = mid - 1 + mid + (mid + 1);
    if (target == num) {
      return [mid - 1, mid, mid + 1];
    } else if (target > num) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return [];

//   TC = o(log(n/3))
};

function sumOfThree_math(num) {
  // find mid
  // (mid-1) + mid +(mid+1) = 3mid = num > mid = num/3
  // let target = (mid-1) + mid +(mid+1)
  // 33%3 == 0 >> 33/3 = 11
  //4%3 !=0  4 / 3 = 1

  //   if (num % 3 != 0) return [];
  //   let mid = Math.floor(num / 3);
  //   return [mid - 1, mid, mid + 1];
}
let num = 33;
num = 6;
// num = 4
// num = 657594833
console.log(sumOfThree(num));
