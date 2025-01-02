function fib_memo(n,dp) {
    if(n <= 1) return n
    if(dp[n]!=-1) return dp[n]
    
    let curr_res = fib_memo(n-1,dp) + fib_memo(n-2,dp)
    dp[n] = curr_res
    return curr_res
}

function fib_tab(n,dp) {
     dp[0] = 0
     dp[1] = 1
     for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
     }
     return dp[n]
}

function fib_space_optimization(n) {
    let prev1 = 1
    let prev2 = 0
    let curr 
    for(let i=2;i<=n;i++) {
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    }
    return curr
}
let n = 5
let dp_array = new Array(n+1).fill(-1)
// console.log(fib_memo(n,dp_array))  Tc - o(n) , sc > o(n)[recursion stackspace] + o(n)
// console.log(fib_tab(n,dp_array)) //Tc - o(n) , sc >  o(n)
console.log(fib_space_optimization(n))
