
/*
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
*/

 
var singleElement = function(nums) {
    let n = nums.length
    if(n == 1) return nums[0]
    if(nums[0] != nums[1]) return nums[0]
    if(nums[n-1] != nums[n-2]) return nums[n-1]
    let low = 1
    let high = n-2
    while(low <= high) {
        const mid = Math.floor((low+high) / 2)
        if(nums[mid-1] != nums[mid] && nums[mid] != nums[mid+1]) {
            return nums[mid]
        }

        // left (even, odd)
        if((mid % 2 == 0 && nums[mid] == nums[mid+1]) || 
           (mid % 2 == 1 && nums[mid] == nums[mid-1])
        ) {
            low = mid+1
        }
        else {
            high = mid-1
        }
    }
    return -1
};

let nums = [1,1,2,3,3,5,5,7,7,8,9,9]

console.log(singleElement(nums))