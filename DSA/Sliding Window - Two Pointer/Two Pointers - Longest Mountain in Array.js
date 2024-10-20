// node './Two Pointers - Longest Mountain in Array.js'

// var longestMountain = function(arr) {
//     let n = arr.length
//     let left = new Array(n).fill(0)
//     let right = new Array(n).fill(0)
//     let ans = 0
//     // from left to right compare the curent index elemnt with the previous element [increasing order]
//     for(let i=1;i<n;i++){
//         if(arr[i-1] < arr[i]){
//             left[i] = left[i-1]+1
//         }
//     }

//     // from right to left compare the  current index with next index element [decreasing order]
//     for(let i=n-2;i>=0;i--){
//         if(arr[i] > arr[i+1]) {
//             right[i] = right[i+1]+1
//         }

//         if(left[i] && right[i]) {
//             ans=Math.max(ans,left[i]+right[i]+1)
//         }
//     }
    
//     // for(let i=0;i<n;i++){
//     //     if(left[i] && right[i]) {
//     //         ans=Math.max(ans,left[i]+right[i]+1)
//     //     }
//     // }
//     return ans
// };

var longestMountain = function(arr) {
    let n = arr.length
    let i=1
    let ans = 0
    let left = 0
    let right = 0
    while(i<n) {
        left=0
        while(arr[i-1]<arr[i]) {
            left+=1
            i++
        }
        if(left){ // [2,1,4,7,3,2,5] assume now the current index is 4, where the above condition fails,  so we need to travers from previous index
            i-=1
        }
        right=0
        while(i+1<n && arr[i]>arr[i+1]){
            right+=1
            i++
        }
        console.log(left,right)
        if(left && right){
            ans = Math.max(ans,left+right+1)
        }
        if(left==0 || right==0){  //[2,2,2] we need to increase i
            i++
        }
    }
    return ans
}
let arr = [2,1,4,7,3,2,5]
// arr = [2,2,2]
console.log(longestMountain(arr))