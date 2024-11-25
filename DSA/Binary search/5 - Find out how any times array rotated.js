function kthrotation(nums) {
    let low=0
    let high=nums.length - 1
    if(nums.length == 1 || nums[low] < nums[high]) return 0
    //No duplicate numbers
 
    let ans = Infinity
    let index = Infinity
    while(low <= high) {
        let mid = Math.floor((low+high) / 2)
        console.log(nums[low], nums[high])
        if(nums[low] <= nums[high]) {
            // ans = Math.min(ans,nums[low])
            if(nums[low] <= ans) {
                ans = nums[low]
                index = low
                // return index
            }
            break
        }
        if(nums[low] <= nums[mid]) {
            // ans = Math.min(ans,nums[l])
            if(nums[low] < ans) {
                ans = nums[low]
                index = low
            }
            low = mid+1
        }
        else {
            // ans = Math.min(ans,nums[mid])
            if(nums[mid] < ans) {
                ans = nums[mid]
                index = mid
            }
            high = mid-1
        }
    }
    console.log({ans,index})
    return index
}

let nums = [1,2,3,4,5]

nums = [3,4,5,1,2]
nums = [41, 48, 8 ,10 ,20, 30 ,34 ,35]
console.log(kthrotation(nums))