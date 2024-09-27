var bagOfTokensScore = function(tokens, power) {
    const n = tokens.length
    if(n==0) return 0
    let maxi = 0
    let score = 0
    let left = 0
    let right = n-1
    tokens = tokens.sort((a,b)  => a - b)
    console.log(tokens)
    let i = left
    while(left <= right) {
        if(power >= tokens[i]) {
            power -= tokens[i]
            score += 1
            maxi=Math.max(maxi,score)
            left+=1
            i = right
        }else if(score >= 1){
            power += tokens[i]
            score -= 1
            right -= 1
            i = left
        }else {
            break
        }
    }
    return maxi
};
// const tokens = [100,200,300,400]
// const power = 200
const tokens = [100]
const power = 50
console.log(bagOfTokensScore(tokens,power))