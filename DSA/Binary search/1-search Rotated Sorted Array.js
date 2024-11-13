function searchSorted(nums,target) {
    let start = 0
    let end = nums.length - 1
    while(start <= end) {
        let mid = Math.floor((start + end) /2)
        
        if(nums[mid] == target) return mid
        // Find the sorted array
        // Than find the target
        if(nums[start] <= nums[mid]) {
            if(nums[start] <= target && target <= nums[mid]) {
                end = mid - 1
            }
            else {
                start = mid + 1
            }
        }
        else {
            if(nums[mid] <= target && target <= nums[end]) {
                start = mid+1
            }
            else {
                end = mid - 1
            }
        }
    }
    return -1
}
let nums = [4,5,6,7,0,1,2]
let target = 0
console.log(searchSorted(nums,target))