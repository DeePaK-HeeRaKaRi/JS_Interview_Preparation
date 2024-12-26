function frogJump(n, height, dp) {

    function frogJump_memo(i) {
        if (i === 0) return 0;
        if (dp[i] !== -1) return dp[i];
        let left = frogJump_memo(i-1) + Math.abs(height[i] - height[i-1])
        let right 
        if(i>1) {
            right = frogJump_memo(i-2) + Math.abs(height[i] - height[i-2])
        }
        else {
            right = Infinity
        }
        dp[i] = Math.min(left, right)

        return dp[i]
    }

    function frogJump_tab(n) {
        dp[0] = 0
        for(let i=1 ;i<n;i++) {
            let left = dp[i-1] + Math.abs(height[i] - height[i-1])
            let right 
            if(i>1) {
                right = dp[i-2] + Math.abs(height[i] - height[i-2])
            }
            else {
                right = Infinity
            }
            dp[i] = Math.min(left, right)
        }
        return dp[n-1]
    }

    function frogJump_space(n) {
        let prev2 = 0
        let prev = 0
        let curr
        for(let i=1 ;i<n;i++) {
            let left = prev + Math.abs(height[i] - height[i-1])
            let right 
            if(i>1) {
                right =prev2 + Math.abs(height[i] - height[i-2])
            }
            else {
                right = Infinity
            }
           curr = Math.min(left, right)
           prev2 = prev
           prev = curr
        }
        return prev
    }

    // return frogJump_memo(n-1)
    // return frogJump_tab(n)
    return frogJump_space(n)
}


let n = 4
let height = [10,20,30,10]
let dp = new Array(n).fill(-1)
console.log(frogJump(n,height,dp))