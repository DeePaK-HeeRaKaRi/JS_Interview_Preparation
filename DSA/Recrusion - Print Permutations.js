var permute = function(nums) {
    function printPermutations(nums,arr,hm) {
        if(arr.length == nums.length) {
            ans.push([...arr])
            return;
        }
        for(let i=0;i<nums.length;i++) {
            if(hm[i] == 1) {
                hm[i] = 0
                arr.push(nums[i])
                printPermutations(nums,arr,hm)
                arr.pop()
                hm[i] = 1
            }
        }
    }
    var ans = []
    var hm = new Array(nums.length).fill(1)
    printPermutations(nums,[],hm)
    console.log(ans)
};
let nums = [1,2,3]
permute(nums)