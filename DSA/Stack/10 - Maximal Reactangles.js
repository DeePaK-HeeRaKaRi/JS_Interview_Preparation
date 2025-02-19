var largestReactangleArea_optimal = function(heights) {
    // ans = heights[i]*(nse[i]-pse[i]-1)
    let maxi = 0
    let stack = []
    for(let i=0;i<heights.length;i++) {
        // Find the PSE // [2,10,11,5] > so 11 > PSE = 10,NSE = 5. 10 > PSE = 2, NSE = 5

        while(stack.length>0 &&  heights[i] <= heights[stack[stack.length-1]]) {
            // console.log(stack)
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

let matrix = [["1","0","1","0","0"],
              ["1","0","1","1","1"],
              ["1","1","1","1","1"],
              ["1","0","0","1","0"]]
matrix =[["0","1"],["1","0"]]
let n = matrix.length
let m = matrix[0].length
let temp = new Array(m).fill(0)
console.log(temp)
let maxi = 0
for(let i=0;i<n;i++) {
    for(let j=0;j<m;j++) {
        temp[j] = matrix[i][j] == "1" ? temp[j]+Number(matrix[i][j]) : 0
    }
    maxi = Math.max(maxi, largestReactangleArea_optimal(temp))
}
console.log(maxi)

//TC > o(n*2m) sc > o(m)