var longestValidParentheses = function(s) {
    let openBrackets = [-1]  //()
    let maxi = -1
    for(let i=0;i<s.length; i++) {
        if(s[i] == '(') {
            openBrackets.push(i)
        }
        else {
            openBrackets.pop()
           if(openBrackets.length == 0) {
                openBrackets.push(i) // Means thisis the break point for next branckets for valid pair
           }
           else {
                
                maxi = Math.max(maxi,i-openBrackets[openBrackets.length-1]) // () 1-(-1)
           }
        }
    }
    return maxi
};

let s = ")()())((())))"
s = '()'
console.log(longestValidParentheses(s))