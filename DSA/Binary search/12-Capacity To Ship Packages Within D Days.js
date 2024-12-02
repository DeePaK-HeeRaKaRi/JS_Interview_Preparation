var shipWithinDays = function(weights, days) {
    let high = weights.reduce((prev,curr) => prev + curr ,0)
    let low = Math.max(...weights)

    function possibleDays(mid) {
        let total_Days = 1
        let curr_Days_weight = 0
        for(let i of weights) {
            curr_Days_weight += i
            if(curr_Days_weight > mid) {
                total_Days++
                curr_Days_weight = i
            }
            // else {
            //     curr_Days_weight += i
            // }

            if(total_Days > days) return false
        }
        console.log({total_Days,mid})
        return true
    }

    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        if(possibleDays(mid)) {
            high = mid -1
        }
        else {
            low = mid + 1
        }
    }
    return low
};


let  weights = [1,2,3,4,5,6,7,8,9,10]
let days = 5

console.log(shipWithinDays(weights,days))