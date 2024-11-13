
function mergeSortedArray(arr1,arr2) {
    let m = arr1.length
    let n = arr2.length
    let k = m+n-1

    let i=m-1
    let j=n-1

    while(i>=0 && j>=0) {
        console.log('arr')
        if(arr1[i] < arr2[j]) {
            arr1[k] = arr2[j]
            j--
        }
        else{
            arr1[k] = arr1[i]
            i--
        }
        k--
    }
    console.log({i,j})
    while( j>=0) {
        arr1[k] = arr2[j]
        j--
        k--
    }

    while(i>=0) {
        arr1[k] = arr1[i]
        i--
        k--
    }
    return arr1
}





let arr1 = [1,3,5,7]

let arr2 = [0,2,6,8,9]

arr1 = [1, 3, 5, 7]
arr2 =[0, 2, 6, 8, 9]

console.log(mergeSortedArray(arr1,arr2))