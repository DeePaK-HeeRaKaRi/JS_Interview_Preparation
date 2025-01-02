function climb_memo(n,dp) {
    if(n <= 1) return 1 // 0 > 1, 1> 1
    if(dp[n]!=-1) return dp[n]
    let left = climb_memo(n-1,dp)
    let right = climb_memo(n-2,dp)
    let curr_res =  left + right
    dp[n] = curr_res
    return curr_res
}

function climb_tab(n,dp) {
     dp[0] = 1
     dp[1] = 1
     for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
     }
     return dp[n]
}

function climb_space_optimization(n) {
    if( n<=1) return 1
    let prev1 = 1
    let prev2 = 1
    let curr 
    for(let i=2;i<=n;i++) {
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    }
    return curr
}
let n = 3
let dp_array = new Array(n+1).fill(-1)
// console.log(climb_memo(n,dp_array))  //Tc - o(n) , sc > o(n)[recursion stackspace] + o(n)
console.log(climb_tab(n,dp_array)) //Tc - o(n) , sc >  o(n)
// console.log(climb_space_optimization(n))
