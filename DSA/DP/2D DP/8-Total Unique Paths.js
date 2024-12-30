function TotalUniquePaths(m,n) {

    let dp = Array.from({length : m}, () => Array(n).fill(-1))
    function memo(i,j)  {
        if(i==0 && j==0) {
            return 1
        }
        if(i<0 || j<0) {
            return 0
        }

        if(dp[i][j] != -1) return dp[i][j]

        let up = memo(i-1,j)
        let left = memo(i,j-1)

        let curr_res = up+left

        dp[i][j] = curr_res

        return curr_res
    }

    function Tab() {
        for(let i=0;i<m;i++) {
            for(let j=0;j<n;j++) {
                // console.log({i,j})
                if(i==0 && j==0) {
                    dp[i][j] = 1
                }else{
                    let up = i>0 ?   dp[i-1][j] : 0
                    let left = j>0 ? dp[i][j-1] : 0
                    let curr_res = up+left
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
                   curr[j] = 1
                }else{
                    let up = i>0 ?   prev[j] : 0
                    let left = j>0 ? curr[j-1] : 0
                    let curr_res = up+left
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

let m = 3
let n= 7
console.log(TotalUniquePaths(m,n))