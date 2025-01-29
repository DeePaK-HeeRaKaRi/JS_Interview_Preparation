// var subarraysWithKDistinct = function(nums, k) {
//     // Find subarray count <=k >> k,k-1  > equal
//     let l=0
//     let r= 0
//     let hm=  {}
//     let count = 0
//     while(r < nums.length) {
//         if(hm.hasOwnProperty(nums[r])) {
//             hm[nums[r]]+=1
//         }
//         else {
//             hm[nums[r]] = 1
//         }

//         while(Object.keys(hm).length > k) {
//             hm[nums[l]]-=1
//             if(hm[nums[l]] == 0) delete hm[nums[l]]
//             l++
//         }

//         count += r-l+1
//         r++
//     }
//     return count
// };

// IF Gets TLE due to Object.keys().length than use a another variable instead for hm length
var subarraysWithKDistinct = function(nums, k) {
    var subarraysWith_lessThanK = function(nums, k) {
        // Find subarray count <=k >> k,k-1  > equal
        let l=0
        let r= 0
        let hm=  {}
        let count = 0
        let hmLength = 0
        while(r < nums.length) {
            if(hm.hasOwnProperty(nums[r])) {
                hm[nums[r]]+=1
            }
            else {
                hm[nums[r]] = 1
                hmLength++
            }

            while(hmLength > k) {
                hm[nums[l]]-=1
                if(hm[nums[l]] == 0) {
                    delete hm[nums[l]]
                    hmLength--
                } 
                l++
                
            }

            count += r-l+1
            r++
        }
        return count
    };
    return subarraysWith_lessThanK(nums,k) - subarraysWith_lessThanK(nums, k-1)
};
let nums = [1,2,1,2,3]
let k = 2
console.log(subarraysWithKDistinct(nums,k) - subarraysWithKDistinct(nums,k-1))