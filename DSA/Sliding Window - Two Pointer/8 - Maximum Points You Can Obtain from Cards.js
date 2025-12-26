 var maxScore1 = function(cardPoints, k) {
    /*
    Calculate first k points sum
    Then try shrinking the window from left and right and take the max sum

    */
    let n = cardPoints.length
    let left_sum = 0
    for(let i=0;i<k;i++) {
        left_sum += cardPoints[i]
    }
    let l = k - 1
    let r = n - 1
    let maxi = left_sum
    let right_sum = 0
    while( l>=0) {
        left_sum -= cardPoints[l]
        right_sum += cardPoints[r]
        sum = left_sum + right_sum
        maxi = Math.max(maxi,left_sum + right_sum)
        l--
        r--
    }
    return maxi
}; 
let cardPoints = [1,2,3,4,5,6,1]
let k = 3
console.log(maxScore(cardPoints,k))