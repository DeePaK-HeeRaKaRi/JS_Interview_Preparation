
function squareRoot(n) {
    // return Math.floor(Math.sqrt(n))
    let low = 1
    let high = n
    while(low <= high) {
        let mid = Math.floor((low + high) / 2)
        let mul = mid * mid
        if(mul == n) return mid
        else if(mul < n ) {
            low = mid + 1
        }
        else {
            high = mid - 1
        }
    }
    return high
}

let n = 1
console.log(squareRoot(n))