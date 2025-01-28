var countNiceSubarrays = (nums,k) => {
    // Same as sum of subarrays equal to k
    // k > odd no.s continous
    // convert odd to 1 and even to 0

    for(let i=0;i<nums.length;i++) {
        if(nums[i]%2===0) {
            nums[i] = 0
        }
        else {
            nums[i] = 1
        }
    }
    //  [1,1,2,1,1] > [1,1,0,1,1]
    let hm = new Map()
    let ans = 0
    let sum = 0
    for(let i of nums) {
        sum += i
        if(sum == k) {
            ans++
        }
        if(hm.has(sum - k)) {
            ans += hm.get(sum - k)
        }
        if(hm.has(sum)) {
            hm.set(sum,hm.get(sum)+1)
        }else {
            hm.set(sum,1)
        }
    }
    return  ans;
}
let nums = [1,1,2,1,1]
let k = 3

console.log(countNiceSubarrays(nums,k))