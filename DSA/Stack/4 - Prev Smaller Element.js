let nums = [4, 5, 2, 10, 8]
let n = nums.length
let st = []
let res = new Array(n).fill(-1)
for(let i=0;i<n;i++) {
    while(st.length && nums[i] <= st[st.length-1]) {
        st.pop()
    }

    if(st.length > 0) {
        res[i] = st[st.length-1]
    }
    st.push(nums[i])
}
console.log(res)


/*

Input 1:
    A = [4, 5, 2, 10, 8]
Output 1:
    G = [-1, 4, -1, 2, 2]

    */