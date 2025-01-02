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

let arr =  [5, 2, 6, 4]
let d = 3
arr = [1, 1, 1, 1], d = 0 
arr = [1, 2, 1, 0, 1, 3, 3], d = 11
arr = [1,3, 3,2,1], d = 5
let totalSum = arr.reduce((prev,cur) => prev+cur, 0)
let target = Math.floor((totalSum - d)/2)
console.log(target)
// If we get decimals than it is not possible to partition to both sides and if it is a negative we cannot partition
if((totalSum - d <0) || ((totalSum - d)%2) != 0) {
    console.log(0)
}else {
    console.log(countSubsetSum(arr,target))
}
