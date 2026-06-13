var minDays = function(bloomDay, m, k) {
    function isPossibleBouquetsCount(targetDay) {
        let adjCount = 0
        let bouquetCount = 0
        for(let currDay of bloomDay) {
            if(currDay <= targetDay) {
                adjCount += 1
                if(adjCount == k) {
                    bouquetCount += 1
                    adjCount = 0
                }
            }
            else {
                adjCount = 0
            }

            if(bouquetCount >=m ) return true
        }
        return false
    }

    let required_days = m * k
    if(bloomDay.length < required_days) return -1
    let low = Math.min(...bloomDay)
    let high = Math.max(...bloomDay)
    while(low <= high) {
        const mid = Math.floor((low+high) / 2)
        if(isPossibleBouquetsCount(mid)) {
            high = mid - 1
        }
        else {
            low = mid + 1
        }
    }
    return low
};

let bloomDay = [1,10,2,9,3,8,4,7,5,6]
let k=2
let m=4

console.log(minDays(bloomDay,m,k))