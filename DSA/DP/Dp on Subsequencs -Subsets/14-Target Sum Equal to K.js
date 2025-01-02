// https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1

function isSubsetSum(arr,target) {
    let n = arr.length;
    let dp = Array.from({length : n}, ()=>Array(target+1).fill(-1))

    function memo(i,tar) {
        if (tar == 0) return true;
        if(i==0) {
            return tar-arr[0] == 0 
        }
        if(dp[i][tar] != -1) {
            return dp[i][tar]
        }
        let take = false
        if(tar >= arr[i]) {
            take = memo(i-1,tar-arr[i])
        }

        let notTake = memo(i-1,tar)

        let currRes = take || notTake

        dp[i][tar] = currRes
        return currRes
    }


    function Tab() {
        let dp = Array.from({length : n}, ()=>Array(target+1).fill(false))
        for (let i = 0; i < n; i++) {
            dp[i][0] = true
        }
        if(target >= arr[0]) {
            dp[0][arr[0]] = true
        }
        
        for(let i=1;i<n;i++) {
            for(let tar=1;tar<=target;tar++) {
                let take = false
                if(tar >= arr[i]) {
                    take = dp[i-1][tar-arr[i]]
                }
        
                let notTake = dp[i-1][tar]
                let currRes = take || notTake
                dp[i][tar] = currRes
            }
        }

        return dp[n-1][target]
    }

    function space() {
        let curr = new Array(target+1).fill(false)
        let prev = new Array(target+1).fill(false)
        prev[0] = true
        curr[0] = true
        if(target >= arr[0]) {
            prev[arr[0]] = true
        }
        
        for(let i=1;i<n;i++) {
            for(let tar=1;tar<=target;tar++) {
                let take = false
                if(tar >= arr[i]) {
                    take = prev[tar-arr[i]]
                }
        
                let notTake = prev[tar]
                let currRes = take || notTake
                curr[tar] = currRes
            }
            prev = [...curr]
        }
        return prev[target]
    }

    // return memo(n-1,target)
    // return Tab()
    return space()
}

let arr = [3, 34, 4, 12, 5, 2]
let target = 9
console.log(isSubsetSum(arr,target))
 