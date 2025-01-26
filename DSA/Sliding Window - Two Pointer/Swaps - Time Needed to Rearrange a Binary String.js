var secondsToRemoveOccurrences = function(s) {
    
    let seconds = 0
    let zeros = 0
    for(let i of s){
        // Check for zeros
        if(Number(i) == 0) {
            zeros++
        }
        // 011 >  So you required two swapa
        // 0001 > required 3 swaps, So know how many zeros are there before one , if not make seconds+1
        if(Number(i) == 1 && zeros > 0) {
            seconds = Math.max(seconds+1,zeros)
        }
    }

    return seconds
};

let s = '0110101'
console.log(secondsToRemoveOccurrences(s))