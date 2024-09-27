var maxScore = function(cardPoints, k) {
    let n = cardPoints.length
    // If we need k cards than avoid taking n-k cards
    // So Assume our sliding window is from 0 to n-k and calculate the last K cards
    let l=0
    let r = n-k
    let sum = 0
    for(let i=r;i<n;i++){
        sum+=cardPoints[i] //Here we are calculating last k cards 
    }

    // Now start moving the window and do remove and add the next element
    let maxi = sum
    while(r<n) {
        sum = sum - cardPoints[r] + cardPoints[l] 
        maxi = Math.max(maxi,sum)
        l+=1
        r+=1
    }
    return maxi
    
}; 

let cardPoints = [1,2,3,4,5,6,1]
let k = 3
console.log(maxScore(cardPoints,k))