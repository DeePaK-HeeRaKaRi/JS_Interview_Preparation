var calculate = function(s) {
    let ans = 0
    let num = 0
    let sign = 1 // 1> +, -1 > -
    let stack = [sign]
 
    for (let i of s) {
        if(!isNaN(i) && i!=' ') {
            num = num * 10 + Number(i)
            console.log(num,typeof num)
        }
        else if(i == '('){
          stack.push(sign)
        }
        else if(i == ')') {
            stack.pop()
        }
        else if(i == '+' || i == '-'){
            ans += num * sign
            // console.log({ans})
            num = 0
            sign = i == '+' ? 1 : -1
            if(stack.length > 0) sign = sign * stack[stack.length -1]  
        }
    }
    ans += num * sign
    return ans
};
 
let s = "(1+(4+5+2)-3)+(6+8)"
s= '1 +  1'
// s = "- (3 + (4 + 5))"
// s = "1-(     -2)20"
// s = '1-(-(-2))'
// console.log(calculate(s))
console.log(calculate(s))
// [ 3, '*',2,'+', 5,'/', 2,'-', 10 ]