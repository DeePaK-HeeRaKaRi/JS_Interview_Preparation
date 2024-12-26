function HouseRobber(n,arr,dp) {
   
    function houseRobber_space(arr) {
        console.log({arr})
        let prev1 = arr[0]
        let prev2 = 0
        let curr_ans = 0
        for(let i=1;i<arr.length;i++) {
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
    let first = arr.slice(0,n-1)
    let second = arr.slice(1)
    return Math.max(houseRobber_space(first), houseRobber_space(second))
}

let arr =  [2,100,9,3,1]
let n = arr.length
let dp = new Array(n+1).fill(-1)
console.log(HouseRobber(n,arr,dp))