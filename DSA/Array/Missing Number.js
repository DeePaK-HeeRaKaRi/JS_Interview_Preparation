var missingNumber = function(nums) {
    let n = nums.length
    let sum = nums.reduce((prev,curr) => prev + curr,0)
    let sum_of_n_numbers = Math.floor((n*(n+1))/2)
    return sum_of_n_numbers -  sum
};
let nums = [9,6,4,2,3,5,7,0,1]
console.log(missingNumber(nums))
