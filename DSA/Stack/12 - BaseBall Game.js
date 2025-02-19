var calPoints = function(operations) {
    let stack = []
    let total = 0
    for(let i of operations) {
        if(!isNaN(i)) {
            stack.push(Number(i))
            total += Number(i)
             
        }
        else if(i == 'C') {
            let top = stack[stack.length-1]
            total -= top
            stack.pop()
        }
        else if(i == 'D') {
            let double = 2 * stack[stack.length-1]
            total+= double
            stack.push(double)
        }
        else if(i == '+'){
            let sum = stack[stack.length-1] + stack[stack.length-2]
            total+=sum
            stack.push(sum)
        }
    }
   
    // return stack.reduce((prev,curr) => prev + curr, 0)
    return total
};

let ops = ["5","-2","4","C","D","9","+","+"]
console.log(calPoints(ops))