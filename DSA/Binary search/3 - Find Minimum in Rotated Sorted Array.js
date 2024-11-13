var findMin = function(nums) {
    let start = 0
    let end = nums.length - 1
    if(nums.length == 1) return nums[0]
    
    //No duplicate numbers
    if(nums[start] < nums[end]) return nums[start]
    let ans = Infinity
    while(start <= end) {
        if(nums[start] <= nums[end]) return Math.min(ans,nums[start])

        let mid = Math.floor((start + end) / 2)
        //[6,7,1,2,3,4,5]
        // left portion is sorted so eliminate and move towards right
        if(nums[start] <= nums[mid]) {
            ans = Math.min(ans,nums[start])
            start = mid + 1
        }
        //Right portion is sorted take min as mid and eliminate right 
        else {
            ans = Math.min(ans,nums[mid])
            end = mid-1
        }
    }
    return ans
};


let nums = [4,5,6,7,0,1,2]

console.log(findMin(nums))