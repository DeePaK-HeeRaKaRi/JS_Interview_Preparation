function HouseRobber(n,arr,dp) {
    function houseRobber_memo(i) {
        if( i<0 ) return 0
        if(i==0 ) return arr[0]
        if(dp[i] != -1) return dp[i]
       
        let pick = arr[i] + houseRobber_memo(i-2)
        let notPick = 0 + houseRobber_memo(i-1)
        let curr_ans = Math.max(pick,notPick)
        dp[i] = curr_ans
        return curr_ans
    }


    function houseRobber_tab() {
        
        dp[0] = arr[0]
        for(let i=1;i<n;i++) {
            let pick = 0
            if(i-2>=0) {
                 pick = arr[i] + dp[i-2]
            }else {
                pick = arr[i] 
            }
            let notPick = 0 + dp[i-1]
            let curr_ans = Math.max(pick,notPick)
            dp[i] = curr_ans
        }
        console.log({dp})
        return dp[n-1]
    }

    function houseRobber_space() {
        let prev1 = arr[0]
        let prev2 = 0
        let curr_ans = 0
        for(let i=1;i<n;i++) {
            let pick = 0
            if(i-2>=0) {
                 pick = arr[i] + prev2
            }else {
                pick = arr[i]
            }
            let notPick = 0 + prev1
            curr_ans = Math.max(pick,notPick)
            // dp[i] = curr_ans
            prev2 = prev1
            prev1 = curr_ans    
        }
        return prev1
    }
    // return houseRobber_memo(n-1)
    // return houseRobber_tab()
    return houseRobber_space()
}

let arr =  [2,100,9,3,1]
let n = arr.length
let dp = new Array(n+1).fill(-1)
console.log(HouseRobber(n,arr,dp))