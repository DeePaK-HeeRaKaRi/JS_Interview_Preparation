function rodCutting(price) {
    // The size will rage from 1 to N
    // The sum of pieces cut should be equal to length n. [1 based Indexing]
 
    let rodLength = price.length
    let dp = Array.from({length : rodLength}, () => Array(rodLength+1).fill(-1))

    function memo(i,total_pieces) {

        if( i == 0) {
            return total_pieces * price[0]  // Pick multiple times
        }
        if(dp[i][total_pieces] != -1) {
            return dp[i][total_pieces] 
        }
        let notPick = memo(i-1,total_pieces)
        let pick = -Infinity
        let currRodLength = i+1
        if(currRodLength <= total_pieces) { // The sum of pieces cut should be equal to length n. [1 based Indexing]
            pick = price[i] + memo(i, total_pieces - currRodLength)
        }

        let curr_res = Math.max(pick, notPick)
        dp[i][total_pieces] = curr_res
        return curr_res
    }

    function Tab() {
        let dp = Array.from({length : rodLength}, () => Array(rodLength+1).fill(0))
        for(let i = 1; i <= rodLength; i++) {
            dp[0][i] = i * price[0]
        }

        for(let i=1 ;i<rodLength; i++) {
            for(let total_pieces=1; total_pieces<=rodLength; total_pieces++) {
                let notPick = dp[i-1][total_pieces]
                let pick = -Infinity
                let currRodLength = i+1
                if(currRodLength <= total_pieces) { // The sum of pieces cut should be equal to length n. [1 based Indexing]
                    pick = price[i] + dp[i][total_pieces - currRodLength]
                }
        
                let curr_res = Math.max(pick, notPick)
                dp[i][total_pieces] = curr_res
            }
        }

        return dp[rodLength-1][rodLength]
    }
    // return memo(rodLength-1,rodLength)

    return Tab()
}

let price =  [1, 5, 8, 9, 10, 17, 17, 20]
price = [3, 5, 8, 9, 10, 17, 17, 20]
// price = [1, 10, 3, 1, 3, 1, 5, 9]
console.log(rodCutting(price))