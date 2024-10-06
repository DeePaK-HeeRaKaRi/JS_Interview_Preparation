function maxSubarray(nums) {
    if(nums.length == 1) return nums[0]
    let s = 0
    let ans = nums[0]
    for(let i of nums){
        s+=i
        ans = Math.max(s,ans)
        if(s < 0) {
            s = 0
        }
        
    }
    
    return ans  
}

function print_maxSubarry(nums) {

    let s = 0
    let ans = -Infinity
    let start = -1
    let end = -1
    let start_temp = 0
    for(let i=0;i<nums.length;i++) {

        // if(s==0) start_temp = i
        s+= nums[i]
        if(s>ans) {
            ans = s
            start=start_temp
            end = i
        }
        if(s<0) {
            s = 0
            start_temp = i+1  //Next start index
        }
    }

    console.log(nums.slice(start,end+1))
}

let nums =  [-2,1,-3,4,-1,2,1,-5,4]
// nums = [-2,-1]
// nums = [-5,6,7,8,-10]
// console.log(maxSubarray(nums))

print_maxSubarry(nums)

