function minimumTotal(nums) {

    let m = nums.length
    let n = nums[m-1].length
    let dp = []
    for(let i=0;i<m;i++) {
        dp[i] = new Array(i+1).fill(-1)
    }
    // console.log(dp)

    function memo(i,j) {
        // if it is a last row then return the last row element
        if(i == m-1) {
            return nums[i][j]
        }
        if(dp[i][j] != -1) return dp[i][j]
        let down = nums[i][j] + memo(i+1,j)
        let down_right = nums[i][j] + memo(i+1,j+1)
        let currRes = Math.min(down, down_right)

        dp[i][j] = currRes
        return currRes
    }

    function Tab() {
        for(j=0;j<n;j++) {
            dp[m-1][j] = nums[m-1][j]
        }
        for(i = m-2; i>=0; i--) {
            for(j=i;j>=0;j--) {
                let down = nums[i][j] + dp[i+1][j]
                let down_right = nums[i][j] + dp[i+1][j+1]
                let currRes = Math.min(down, down_right)
        
                dp[i][j] = currRes
            }
        }
        return dp[0][0]
    }


    function space() {
        let front = new Array(n+1).fill(-1)
        let curr = new Array(n+1).fill(-1)
        for(j=0;j<n;j++) {
            front[j] = nums[m-1][j]
        }
        for(i = m-2; i>=0; i--) {
            for(j=i;j>=0;j--) {
                let down = nums[i][j] + front[j]
                let down_right = nums[i][j] + front[j+1]
                let currRes = Math.min(down, down_right)
        
                curr[j] = currRes
            }
            front = [...curr]
        }
        return front[0]
    }
    // return memo(0,0)
    // return Tab()
    return space()
}

let nums = [[2],[3,4],[6,5,7],[4,1,8,3]]

console.log(minimumTotal(nums))