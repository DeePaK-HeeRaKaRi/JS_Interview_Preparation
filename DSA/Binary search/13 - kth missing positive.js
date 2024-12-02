function kthmissingPositive(arr, k) {
    //Brute Force
    //[2,3,4,7,11]
    //[5,6,7,8,9] so 11 > 9  return k
    // for(let i of arr) {
    //     if( i<=k) {
    //         k++
    //     }
    //     else {
    //         break
    //     }
    // }
    // return k


    // [2,3,4,7,11]
    // [1,2,3,4,5,6,7,8,9,10,11]
    // [1,1,1,3,6]  > 3 > until 7 3 nubers are missing

    let low = 1
    let high = Math.max(...arr)
    while(low<=high) {
        let mid = Math.floor((low + high) / 2)
        let missingNumbers = arr[mid] - (mid + 1)
        if(missingNumbers <= k ) {
            low = mid + 1
        }
        else {
            high = mid - 1
        }
    }
    return low + k

    // arr[high] > 3 numbers are missing rmaiing 2 more required > arr[high]+(k-missingnumbers)
    //arr[high]+(k-missingnumbers)
    //arr[high]+(k-arr[high]-(high+1))
    //arr[high]+k-arr[high]+high+1 > low + k
}