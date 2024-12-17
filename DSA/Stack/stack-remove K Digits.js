var removeKdigits = function(num, k) {
    num = num.split('').map(i => Number(i))
    let st = []
    for(let i=0;i<num.length;i++) {
        while(st.length>0 && k!=0 && num[i] < st[st.length-1]) {
            st.pop()
            k--
        }
        st.push(num[i])
    }
    // console.log(st)
    st = st.slice(0,num.length-k)
    return `${st.join('')}`.replace(/^0+/,'') || '0'
};
let num = "1432219"
let k = 3
num = "112"
k = 1
console.log(removeKdigits(num,k))