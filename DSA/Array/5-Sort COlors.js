

var sortColors = function(nums) {
    // [0 to low-1] all 0's
    // [low to mid-1] all 1's
    // [mid to high-1]  0/1/2 >  need to sort
    // [high to n-1] all 2's
    let n= nums.length
    let l=0
    let m=0
    let h = n - 1
    while(m<=h) {
        if(nums[m] == 0) {
            [nums[l], nums[m]] = [nums[m], nums[l]]
            m++
            l++
        }
        else if(nums[m] == 1) {
            m++
        }
        else { 
            [nums[m],nums[h]] = [nums[h], nums[m]]
            h--
        }
    }
    return nums
};

let nums = [1,0,2,0]
console.log(sortColors(nums))