var duplicateZeros = function(arr) {
    let zeros_count = 0
    arr.forEach((val) => {
        if(val==0) {
            zeros_count++
        }
    })
    if(zeros_count == 0) return arr
    let arr_len = arr.length
    for(let i=arr_len - 1; i>=0 ; i--) {
        if(zeros_count + i <  arr_len ){
            arr[zeros_count + i] = arr[i]
        }
        if(arr[i] == 0) {
            zeros_count-=1
            if(zeros_count + i < arr_len) {
                arr[zeros_count + i] = arr[i]
            }
        }
    }
    return arr

};

let arr = [1,0,2,3,0,4,5,0]
arr = [1,2,3]
console.log(duplicateZeros(arr))