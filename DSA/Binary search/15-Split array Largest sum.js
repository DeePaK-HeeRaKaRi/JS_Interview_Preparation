var splitArray = function(nums, k) {
    function countSum(mid) {
        let sum = 0
        let total = 0
        for(let i of nums) {
            sum += i
            if(sum >= mid) {
                total += 1
                sum = i
            }
            if(total >=k) {
                return true
            }
        }
        return false
    }

    let low = Math.max(...nums) // [1,4] k=2 > at max largest =4
    let high = nums.reduce((a,b) => a+b,0) 
    let res = low   // [1,4,4] 
    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        if(countSum(mid)) { // minimized largest sum of the split.
            res = mid
            low = mid +1
            // high = mid - 1
        }
        else{
            high = mid - 1
            // low = mid +1
        }
    }

    return res
};


let nums = [1,2,3,4,5]
let k=2

console.log(splitArray(nums,k))