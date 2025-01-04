var minFallingPathSum = function(matrix) {
    let row = matrix.length
    let col = matrix[0].length
    let dp = Array.from({length: row}, ()=>Array(col).fill(-1))

    function memo(i,j) {
        if(j<0 || j >= col) {
            return Infinity
        }
        if(i==0) { //If return to the first row
            return matrix[0][j]
        }
        if(dp[i][j]!=-1) {
            return dp[i][j]
        }
        let up = matrix[i][j] +  memo(i-1,j)
        let up_left_diagonal = matrix[i][j] + memo(i-1,j-1)
        let up_right_diagonal = matrix[i][j] + memo(i-1,j+1)
        let currRes = Math.min(up,up_left_diagonal,up_right_diagonal)

        dp[i][j] = currRes

        return currRes
    }
    // let result = Infinity
    // for(let currCol = 0; currCol < col ; currCol++) {
    //     result = Math.min(result,memo(row-1,currCol))
    // }
    // return result


    function Tab() {

        for(let j=0;j<col;j++) {
            dp[0][j] = matrix[0][j]
        }

        for(let i=1;i<row;i++) {
            for(let j=0;j<col;j++) {
                let up = matrix[i][j] +  dp[i-1][j]
                let up_left_diagonal = j-1>=0 ?  matrix[i][j] + dp[i-1][j-1]  : Infinity 
                let up_right_diagonal = j+1<col ?  matrix[i][j] + dp[i-1][j+1] : Infinity 
                let currRes = Math.min(up,Math.min(up_left_diagonal,up_right_diagonal))
                dp[i][j] = currRes
            }
        }
        // console.log(dp , dp[row-1])
        return Math.min(...dp[row-1])
    }
    function space() {
        let curr = new Array(col).fill(-1)
        let prev = new Array(col).fill(-1)

        for(let j=0;j<col;j++) {
            prev[j] = matrix[0][j]
        }

        for(let i=1;i<row;i++) {
            for(let j=0;j<col;j++) {
                let up = matrix[i][j] +  prev[j]
                let up_left_diagonal = j-1>=0 ?  matrix[i][j] + prev[j-1]  : Infinity 
                let up_right_diagonal = j+1<col ?  matrix[i][j] + prev[j+1] : Infinity 
                let currRes = Math.min(up,Math.min(up_left_diagonal,up_right_diagonal))
                curr[j] = currRes
            }
            prev = [...curr]
        }
        return Math.min(...curr)
    }
    // return Tab()

    return space()
};

let  matrix = [[2,1,3],[6,5,4],[7,8,9]]
matrix = [[17,82],[1,-44]]
console.log(minFallingPathSum(matrix)) // Output: 13