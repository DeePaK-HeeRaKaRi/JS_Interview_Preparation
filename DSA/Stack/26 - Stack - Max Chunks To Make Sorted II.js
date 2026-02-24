// node './Stack - Max Chunks To Make Sorted II.js'

var maxChunksToSorted = function(arr) {
    //Always maintain the max element in the top
    let n = arr.length
    let stack = [arr[0]]
    for(let i = 1; i<n; i++) {
        let max_element = stack[stack.length-1]
        if(arr[i] >= max_element) {
            stack.push(arr[i])
        }
        else {
            while(arr[i] < stack[stack.length-1]) {
                stack.pop()
            }
            stack.push(max_element)
        }
    }
    return stack.length

};
let arr = [2,1,3,4,4]
console.log(maxChunksToSorted(arr))