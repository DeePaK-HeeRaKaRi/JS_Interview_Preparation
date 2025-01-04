var longestCommonSubsequence = function(s1, s2) {
    let n = s1.length
    let m = s2.length
    let dp = Array.from({length : n+1}, () => Array(m+1).fill(-1))
    function memo(i,j) {
        if(i==0 || j==0) {
            return 0
        }

        if(dp[i][j] != -1) return dp[i][j]

        if(s1[i-1] == s2[j-1]) {
            let pick = 1 + memo(i-1,j-1)
            dp[i][j] = pick
            return pick
        }
        
        let np1 =0 + memo(i-1,j)
        let np2 = 0 + memo(i,j-1)
        let curr_res = Math.max(np1, np2)
        dp[i][j] = curr_res
        return curr_res
    }

    function Tab() {
        let dp = Array.from({length : n+1}, () => Array(m+1).fill(0))
        for(let i=1;i<=n;i++) {
            for(let j=1;j<=m;j++) {
                if(s1[i-1] == s2[j-1]) {
                    let pick = 1 + dp[i-1][j-1]
                    dp[i][j] = pick
                }
                else {
                    let np1 =0 + dp[i-1][j]
                    let np2 = 0 + dp[i][j-1]
                    let curr_res = Math.max(np1, np2)
                    dp[i][j] = curr_res
                }
                
            }
        }
        return dp[n][m]
    }

    function space() {
        let prev_row = Array(m+1).fill(0)
        let curr_row = Array(m+1).fill(0)
        for(let i=1;i<=n;i++) {
            for(let j=1;j<=m;j++) {
                if(s1[i-1] == s2[j-1]) {
                    let pick = 1 +prev_row[j-1]
                    curr_row[j] = pick
                }
                else {
                    let np1 =0 + prev_row[j]
                    let np2 = 0 + curr_row[j-1]
                    let curr_res = Math.max(np1, np2)
                    curr_row[j] = curr_res
                }
            }
            prev_row = [...curr_row]
        }
        return curr_row[m]
    }
    // return memo(n,m)

    // return Tab()
    return space()
};


let s1 = "abcde"
let s2 = "ace" 
console.log(longestCommonSubsequence(s1,s2))