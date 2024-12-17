/**
 * @param {number[][]} mat
 * @return {number[]}
 */
// leetcode version has [[0,1,0,1,1]]
// gut gfg has [[0,0,1,1,1]]
var rowAndMaximumOnes = function(mat) {
    // function findMaxOnes(arr) {
    //     arr = arr.sort((a,b) => a-b)
    //     let n = arr.length
    //     let low = 0
    //     let high = n-1
    //     while(low <= high) {
    //         let mid = Math.floor((low + high) / 2)
    //         if(arr[mid] == 1) {
    //             high = mid - 1
    //         }
    //         else {
    //             low = mid + 1
    //         }
    //     }
    //     return n-low
    // }

    // let ans = 0
    // let prev_result = -1
    // for(let i=0; i < mat.length; i++) {
    //     let curr_result = findMaxOnes(mat[i])
    //     if(curr_result > prev_result) {
    //         ans = [i,curr_result]
    //         prev_result = curr_result
    //     }
    // }
    // return ans

    let maxCount = 0;
    let resultRow = 0;

    for (let i = 0; i < mat.length; i++) {
        let count = mat[i].reduce((sum, val) => sum + val, 0); // Count 1's in current row
        if (count > maxCount) {
            maxCount = count;
            resultRow = i;
        }
    }

    return [resultRow, maxCount];
};