function missing_repeating_numbers(arr) {
     //x = repeating, y= missing
     let n = arr.length
     let SN = Math.floor(n*(n+1)/2)
     let S2N = Math.floor((n*(n+1)*(2*n+1))/6)

    let arr_sum = arr.reduce((prev,curr) => prev+curr ,0)
    let arr_sum2 = arr.reduce((prev,curr) => prev + (curr*curr) , 0)

    let val1 = SN - arr_sum // x-y
    let val2 = S2N - arr_sum2  // (x+y) (x-y) = x**2 - y**2

    val2 = Math.floor(val2 / val1) //x+y

    
    let x = Math.floor((val2 + val1) / 2) 
    let y = val2 - x  // x+y = val2 > y = val2 - x

    return [x,y]

    //TC - O(N)
}

let arr = [4, 3, 6, 2, 1, 1]
console.log(missing_repeating_numbers(arr))