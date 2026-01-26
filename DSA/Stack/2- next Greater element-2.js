var nextGreaterElements = function(nums) {
    // Cyclic

    let n = nums.length
    let st = []
    let res = new Array(n).fill(-1)
    for(let i=(2*n)-1;i>=0;i--) {
        while(st.length && nums[i%n] >= st[st.length-1]) {
            st.pop()
        }

        if(st.length > 0) {
            res[i%n] = st[st.length-1]
        }
        st.push(nums[i%n])
    }
    return res
};

let n=[1,2,3,4,3]
console.log(nextGreaterElements(n))

/*

Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]

*/