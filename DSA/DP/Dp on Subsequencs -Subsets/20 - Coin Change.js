
function coinChange(coins,amount) {
    let n = coins.length
    let dp = Array.from({length : n+1}, () => Array(amount+1).fill(-1))

    function memo(i,target) {
        if( i== 0) {
            if(target % coins[0] == 0) return target / coins[0]

            return Infinity
        }
        if(dp[i][target] != -1) return dp[i][target]

        let notPick = 0 + memo(i-1,target)
        let pick = Infinity
        if(coins[i] <= target) {
            pick = 1 + memo(i,target-coins[i])
        }

        let curr_res = Math.min(notPick,pick)
        dp[i][target] = curr_res
        return curr_res
    }

    function Tab() {
        let dp = Array.from({length : n+1}, () => Array(amount+1).fill(0))
        for(let tar = 1 ; tar <= amount ; tar++) {
            if(tar % coins[0] == 0) {
                dp[0][tar] = tar / coins[0]
            }
            else {
                dp[0][tar] = Infinity
            }
        }

        for(let i=1;i<n;i++) {
            for(let target = 1 ;target<= amount; target++) {
                let notPick = 0 + dp[i-1][target]
                let pick = Infinity
                if(coins[i] <= target) {
                    pick = 1 + dp[i][target-coins[i]]
                }
        
                let curr_res = Math.min(notPick,pick)
                dp[i][target] = curr_res
            }
        }
        return dp[n-1][amount]
    }

    function space() {
        let prev = new Array(amount+1).fill(0)
        let curr = new Array(amount+1).fill(0)
        for(let tar = 1 ; tar <= amount ; tar++) {
            if(tar % coins[0] == 0) {
                prev[tar] = tar / coins[0]
            }
            else {
                prev[tar] = Infinity
            }
        }

        for(let i=1;i<n;i++) {
            for(let target = 1 ;target<= amount; target++) {
                let notPick = 0 + prev[target]
                let pick = Infinity
                if(coins[i] <= target) {
                    pick = 1 + curr[target-coins[i]]
                }
        
                let curr_res = Math.min(notPick,pick)
                curr[target] = curr_res
            }
            prev = [...curr]
        }
        return prev[amount]
    }
    // return memo(n-1,amount)
    // return Tab()
    return space()
}

let coins = [1,2,5]
let amount = 11
// coins = [2]
// amount = 3
let res = coinChange(coins, amount)

if(res == Infinity) {
    console.log(-1)
}
else {
    console.log(res)
}
