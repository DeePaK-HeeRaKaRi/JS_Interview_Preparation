function maximumProductSubarray(nums) {
    let maxi = -Infinity
    let curr = 1
    for(let i=0;i<nums.length; i++) {
        curr = curr * nums[i]
        maxi = Math.max(maxi,curr)
        if(curr == 0) {
            curr = 1
        }
    }
    console.log({maxi})
    curr = 1
    for(let i=nums.length-1;i>=0; i--) {  // [0,2,4,5]
        curr = curr * nums[i]
        maxi = Math.max(maxi,curr)
        if(curr == 0) {
            curr = 1
        }
    }
    console.log({maxi})
    return maxi
}

let  nums = [2,3,-2,4] //6
nums = [-1,0,-2]
// nums = [-2]
console.log(maximumProductSubarray(nums))