function HouseRobber(arr,k) {
    let n = arr.length

    let dp = Array.from({length : n}, () => Array(k+1).fill(-1))

    function memo(i,k) {
        if (k == 0) return 0; // No houses left to rob
        if (i == 0) return k === 1 ? arr[0] : Infinity; // Can only rob the first house if k == 1

        if(dp[i][k]!=-1) return dp[i][k]

        let pick = Infinity
        if(i-2 >= 0) {
            pick = Math.max(arr[i],memo(i-2,k-1))
        }
        else if(k==1){  // Here Only at index-1 and k should be 1
            pick = arr[i]
        }
        let notpick = memo(i-1,k)
        let currRes = Math.min(pick,notpick)
        dp[i][k] = currRes
        return currRes
    }

    function Tab() {
        let dp = Array.from({length : n}, () => Array(k+1).fill(0))  // if (k == 0) return 0; 
        // dp[0][1] = k === 1 ? arr[0] : Infinity;
      
        for(let i=0;i<=k;i++) {
            if(i == 1) {
                dp[0][i] = arr[0]
            }
            else {
                dp[0][i] = Infinity
            }
        }

        for(let i=1;i<n;i++) {
            for(let j=1;j<=k;j++) {
                let pick = Infinity
                if(i-2 >= 0 ) {
                    pick = Math.max(arr[i],dp[i-2][j-1])
                }
                else if(j==1){  // Here Only at index-1 and k should be 1
                    pick = arr[i]
                }
                let notpick = dp[i-1][j]
                let currRes = Math.min(pick,notpick)
                dp[i][j] = currRes
            }
        }
        console.log(dp)
        return dp[n-1][k]

    }


    function Space() {
        // dp[0][1] = k === 1 ? arr[0] : Infinity;
        let prev = new Array(k+1).fill(0)
        let curr = new Array(k+1).fill(0)
        for(let i=0;i<=k;i++) {
            if(i == 1) {
                prev[i] = arr[0]
            }
            else {
                prev[i] = Infinity
            }
        }

        for(let i=1;i<n;i++) {
            for(let j=1;j<=k;j++) {
                let pick = Infinity
                if(i-2 >= 0 ) {
                    pick = Math.max(arr[i],prev[j-1])
                }
                else if(j==1){  // Here Only at index-1 and k should be 1
                    pick = arr[i]
                }
                let notpick = prev[j]
                let currRes = Math.min(pick,notpick)
                curr[j] = currRes
            }
            prev = [...curr]
        }
        return prev[k]

    }
    // return memo(n-1,k)
    // return Tab()
    return Space()
}

let arr = [2,3,5,9]
let k = 2

console.log(HouseRobber(arr,k))