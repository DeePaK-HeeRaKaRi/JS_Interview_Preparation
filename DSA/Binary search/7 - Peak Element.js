function peak(nums) {
    let low= 0 
    let high = nums.length -1
    while(low <= high) {
        let mid = Math.floor((low+high) / 2)
        //ou may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
        if(mid == 0) {
            if(nums[0] >= nums[1]) {
                return nums[0]
            }
            else{
                return nums[1]
            }
        }else if(mid == nums.length - 1) {
            if(nums[nums.length - 1] >= nums[nums.length - 2]) {
                return nums[nums.length - 1]
            }else {
                return nums[nums.length - 2]
            }
        }
        if(nums[mid] > nums[mid+1] && nums[mid] < nums[mid-1]) {
            return mid
        }
        else if(nums[mid] <= nums[mid+1]) {
            low = mid + 1
        }
        else {
            high = mid - 1
        }
    }
}

let nums = [1,2,3,4,5,6,7]
console.log(peak(nums))