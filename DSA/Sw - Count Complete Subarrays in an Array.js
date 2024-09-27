var countCompleteSubarrays = function(nums) {
    // let hm_nums = {}
    // for(let i of nums) {
    //     if(hm_nums.hasOwnProperty(i)){
    //         hm_nums[i] += 1
    //     }
    //     else{
    //         hm_nums[i] = 1
    //     }
    // }
    let hm_nums= new Set(nums).size
    let hm_subArray = {}
    let l=0
    let r=0
    let count = 0
    while(r < nums.length) {
        if(hm_subArray.hasOwnProperty(nums[r])) {
            hm_subArray[nums[r]] += 1
        }
        else{
            hm_subArray[nums[r]] = 1
        }
        while(Object.keys(hm_subArray).length == hm_nums){
            count += nums.length - r 
            hm_subArray[nums[l]] -= 1
            if(hm_subArray[nums[l]] == 0) {
                delete hm_subArray[nums[l]]
            }
            l+=1
        }
        r++
    }
    return count
};
let nums = [1,3,1,2,2]
nums = [5,5,5,5]
console.log(countCompleteSubarrays(nums))