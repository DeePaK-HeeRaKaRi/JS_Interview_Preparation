var removeDuplicates = function(nums) {
    let prev = nums[0]
    let cnt = 1
    let l = 1
    for(let r=1;r<nums.length;r++) {
        if(nums[r]!=prev) {
            nums[l] = nums[r]
            l+=1
            cnt=1
            prev = nums[r]
        }
        else if(cnt < 2) {
            nums[l] = nums[r]
            l+=1
            cnt+=1
        }
    }
    return l
};
let nums = [0,0,1,1,1,1,2,3,3]
console.log(removeDuplicates(nums))
