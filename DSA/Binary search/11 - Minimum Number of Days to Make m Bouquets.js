var minDays = function(bloomDay, m, k) {
    function findPossibleDays(mid) {
        let total = 0
        let curr = 0
        for(let i of bloomDay) {
            if(mid >= i) {
                curr += 1
                if(curr == k) {
                    total++
                    curr = 0
                }
            }else {
                curr = 0
            }

            if(total >= m) {
                break
            }
        }
        return total
    }
    let totalDays = m * k
    if(bloomDay.length < totalDays) return -1

    let low = Math.min(...bloomDay)
    let high = Math.max(...bloomDay)

    // if(high < totalDays ) return -1  [1,1,1,1] m=3 k=1
    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        let target = findPossibleDays(mid)
        if(target < m) {
            low = mid +1
        }
        else {
            high = mid -1
        }
    }
    return low
};

let bloomDay = [1,10,2,9,3,8,4,7,5,6]
let k=2
let m=4

console.log(minDays(bloomDay,m,k))