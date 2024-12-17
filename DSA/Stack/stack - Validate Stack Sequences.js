var validateStackSequences = function(pushed, popped) {
    let st = []
    let t= 0
    for(let i=0;i<pushed.length;i++) {
        st.push(pushed[i])
        while(st.length >0 && st[st.length-1] == popped[t]) {
            st.pop()
            t++
        }
    }

    if(st.length == 0) return true
    return false
};

let pushed = [1,2,3,4,5]
let popped = [4,5,3,2,1]
pushed = [1,2,3,4]
popped = [4,3,2,1]

pushed = [1,2,3,4,5]
popped = [4,3,5,1,2]
console.log(validateStackSequences(pushed,popped))