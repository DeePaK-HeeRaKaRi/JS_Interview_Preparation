var maxAbsoluteSum = function(nums) {
    let ans = nums[0]
    if(nums.length == 1) return Math.max(ans,Math.abs(ans))
    // Same as kadens algo
    let max_sum = 0
    let min_sum = 0
    let s1 = -Infinity
    let s2 = Infinity
    let ans_arr = []
    for(let i of nums) {
        ans_arr.push(i)
        console.log({ans_arr})
        max_sum +=i
        s1 = Math.max(s1,max_sum)  //Find max sum

        if(max_sum < 0) {
            max_sum = 0
            ans_arr = []
        }

        min_sum +=i
        s2 = Math.min(s2,min_sum)  //Find Min sum

        if(min_sum>0) {
            min_sum = 0
            ans_arr=[]
        }
    }
    console.log({s1,s2,ans_arr})

    return Math.max(s1,Math.abs(s2))
};

let nums = [1,-3,2,3,-4]
nums = [2,-5,1,-4,3,-2]
// nums = [-5]
console.log(maxAbsoluteSum(nums))