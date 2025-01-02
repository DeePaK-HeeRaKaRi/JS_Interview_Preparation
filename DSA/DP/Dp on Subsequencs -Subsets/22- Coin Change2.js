//  Return the number of coins that you can make


function coinChange(coins,amount) {
    let n = coins.length
    let dp = Array.from({length : n+1}, () => Array(amount+1).fill(-1))

    function memo(i,target) {
        if( i== 0) {
            if(target % coins[0] == 0) return 1

            return 0
        }
        if(dp[i][target] != -1) return dp[i][target]

        let notPick = 0 + memo(i-1,target)
        let pick = 0
        if(coins[i] <= target) {
            pick =  memo(i,target-coins[i])
        }

        let curr_res = pick + notPick
        dp[i][target] = curr_res
        return curr_res
    }

    function Tab() {
        let dp = Array.from({length : n+1}, () => Array(amount+1).fill(0))
        for(let tar = 0 ; tar <= amount ; tar++) {
            if(tar % coins[0] == 0) {
                dp[0][tar] = 1
            }
            else {
                dp[0][tar] = 0
            }
        }

        for(let i=1;i<n;i++) {
            for(let target = 0 ;target<= amount; target++) {
                let notPick = 0 + dp[i-1][target]
                let pick = 0
                if(coins[i] <= target) {
                    pick =  dp[i][target-coins[i]]
                }
        
                let curr_res = pick + notPick
                dp[i][target] = curr_res
            }
        }
        return dp[n-1][amount]
    }

    function space() {
        let prev = new Array(amount+1).fill(0)
        let curr = new Array(amount+1).fill(0)
        for(let tar = 0 ; tar <= amount ; tar++) {
            if(tar % coins[0] == 0) {
                prev[tar] = 1
            }
            else {
                prev[tar] = 0
            }
        }

        for(let i=1;i<n;i++) {
            for(let target = 0 ;target<= amount; target++) {
                let notPick = 0 + prev[target]
                let pick = 0
                if(coins[i] <= target) {
                    pick = curr[target-coins[i]]
                }
        
                let curr_res = notPick+pick
                curr[target] = curr_res
            }
            prev = [...curr]
        }
        return prev[amount]
    }
    // return memo(n-1,amount)
    return Tab()
    // return space()
}

let coins = [1,2,5]
let amount = 5
// amount = 3, coins = [2]
// coins = [2]
// amount = 3
let res = coinChange(coins, amount)
 
console.log(res)

