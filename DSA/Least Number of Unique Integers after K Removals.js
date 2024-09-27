var findLeastNumOfUniqueInts = function(arr, k) {
    let hm = new Map()
    arr.forEach((val,i) => {
        if(hm.has(val)) {
            hm.set(val,hm.get(val)+1)
        } else {
            hm.set(val,1)
        }
    })
    let cnt = 0
    let ans = 0
    let i = 0
    // Sorted based on values
    let sorted_hm = Array.from(hm.entries()).sort((a,b) => a[1] - b[1])
    console.log(sorted_hm)
    for(let [key,value] of sorted_hm) {
        cnt += value
        i+=1
        if(cnt > k ) {
            // ans++
            return sorted_hm.length - i
        }
        console.log(value,cnt,ans)
    }
    return ans
};
let arr = [4,3,1,1,3,3,2]
let k = 3
arr = [5,5,4]
k=1
arr = [5,5,5,5]
k = 3
console.log(findLeastNumOfUniqueInts(arr,k))