var countSubarrays = function(nums, k) {
    let l=0
    let r =0
    let n = nums.length
    // let maxi = Math.max(...nums)
    let maxi = nums.reduce((a,b) => Math.max(a,b),0)
    console.log(maxi)
    let maxi_count = 0
    let ans = 0
    while(r<n) {
        if(nums[r] == maxi) {
            maxi_count++
        }
        while(maxi_count >= k) {
            ans += n-r
            if(nums[l] == maxi){
                maxi_count-=1
            }
            l++
        }
        r++
    }
    console.log(ans)
    return ans
};

let nums = [4,3,2,3,3,4,2,4,3]
let k = 2
nums = [1,3,2,3,3]
k = 2
nums = [1,4,2,1]
k = 3
console.log(countSubarrays(nums,k))