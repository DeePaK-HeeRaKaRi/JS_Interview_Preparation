// var isPowerOfTwo = function(n) {
//     for(let i=0;i<n;i++) {
//         let x = 2**i
//         if(x == n){
//             return true
//         }
//         else if(x>n) {
//             return false
//         }
//     }
//     return false
// };
var isPowerOfTwo = function(n) {
    // 8 > 1000
    // 7 > 0111 
    // 1000 & 0111 =   0000 = true

    // 3 > 0011
    // 2 > 0010 
    // 0011 & 0010 = 0010 = 1 >false
    console.log(n & n-1)
    return (n & n-1) === 0 ? true : false
    
};
let n=16
console.log(isPowerOfTwo(n))

