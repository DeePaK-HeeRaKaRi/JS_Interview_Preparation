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

var largestRectangleArea = function(heights) {
    // arr =[2,1,5,6,2,3]
    // ns = [1,6,4,4,6,6]
    // ps =[-1,-1,1,2,1,4]
    let nse = find_NSE(heights)
    let pse = find_PSE(heights)
    let maxi = 0
    for(let i=0;i<heights.length;i++) {
        maxi = Math.max(maxi,heights[i]*(nse[i]-pse[i]-1))
    }

    return maxi
};

var largestReactangleArea_optimal = function(heights) {
    // ans = heights[i]*(nse[i]-pse[i]-1)
    let maxi = 0
    let stack = []
    for(let i=0;i<heights.length;i++) {
        // Find the PSE // [2,10,11,5] > so 11 > PSE = 10,NSE = 5. 10 > PSE = 2, NSE = 5

        while(stack.length>0 &&  heights[i] <= heights[stack[stack.length-1]]) {
            console.log(stack)
            let curr_height_index = stack.pop() //[10,11,5] 11 > 1
            let prev_index = stack.length > 0 ?  stack[stack.length -1]  : -1 //[10,11,5] > 0
            let next_index = i //[10,11,5] > 2

            let width = heights[curr_height_index] * (next_index - prev_index - 1)
            maxi = Math.max(maxi,width)
        }
        stack.push(i)
    }

    // Need to visit all the indexes ,heights[i]*(nse[i]-pse[i]-1)

    //  So here stack looks like [2,3] so pre_index = -1 next_index = heights.length
    //  Now It dont have next index so take the arr length
    let next_index = heights.length
    while(stack.length) {
        let curr_height_index = stack.pop() // [10,11,5] 11 >
        let prev_index = stack.length > 0 ?  stack[stack.length -1]  : -1
        let width = heights[curr_height_index] * (next_index - prev_index - 1)
        maxi = Math.max(maxi,width)
    }

    return maxi
}

let arr = [2,1,5,6,2,3]
arr = [3,2,10,11,5,10,6,3]
arr = [2,1,5,6,2,3]
// console.log(largestRectangleArea(arr))
console.log(largestReactangleArea_optimal(arr))