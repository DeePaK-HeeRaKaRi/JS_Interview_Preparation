// https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1

function countSubsetSum(arr,target) {
    let n = arr.length;
    let dp = Array.from({length : n}, ()=>Array(target+1).fill(-1))

    function memo(i,tar) {

        if(i==0) {
            // tar==0 came from prev index and if arr[0] == 0 return 2 [0,0,1]
            if (tar == 0 && arr[0] == 0) {
                return 2;
            }
            if (tar == 0 || arr[0] == tar) {
                return 1;
            }
            return 0;
        } 

        if(dp[i][tar] != -1) {
            return dp[i][tar]
        }
        let notTake = memo(i-1,tar)

        let take = 0
        if( arr[i] <= tar ) {
            take = memo(i-1,tar-arr[i])
        }

        let currRes = take + notTake

        dp[i][tar] = currRes
        return currRes
    }

    function Tab() {
        let dp = Array.from({length : n}, ()=>Array(target+1).fill(0))

        //At index 0. the tar is 0 and arr[0] == 0 
        if(arr[0] == 0) {
            dp[0][0] = 2
        }
        else {
            dp[0][0] = 1
        }
        if(arr[0] <= target && arr[0] !== 0) {
            dp[0][arr[0]] = 1
        }
        for(let i=1;i<n;i++) {
            for(let tar=0;tar<=target;tar++) {
                let take = 0
                if(tar >= arr[i]) {
                    take = dp[i-1][tar-arr[i]]
                }
        
                let notTake = dp[i-1][tar]
                let currRes = take + notTake
                dp[i][tar] = currRes
            }
        }

        return dp[n-1][target]
    }

    function space() {
        let curr = new Array(target+1).fill(0)
        let prev = new Array(target+1).fill(0)
      
        if(arr[0] == 0 ) {
            prev[0] = 2
        }
        else {
            prev[0] = 1
        }
        if(arr[0] <= target && arr[0] !== 0) {
            prev[arr[0]] = 1
        }
        for(let i=1;i<n;i++) {
            for(let tar=0;tar<=target;tar++) {
                let take = 0
                if(tar >= arr[i]) {
                    take = prev[tar-arr[i]]
                }
        
                let notTake = prev[tar]
                let currRes = take + notTake
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

let arr = [5, 2, 3, 10, 6, 8]
let target = 10
arr = [0, 24];
target = 24
arr = [28, 4, 3, 27, 0, 24, 26];
target = 24;
console.log(countSubsetSum(arr,target))
 