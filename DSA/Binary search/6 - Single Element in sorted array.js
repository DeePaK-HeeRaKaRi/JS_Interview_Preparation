function singleElement(nums) {
    let low = 0
    let high = nums.length - 1

    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        if(mid % 2 == 0) {
            // [1,1,2,3,3,5,5,7,7,8,9,9]
            if(nums[mid] == nums[mid+1] ) {
                low = mid+1
            }
            else{
                high = mid - 1
            }
        }
        else {
            if(nums[mid] == nums[mid+1] ) {
                high = mid-1
            }
            else{
                low = mid+1
            }
        }
    }

    return nums[low]
}

let nums = [1,1,2,3,3,5,5,7,7,8,9,9]

console.log(singleElement(nums))