// https://leetcode.com/problems/flatten-deeply-nested-array/?envType=study-plan-v2&envId=30-days-of-javascript
const flat = function (arr, n) {
    let flatArr = function(arr,n,depth) {
        let flatten = []
        arr.forEach((item) => {
            if(Array.isArray(item) && depth<n) {
                let subArray = flatArr(item,n,depth+1);
                // flatten = [...flatten,...subArray] //this will take time so use push
                flatten.push(...subArray)
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
// let arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// let n = 1
let arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
let n = 2
console.log(flat(arr,n))

