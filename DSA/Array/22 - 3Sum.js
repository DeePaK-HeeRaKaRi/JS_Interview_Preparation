function threesum(arr) {
    let sum = 0
    arr.sort((a,b) => a-b)
    // let ans = new Set()
    let ans = []
    for(let i=0;i<arr.length-2;i++) {
        // let s = arr[i]
         // Skip duplicate values for `i`
        if (i > 0 && arr[i] === arr[i - 1]) continue;

        let j = i+1
        let k = arr.length-1
        while(j<k) {
            let s = arr[i] + arr[j] + arr[k]
            console.log(s)
            if(s == 0) {
                // ans.add(`[${arr[i]},${arr[j]},${arr[k]}]`)
                // ans.add(JSON.stringify([arr[i],arr[j],arr[k]]))
                ans.push([arr[i],arr[j],arr[k]])
                while(j < k && arr[j] == arr[j+1]) {
                    j++
                }
                while(j < k && arr[k] == arr[k-1]) {
                    k--
                }
                j++
                k--
            }
            else if(s <0) {
                j++
            }
            else {
                k--
            }
        }
    }
    // return Array.from(ans).map(i => JSON.parse(i))
    return ans
}

let arr = [-1,-1,-1,0,2,2]
console.log(threesum(arr))