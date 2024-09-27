var largestPerimeter = function(nums) {
    nums.sort((a,b) => a - b)
    let pref_sum = nums[0] + nums[1] //Contains atleast 3 elements
    let ans = -1

    // The longest side of a polygon is smaller than the sum of its other sides.
    for (let i=2;i<nums.length;i++) {
        if(nums[i] < pref_sum) {
            ans = pref_sum + nums[i]
        }
        pref_sum += nums[i]
    }
    return ans
};
let nums = [1,12,1,2,5,50,3]
nums = [3,7,16,21,42]
console.log(largestPerimeter(nums))