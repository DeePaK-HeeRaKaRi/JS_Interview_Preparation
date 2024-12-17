
var searchMatrix = function(matrix, target) {
    let row_len = matrix.length
    let col_len = matrix[0].length
    let low = 0
    let high = (row_len * col_len) - 1
    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        let curr_row =Math.floor(mid/col_len)
        let curr_col = Math.floor(mid % col_len)
        console.log({curr_row , curr_col})
        let curr = matrix[curr_row][curr_col]
        if(curr == target) {
            return true
        }
        if(curr < target) {
            low = mid + 1
        }
        else {
            high = mid - 1
        }
    }
    return false
};

let matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
let target = 3
matrix = [[1,1]]
target = 2
console.log(searchMatrix(matrix, target)) // Output: true