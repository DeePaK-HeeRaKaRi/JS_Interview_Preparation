function printSpiralMatrix(matrix) {
    let m = matrix.length
    let n = matrix[0].length
    let top = 0
    let down = m-1
    let left = 0
    let right = n-1
    let ans = []
    while((left<=right) && (top<=down)) {
        // Traverse from left to right
        for(let i=top;i<=right;i++) {
            ans.push(matrix[top][i])
        }

        top++  //next row

        // Traverse from top to bottom
        for(let j=top;j<=down;j++) {
            ans.push(matrix[j][right])
        }

        right-- // prev col

        // Traverse from right to left
        if(left<=right && top<=down ) {
            for(let i=right;i>=left;i--) {
                ans.push(matrix[down][i])
            }
            down-- //prev row
        }
       
        // Traverse from bottom to top
        if(top <= down && left<=right) {
            for(let i=down;i>=top;i--) {
                ans.push(matrix[i][left])
            }
    
            left++ //Next col
        }
    }

    return ans
}

let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
// matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
console.log(printSpiralMatrix(matrix))