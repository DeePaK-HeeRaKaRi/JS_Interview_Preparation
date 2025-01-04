
// dp(0): No plots → [] → 1 way (empty configuration).
 
// dp(1): One plot → 0, 1 → 2 ways.
 
// dp(2): Two plots → 00, 01, 10 → 3 ways.


function countHousePlacements(n) {
    const MOD = 1e9 + 7;
    const dp = new Array(n + 1).fill(-1);   
    
    function houseRobber_memo(i) {
        if (i < 0) return 0;  // No plots, no way to place houses
        if (i === 0) return 1;  // Base case: No plots, one way (empty)
        if (i === 1) return 2;  // Base case: One plot, two possibilities (empty or one house)
        
        if (dp[i] !== -1) return dp[i];   
        
       
        let pick = houseRobber_memo(i - 2);   
        let notPick = houseRobber_memo(i - 1);  
        
      
        dp[i] = (pick + notPick) % MOD;   
        
        return dp[i];
    }

    function houseRobber_space(n) {
        let prev2 = 1; // base case for dp[0]
        let prev1 = 2; // base case for dp[1]
        const MOD = 10**9 + 7;

        for (let i = 2; i <= n; i++) {
            let curr = (prev1 + prev2) % MOD; // the current number of ways
            prev2 = prev1; // update prev2
            prev1 = curr; // update prev1
        }
        return prev1; // the number of ways for one side
    }
    // const oneSide = houseRobber_memo(n);   
    const oneSide = houseRobber_space(n)
    return (oneSide * oneSide) % MOD;   
}


let n = 2
console.log(countHousePlacements(n)) // Output: 3