var validateStackSequences = function(pushed, popped) {
   
    let pop_index = 0
    let stack = []
    for(let i of pushed) {
        stack.push(i)
        while(stack.length > 0 && stack[stack.length-1] == popped[pop_index]) {
            stack.pop()
            pop_index++
        }
    }

    return stack.length == 0
};

let pushed = [1,2,3,4,5]
let popped = [4,5,3,2,1]
pushed = [1,2,3,4]
popped = [4,3,2,1]

pushed = [1,2,3,4,5]
popped = [4,3,5,1,2]
console.log(validateStackSequences(pushed,popped))