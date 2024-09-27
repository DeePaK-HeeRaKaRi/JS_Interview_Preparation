// function jump(arr) {

//     function call_jump(index,jump){
//         if(index >=arr.length-1) {
//             return jump
//         }
//         let mini = Infinity
//         for(let i=1;i<=arr[index];i++) {
//             mini = Math.min(mini,call_jump(index+i,jump+1))
//             return mini
//         }
//     }
//     return call_jump(0,0)
// }


function jump(arr) {
    // Think in terms of range
    let jumps = 0
    let l = 0
    let r = 0
    let maxi = 0
    let n =arr.length
    while(r<n-1) {
        
        for(let i=l;i<=r;i++) {
            maxi = Math.max(maxi,arr[i]+i)
        }
        l = r+1
        r = maxi
        jumps++
        console.log({r})
    }
    return jumps

}
let arr = [2,3,1,1,4]
arr = [2,3,1,4,1,1,1,2]
// arr = [5,1]
console.log(jump(arr))