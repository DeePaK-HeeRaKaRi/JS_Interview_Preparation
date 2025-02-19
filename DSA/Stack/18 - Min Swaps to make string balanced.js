
var minSwaps = function(s) {
    
    let ans = 0
    for(let i of s) {
        if( i == '[') {
            ans++
        }
        else if(ans > 0) { // Meaning there is a previous open bracets, so reduce -- 
            ans--
        }
    }

    return Math.ceil(ans / 2)  // Has equal number of opening & closing bracets
};
let s= "][]["
// s = "]]][[["
// s = "[]"
console.log(minSwaps(s))