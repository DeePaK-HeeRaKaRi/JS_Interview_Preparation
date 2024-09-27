var flat = function (arr, n) {
    let flatArr = function(arr,n,depth) {
        let flatten = []
        arr.forEach((item) => {
            if(Array.isArray(item) && depth<n) {
                let subArray = flatArr(item,n,depth+1);
                flatten.push(...subArray)
                // flatten = [...flatten,...subArray]
            }
            else {
                flatten.push(item)
            }
        })
        return flatten;
    }
    if(n==0) return arr
    return flatArr(arr,n,0)
};
let arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
let n = 1

console.log(flat(arr,n))

// Output
// [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

// Explanation
// The subarrays starting with 4, 7, and 13 are all flattened. This is because their depth of 0 is less than 1. 
// However [9, 10, 11] remains unflattened because its depth is 1.