const evalRPN = (tokens) => {
    const calculateResult = (operator,a,b) => {
        switch(operator){
            case "+":
                return a+b
            case "-":
                return a-b
            case "*":
                return a*b
            case "/":
                return Math.trunc(a/b);
            default:
                return 0
        }
    }
    let stack = []
    tokens.forEach((value,index) => {
        if(["+","-","*","/"].includes(value)){
            const second_integer = stack.pop()
            const first_integer = stack.pop()
            const currRes = calculateResult(value,first_integer,second_integer)
            stack.push(currRes)
        }else{
            stack.push(parseInt(value))
        }
    })
    return stack.pop()
}
const tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
const res = evalRPN(tokens)
console.log(res)