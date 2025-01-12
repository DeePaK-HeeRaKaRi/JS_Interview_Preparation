function maxJump(stones) {
    let n = stones.length
    // checkCapability of the stone
    function checkCapability(maxCost) {
        let visited_stones = new Set()

        // Jump Forward

        visited_stones.add(stones[0])
        let prev_stone = stones[0]
        for(let i=1;i<n;i++) {
            // [0,2,5,6,7] > maxCost = 5. we can jump unitll index 1. once it exceds take the prev stone index.

            if(stones[i] - prev_stone > maxCost) {
                if(visited_stones.has(stones[i-1])) {
                    return false
                }
                prev_stone = stones[i-1]
                visited_stones.add(prev_stone)  // Eah stone should visit atmost once
            }
        }

        //Jump Backward

        visited_stones.delete(stones[0]) // remove stones[0] as we need to move from last to the first stone 
        prev_stone = stones[n-1]
        for(let i=n-2;i>=0;i--) {
            if(!visited_stones.has(stones[i])) { // Need to check only for the non visited stones
                if(prev_stone - stones[i] > maxCost) { // This means the cost has been exceeded
                    return false
                }
                prev_stone = stones[i]
            }
        }

        return true // the maxCost condition is satisfied by reaching first to last & last to first
    }

    let low = 1
    let high = stones[n-1] - stones[0]
    let res
    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        if(checkCapability(mid)) {
            res = mid
            high = mid-1
        }
        else {
            low = mid + 1
        }
    }

    return res
}

let stones = [0,2,5,6,7]
console.log(maxJump(stones))