var rotate = function(nums, k) {
    // if k=7 and n= 7 so no rotations are required
    // if k = 8  and n=7 only 1 rotation is required
    let n= nums.length
    k = k%n  // k > n 

    function reverse(nums,l,r) {
        while(l<r){
            [nums[l],nums[r]] = [nums[r],nums[l]]
            l++
            r--
        }
    }

    reverse(nums,0,n-k-1)   //4,3,2,1
    reverse(nums,n-k,n-1)
    reverse(nums,0,n-1)

    console.log(nums)

};

let nums = [1,2,3,4,5,6,7]
let k = 3

rotate(nums,k)