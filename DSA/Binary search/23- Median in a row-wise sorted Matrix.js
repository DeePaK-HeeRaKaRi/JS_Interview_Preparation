//Given a row-wise sorted matrix where the number of rows and columns is always odd, find the median of the matrix.

function median(mat) {
    let row = mat.length
    let col = mat[0].length
    //[2,3,4,5,10] target=8 >total=4
    function countLess_than_equal_to_mid(arr,target) {
        let start = 0
        let end = col-1
        while(start <= end) {
            let mid = Math.floor((start + end) / 2)
            if(arr[mid] <= target) {
                start = mid+1
            }
            else {
                end = mid-1
            }
        }
        return start
    }
    let left = 1
    let right = 10**9
    while(left <= right) {
        let target = Math.floor((left + right) / 2)
        let count = 0
        for(let i=0;i<row;i++) {
            count += countLess_than_equal_to_mid(mat[i],target)
        }
        if(count <= Math.floor((row*col)/2)) {
            left = target+1
        }
        else {
            right = target-1
        }
    }
    return left

}

let mat = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]

console.log(median(mat))