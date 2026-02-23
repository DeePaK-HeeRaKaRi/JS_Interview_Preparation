
function curry(fn) {

    let helper = (...args) => {

        if(args.length >= fn.length) {
            return fn(...args)
        }
        else {
            let temp = (...args2) => {
                return helper(...args, ...args2)
            }

            return temp
        }
    }

    return helper
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

let curriedSum = curry(sum);

console.log(curriedSum(1,2,3,4,5)); // 10
console.log(curriedSum(1)(2,3)(4,5)); // 10
console.log(curriedSum(1)(2)(3)(4)); // 10

/*
Deep Internal Explanation (Call Stack + Memory)

When temp is returned:
The call stack frame of helper would normally be removed.
But since temp still references args and helper,
The JavaScript engine keeps the lexical environment in heap memory.

Garbage collector rule:
If something is still referenced → do NOT delete.
That’s why it survives.

curry Execution Context
   fn = sum
   helper = function
        |
        ↓
helper(1) Execution Context
   args = [1]
   temp created
        |
        ↓
temp closes over:
   { args: [1], helper, fn }
    
*/