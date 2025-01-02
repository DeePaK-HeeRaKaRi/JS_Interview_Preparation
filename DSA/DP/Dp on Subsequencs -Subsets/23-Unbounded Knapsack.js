//https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=knapsack-with-duplicate-items

function knapsack(weights,values,capacity) {
    let n = weights.length;
    let dp = Array.from({length : n},() =>Array(capacity+1).fill(-1))

    function memo(i,curr_weight) {
        if(i == 0) {
            if(weights[0] <= curr_weight) return Math.floor(curr_weight / weights[0]) * values[0]
            return 0
        }

        if(dp[i][curr_weight] != -1) return dp[i][curr_weight]

        let not_pick = memo(i-1,curr_weight)
        let pick = 0
        if(weights[i] <= curr_weight) {
            pick = values[i] + memo(i,curr_weight - weights[i])
        }

        let curr_max = Math.max(pick,not_pick)
        dp[i][curr_weight] = curr_max

        return curr_max
    }

    function Tab(){ 
        let dp = Array.from({length : n},() =>Array(capacity+1).fill(0))
        for(let curr_weight = weights[0];curr_weight <= capacity ;curr_weight++) {
            dp[0][curr_weight] =  Math.floor(curr_weight / weights[0]) * values[0]
        }

        for(let i=1;i<n;i++) {
            for(let curr_weight = 0;curr_weight <= capacity;curr_weight++) {
                let not_pick =dp[i-1][curr_weight]
                let pick = 0
                if(weights[i] <= curr_weight) {
                    pick = values[i] +dp[i][curr_weight - weights[i]]
                }

                let curr_max = Math.max(pick,not_pick)
                dp[i][curr_weight] = curr_max
            }
        }
        return dp[n-1][capacity]
    }

    function space() {
        let prev = new Array(capacity+1).fill(0)
        let curr = new Array(capacity+1).fill(0)
        for(let curr_weight = weights[0];curr_weight <= capacity ;curr_weight++) {
            prev[curr_weight] =  Math.floor(curr_weight / weights[0]) * values[0]
        }

        for(let i=1;i<n;i++) {
            for(let curr_weight = 0;curr_weight <= capacity;curr_weight++) {
                let not_pick =prev[curr_weight]
                let pick = 0
                if(weights[i] <= curr_weight) {
                    pick = values[i] +curr[curr_weight - weights[i]]
                }

                let curr_max = Math.max(pick,not_pick)
                curr[curr_weight] = curr_max
            }
            prev = [...curr]
        }
        return prev[capacity]
    }
    return memo(n-1,capacity)
    // return Tab()
    // return space()
}

let capacity = 8
let val =  [6, 1, 7, 7]
let wt = [1, 3, 4, 5]
// val= [6, 8, 7, 100], wt= [2, 3, 4, 5], capacity = 1
val = [1, 1], wt = [2, 1], capacity = 3
console.log(knapsack(wt,val,capacity)) // Output: 4