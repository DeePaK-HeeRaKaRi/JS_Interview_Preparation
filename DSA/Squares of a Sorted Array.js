var sortedSquares = function(nums) {
    let  n = nums.length
    let left = 0
    let right = n - 1
    let res = new Array(n).fill(-1)

    let i = n-1 //Sorted in non - descreasing order
    while(left <= right) {
        let left_number = nums[left] * nums[left]
        let right_number = nums[right] * nums[right]

        if(left_number < right_number) {
            res[i] = right_number
            right -= 1
        }
        else {
            res[i] = left_number
            left += 1
        }

        i--
    }

    return res
};
let nums = [-7,-3,2,3,11]
console.log(sortedSquares(nums))