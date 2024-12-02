function aggressiveCows(arr,cows) {
    arr = arr.sort((a,b) => a-b)
    function isPossibleDistance(mid) {
        // console.log({arr,mid})
        let prev_cow = arr[0]
        let count_cows = 1
        for(let i=1;i<arr.length;i++) {
            if( arr[i]-prev_cow  >= mid) {
                count_cows += 1
                prev_cow = arr[i]
            }

            if(count_cows >= cows) return true
        }

        if(count_cows < cows) return false
    }

    let low = 1
    let high = arr[arr.length-1] - arr[0] // At max we eed to find diff b/w two stalls and we have 2 cows
    let res = 0
    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        if(isPossibleDistance(mid)) {
            res = mid
            low = mid+1
        }
        else {
            high = mid -1
        }
    }
    return res
}

let arr = [1,2,4,8,9]
let cows = 3

console.log(aggressiveCows(arr,cows))