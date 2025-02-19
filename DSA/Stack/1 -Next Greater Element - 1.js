var nextGreaterElement = function(nums1, nums2) {
    let n = nums2.length
    let st = []
    let hm = {}
    for(let i=n-1;i>=0;i--) {
        while(st.length && nums2[i] >= st[st.length-1]) {
            st.pop()
        }
        if(st.length == 0) {
            hm[nums2[i]] = -1
        }
        else {
            hm[nums2[i]] = st[st.length-1]
        }
        st.push(nums2[i])
    }

    let res =[]
    for(let i of nums1) {
        res.push(hm[i])
    }
    return res
};
let nums1 = [4,1,2]
let nums2 = [1,3,4,2]
nums1 = [2,4], nums2 = [1,2,3,4]
console.log(nextGreaterElement(nums1,nums2))