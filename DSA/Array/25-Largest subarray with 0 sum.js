function maxLen(arr) {
    let s = 0
    let hm = {}
    let maxi = 0
    for(let i=0; i< arr.length;i++) {
        s += arr[i]
        if(s == 0) {  // [-1,1,-1,1]
            maxi = Math.max(maxi, i+1)
        }else {
            if(s in hm) {
                maxi = Math.max(maxi, i-hm[s])
            }
            else {
                hm[s] = i
            }
        }
    }

    return maxi
}

let arr = [15,-2,2,-8,1,7,10,23]
arr = [2,10,4]
arr =[1, 0, -4, 3, 1, 0]
console.log(maxLen(arr))