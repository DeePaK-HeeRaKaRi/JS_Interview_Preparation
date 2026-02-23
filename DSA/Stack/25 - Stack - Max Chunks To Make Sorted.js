// node './Stack - Max Chunks To Make Sorted.js'
var maxChunksToSorted = function(arr) {
    let n = arr.length
    // in the stack maintain the max element in the top
    let st = [arr[0]]
    for(let i = 1; i<n ;i++) {
        if(st[st.length-1] < arr[i]) {
            st.push(arr[i])
        }else{
            let maxElement = st[st.length-1]
            while(arr[i] < st[st.length-1]) {
                st.pop()
            }
            st.push(maxElement) //We need to have to compare with the next element 
        }
    }
    // st=[2,0] => st=[2] 
    return st.length
};
let arr = [1,0,2,3,4]
arr = [4,3,2,1,0]
arr = [3,4,5,0,1,2]
arr = [0,1,2,3,4]
arr = [0,2,1]
arr = [2,1,3,4,4]
console.log(maxChunksToSorted(arr))