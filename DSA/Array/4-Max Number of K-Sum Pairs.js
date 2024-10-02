var maxOperations = function(nums, k) {
    let hm ={}
    let c = 0
    //  > Need pairs let say [1,2]
    //  Have a hm store count of element , 
    // So that we can track allthe pairs 
    for(let i=0;i<nums.length;i++) {
        let target = k-nums[i]
        if(hm.hasOwnProperty(target) && hm[target] > 0) {
            // delete hm[target]
            // If you found target pair decrement the target
            hm[target]--
            c++
        } else{
            hm[nums[i]] = (hm[nums[i]] || 0 ) + 1
        }
        console.log(hm)
    }
    return c
};


let nums = [2,5,4,4,1,3,4,4,1,4,4,1,2,1,2,2,3,2,4,2]
let k = 3

nums = [3,1,3,4,3]
k = 6
console.log(maxOperations(nums,k))