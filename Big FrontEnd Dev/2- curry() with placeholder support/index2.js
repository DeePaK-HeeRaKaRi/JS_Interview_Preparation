const curry = (fn) => {
    const curried = (...args) => {
        // If enough arguments are provided and none are placeholders, invoke the function
        if (args.length >= fn.length && args.every(arg => arg !== curry.placeholder)) {
            return fn(...args.slice(0, fn.length));
        }

        const inner = (...newArgs) => {
            let combinedArgs = [...args];
            let i = 0;
            console.log({newArgs,combinedArgs})
            // Replace placeholders in combinedArgs with values from newArgs
            for (const newArg of newArgs) {
                while (i < combinedArgs.length && combinedArgs[i] !== curry.placeholder) {
                    i++;
                }
                if (i < combinedArgs.length) {
                    combinedArgs[i] = newArg;
                    i++;
                } else {
                    combinedArgs.push(newArg);
                }
            }

            // If all required arguments are provided without placeholders, invoke fn
            if (combinedArgs.length >= fn.length && combinedArgs.every(arg => arg !== curry.placeholder)) {
                return fn(...combinedArgs.slice(0, fn.length));
            }

            return curried(...combinedArgs);
        };

        return inner;
    };

    return curried;
};

// Placeholder for missing arguments
curry.placeholder = Symbol('placeholder');

// Example function to test currying
const join = (a, b, c) => `${a}_${b}_${c}`;
const curriedJoin = curry(join);
const _ = curry.placeholder;

// Test cases
console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'
// console.log(curriedJoin(1, 2)(3)); // '1_2_3'
// console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'

// const curried = curry(join)(1, 2);
// console.log(curried(3)); // '1_2_3'
// console.log(curried(4)); // '1_2_4'

/*

Each inner is not the same function execution.

Every time you do

return curried(...combinedArgs);

curried runs again, creating a new closure with a new args.
=========================================================

curriedJoin(_,_,_)
        │
        ▼
+----------------------+
| inner #1             |
| args=[_,_,_]         |
+----------------------+
        │
        ▼
      (1)
        │
        ▼
calls curried(1,_,_)
        │
        ▼
+----------------------+
| inner #2             |
| args=[1,_,_]         |
+----------------------+
        │
        ▼
     (_,3)
        │
        ▼
calls curried(1,3,_)
        │
        ▼
+----------------------+
| inner #3             |
| args=[1,3,_]         |
+----------------------+
        │
        ▼
       (2)
        │
        ▼
join(1,3,2)
        │
        ▼
     "1_3_2"




*/