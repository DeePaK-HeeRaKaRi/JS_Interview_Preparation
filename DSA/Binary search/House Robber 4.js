let arr = [2,7,9,3,1]
let k = 2
let n =arr.length

// Dont sort the arr as it need to rob the adjacent homes
function checkCapability(target,k) {
    let i = 0
    while(i < n) {
        if(arr[i] <= target) { // check for the target that  is possible
            // console.log({target})
            i+=2 // refuses to steal from adjacent homes.
            k-=1 
            console.log({target,k})
        }
        else {
            i+=1
        }

        if(k == 0) return true
    }
    return false
}
let low = 1
let high = Math.max(...arr)
let ans 
while(low <= high) {
    
    let mid = Math.floor((low+high) / 2)
    console.log({low,high,mid})
    if(checkCapability(mid,k)) {  //min(max)
        console.log({mid})
        ans = mid
        high = mid - 1
    }
    else {
        low = mid + 1
    }
}

console.log(ans)