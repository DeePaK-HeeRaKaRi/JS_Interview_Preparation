var maximumCandies = function(candies, k) {

    function check_CandiesDistribution(target) {
        let count = 0; 
        // Note all child should receive the same candies
        for(let i of candies) {
            count += Math.floor(i / target)
            // if(prev == curr) {
            //     count ++
            // }
            if(count>=k) return true
        }
        return false
    }
    let total_candies = candies.reduce((prev,curr) => prev+curr, 0)
    console.log(total_candies)
    if(k > total_candies) return 0

    let start = 1
    // let end = total_candies
    let end = Math.max(...candies)
    let result = 0
    while(start <= end) {
       
        let mid = Math.floor((start + end) / 2)
        let checkCandiesDistribution = check_CandiesDistribution(mid)
        if(checkCandiesDistribution) {
            result = mid
            start = mid + 1 //We need maximum number of candies
        }
        else {
            end = mid - 1
        }
        console.log({start,end})
    }
    return result
};

let candies = [5,8,6]
let k = 3
// candies = [2,5], k = 11
candies = [4,7,5]
k = 4
console.log(maximumCandies(candies, k))