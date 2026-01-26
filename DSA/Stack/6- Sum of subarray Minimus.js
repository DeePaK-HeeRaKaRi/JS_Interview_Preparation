 
var sumSubarrayMins = function(arr) {
     
    let mod = Math.pow(10,9) + 7
    let n = arr.length
    let left_smaller_count_arr = new Array(n).fill(0)
    let res = 0
    let stack = []
    let count = 0
    // Left smaller element
    for(let i=0;i<n;i++) {
        count=1
        while(stack.length && arr[i] <= stack[stack.length-1][0]) {
            count += stack[stack.length-1][1]
            stack.pop()
        }

        left_smaller_count_arr[i] = count
        stack.push([arr[i],count])
    }

    while(stack.length) {
        stack.pop()
    }
    //Right smaller element count
    //  Avoid right smaller count arr
    for(i=n-1;i>=0;i--) {
        count=1
        while(stack.length && arr[i] < stack[stack.length-1][0]) {
            count += stack[stack.length-1][1]
            stack.pop()
        }

        stack.push([arr[i],count])
        res += (arr[i] * left_smaller_count_arr[i] * count) % mod
    } 
    return res % mod
};

let arr = [3,1,2,4]
console.log(sumSubarrayMins(arr)) // 17