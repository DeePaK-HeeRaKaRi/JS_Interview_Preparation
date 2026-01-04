// 845
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
    let left_dist = 0 
    let right_dist = 0
    let i = 1
    let ans = 0
    while(i < n) {
        left_dist = 0
        while(arr[i-1] < arr[i]) {
            i++
            left_dist++
        }
        /*
            arr = [2,1,4,7,3,2,5] at index = 4(7) left = 3 
            Now whenever we are counting for right we need to include the last element
        */
        if(left_dist) { 
            i--
        }

        right_dist = 0
        while(i<n && arr[i] > arr[i+1]) {
            i++
            right_dist++
        }

        if(left_dist && right_dist) {
            ans = Math.max(ans, left_dist+right_dist+1)
        }

        // if(left_dist == 0 || right_dist == 0) {
        //     i++
        // }
        i++
    }
    return ans
}
let arr = [2,1,4,7,3,2,5]
// arr = [2,2,2]
console.log(longestMountain(arr))