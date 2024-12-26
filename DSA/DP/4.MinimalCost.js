// Same as 3-GeekJump


function frogJump(n, height, dp,k) {

    function frogJump_memo(i) {
        if (i === 0) return 0;
        if (dp[i] !== -1) return dp[i];
        // let left = frogJump_memo(i-1) + Math.abs(height[i] - height[i-1])
        // let right 
        // if(i>1) {
        //     right = frogJump_memo(i-2) + Math.abs(height[i] - height[i-2])
        // }
        // else {
        //     right = Infinity
        // }
        let mini = Infinity
        for(let j=1;j<=k;j++) {
            if(i-j>=0) {
                let jump = frogJump_memo(i-j) + Math.abs(height[i]-height[i-j])
                mini = Math.min(mini,jump)
            }
        }
        dp[i] = mini

        return dp[i]
    }

    function frogJump_tab(n) {
        dp[0] = 0
        for(let i=1 ;i<n;i++) {
            let mini = Infinity
            for(let j=1;j<=k;j++) {
                if(i-j>=0) {
                    let jump = dp[i-j] + Math.abs(height[i]-height[i-j])
                    mini = Math.min(mini,jump)
                }
            }
            dp[i] = mini
        }
        return dp[n-1]
    }

   

    // return frogJump_memo(n-1)
    return frogJump_tab(n)
}


let n = 5
let height = [10, 30, 40, 50, 20]
let k=3
let dp = new Array(n).fill(-1)
console.log(frogJump(n,height,dp,k))