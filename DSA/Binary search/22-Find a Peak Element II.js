var findPeakGrid = function(matrix) {
    let row = matrix.length
    let col = matrix[0].length
    function findMaxElement(matrix,mid) {
        let max = -Infinity
        let curr_row = 0
        for(let i=0; i<row;i++) {
            if(matrix[i][mid] > max) {
                max = matrix[i][mid]
                curr_row = i
            }
        }
        return curr_row
    }
  
    let start = 0
    let end = col-1
    while(start <= end) {
        let curr_col_mid = Math.floor((start + end) / 2)
         //If you find the max element on a particulat col, than max element will be greater than up and bottom, and return that row index
        let cur_row_max = findMaxElement(matrix,curr_col_mid)
        let left = curr_col_mid-1 >=0 ? matrix[cur_row_max][curr_col_mid-1]  : -1
         let right = curr_col_mid+1 < col ? matrix[cur_row_max][curr_col_mid+1] : -1
         if(matrix[cur_row_max][curr_col_mid] > left && matrix[cur_row_max][curr_col_mid] > right) {
            return [cur_row_max,curr_col_mid]
         }
         //The maximum element in the middle column is smaller than the left neighbor, meaning the left side has higher potential to contain a peak.
         else if(matrix[cur_row_max][curr_col_mid] < left) {
            end = curr_col_mid-1
         }
         else {
            start = curr_col_mid+1
         }
    }
    return [-1,-1]
};

let mat = [[10,20,15],[21,30,14],[7,16,32]]
mat = [[4,2,5,1,4,5],
       [2,9,3,2,3,2],
        [1,7,6,0,1,3],
        [3,6,3,3,7,2]]
console.log(findPeakGrid(mat))