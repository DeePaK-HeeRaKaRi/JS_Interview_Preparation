var findMin = function(nums) {
    let start = 0
    let end = nums.length - 1
    if(nums.length == 1) return nums[0]
    
    //No duplicate numbers
    if(nums[start] < nums[end]) return nums[start]
    let ans = Infinity
    while(start <= end) {
       
        
        
        let mid = Math.floor((start + end) / 2)
        if(nums[start] == nums[mid] && nums[mid]== nums[end]) {
            ans = Math.min(ans,nums[start])
            start++
            end--
        }

        // if(nums[start] < nums[end]) return Math.min(ans,nums[start]) not required > fails for [3,1,3]
        //[6,7,1,2,3,4,5]
        // left portion is sorted so eliminate and move towards right
        else if(nums[start] <= nums[mid]) {
            ans = Math.min(ans,nums[start])
            // ans = Math.min(ans,nums[mid])
            start = mid + 1
        }
        //Right portion is sorted take min as mid and eliminate right 
        else {
            ans = Math.min(ans,nums[mid])
            // ans = Math.min(ans,nums[end])
            end = mid-1
        }
    }
    return ans
   
};


let nums = [2,2,2,0,1]

nums = [3,1,3]
console.log(findMin(nums))