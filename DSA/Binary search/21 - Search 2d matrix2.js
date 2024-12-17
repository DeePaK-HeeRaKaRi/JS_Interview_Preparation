//  Do binary search on each row > TC -o(nlogm)


function searchmatrix(matrix,target) {
    //start from in first row and lastcol mat[0][col-1]
    // or from lastrow in firt col  mat[row-1][0]
    // So that it will be in increasing
    let row = matrix.length
    let col = matrix[0].length

    let n = 0
    let m = col-1

    while(n<row && m>=0) {
        if(matrix[n][m] == target){
            return true
        }
        else if(target < matrix[n][m]) {
            m-=1
        }
        else {
            n+=1
        }
    }
    return false

    // tc > o(row+col)
}

let matrix = [[1,4,7,11,15],
              [2,5,8,12,19],
              [3,6,9,16,22],
              [10,13,14,17,24],
              [18,21,23,26,30]]
let target = 50

console.log(searchmatrix(matrix, target))