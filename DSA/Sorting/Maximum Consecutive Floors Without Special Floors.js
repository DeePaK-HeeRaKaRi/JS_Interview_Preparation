var maxConsecutive = function(bottom, top, special) {
    special = special.sort((a,b) => a-b)
    let ans = 0
    for(let i=0;i<special.length-1;i++){
        ans = Math.max(ans,special[i+1]-special[i]-1)
    }
    ans = Math.max(ans,special[0]-bottom)
    ans = Math.max(ans,top-special[special.length-1])
    return ans
}
let bottom = 2
let top = 9
let special = [4,6]
// bottom = 6
// top = 8
// special = [7,6,8]
// bottom = 2
// top = 500
// special = [200,500]

console.log(maxConsecutive(bottom, top, special))