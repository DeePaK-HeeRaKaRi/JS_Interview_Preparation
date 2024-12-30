function MinimumPathSum(grid) {

    let m = grid.length
    let n = grid[0].length
    let dp = Array.from({length : m}, () => Array(n).fill(-1))
    function memo(i,j)  {
        if(i==0 && j==0) {
            return grid[i][j]
        }
        if(i<0 || j<0) {
            return Infinity
        }

        if(dp[i][j] != -1) return dp[i][j]

        let up = grid[i][j] + memo(i-1,j)
        let left =grid[i][j] + memo(i,j-1)

        let curr_res = Math.min(up,left)

        dp[i][j] = curr_res

        return curr_res
    }

    function Tab() {
        for(let i=0;i<m;i++) {
            for(let j=0;j<n;j++) {
                // console.log({i,j})
                if(i==0 && j==0) {
                    dp[i][j] = grid[i][j]
                }else{
                    let up = i>0 ? grid[i][j] +  dp[i-1][j] : Infinity
                    let left = j>0 ?grid[i][j] + dp[i][j-1] : Infinity
                    let curr_res = Math.min(up,left)
                    dp[i][j] = curr_res
                }
            }
        }
        return dp[m-1][n-1]
    }

    function Space() {
        let prev = new Array(n).fill(-1)
        let curr = new Array(n).fill(-1)
        for(let i=0;i<m;i++) {
            for(let j=0;j<n;j++) {
                // console.log({i,j})
                if(i==0 && j==0) {
                   curr[j] = grid[i][j]
                }else{
                    let up = i>0 ? grid[i][j] + prev[j] : Infinity
                    let left = j>0 ?grid[i][j] + curr[j-1] : Infinity
                    let curr_res = Math.min(up,left)
                    curr[j] = curr_res
                }
            }
            prev = [...curr]
        }
        return prev[n-1]
    }
    // return memo(m-1,n-1)
    // return Tab()
    return Space()
}

let grid = [[1,3,1],[1,5,1],[4,2,1]]
console.log(MinimumPathSum(grid))