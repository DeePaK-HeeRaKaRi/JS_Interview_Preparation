//https://leetcode.com/discuss/post/1531556/coder-pad-round-goldman-sachs-by-rishmit-zopy/

var maxPathSum = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let dp = Array.from({length : m}, () => Array(n).fill(-1))
    function memo(i,j)  {
      
        if(i==0 && j==n-1) {
            return grid[i][j]
        }
        
        if(i<0 || j>=n) {
            return -Infinity
        }

        if(dp[i][j] != -1) return dp[i][j]

        let up = grid[i][j] + memo(i-1,j)
        let left =grid[i][j] + memo(i,j+1)

        let curr_res = Math.max(up,left)

        dp[i][j] = curr_res

        return curr_res
    }

    return memo(m-1,0)
}

let grid = [[0,0,0,0,5], //New_york finishes
            [0,1,1,1,0],
            [2,0,0,0,0]
        ]

console.log(maxPathSum(grid))