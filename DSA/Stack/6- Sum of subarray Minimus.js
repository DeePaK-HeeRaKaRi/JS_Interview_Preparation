function find_NSE(arr) {
    let stack = []
    let n = arr.length
    let nse = new Array(n).fill(0)
    for(let i=n-1;i>=0;i--) {
        while(stack.length && arr[i] <= arr[stack[stack.length-1]]) {
            stack.pop()
        }
        nse[i] = stack.length == 0 ? n : stack[stack.length-1] //n > Assume in right all the elements are <. curr elem = n > n-i > 7-3 = 4
        stack.push(i)
    }
    return nse
}

function find_PSE(arr) {
    let stack = []
    let n = arr.length
    let pse = new Array(n).fill(0)
    for(let i=0;i<n;i++) {
        while(stack.length && arr[i] < arr[stack[stack.length-1]]) {
            stack.pop()
        }
        pse[i] = stack.length == 0 ? -1 : stack[stack.length-1]  //-1 > Assume in left all the elements are < curr element so -1. 3-(-1) = 4
        stack.push(i)
    }
    return pse
}
var sumSubarrayMins = function(arr) {
    // Get indexes
    let nextSmallerElement = find_NSE(arr)
    let prevSmallerElement = find_PSE(arr) 
    let result = 0
    let prev
    let next
    let mod = Math.pow(10,9) + 7
    for(let i=0;i<arr.length;i++) {
        prev = i-prevSmallerElement[i] 
        next = nextSmallerElement[i]-i
        result += (arr[i] * prev * next) % mod
    }
    return result % mod
};

let arr = [3,1,2,4]
console.log(sumSubarrayMins(arr)) // 17