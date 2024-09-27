function Insert_from_bottom(x) {
    if(st.length == 0) {
        st.push(x) // [3]  > [2]
    }
    else {
        let temp1 = st.pop() // [3]
        Insert_from_bottom(x) // [2]
        st.push(temp1) //[2,3]
    }
}

function reverse() {
    if(st.length > 0) {
        var temp = st.pop();
        reverse()
        Insert_from_bottom(temp)
    }
}

let st = [3,2,1,7,6]
reverse()
console.log(st)