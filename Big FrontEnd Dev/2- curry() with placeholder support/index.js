 // const curry = (fn) =>{
//     let res = []
//     let function_length = fn.length
//     let prev = []
//     let curr = []
//     const inner = (...args)=>{
//         // console.log('---------args',args)
//         let context = this
//         curr = [...args]

//         if(prev.length > 0) {
//             for(let i=0;i<prev.length; i++) {
//                 if(prev[i] == 'deepak' && curr.length > 0) {
//                     // res.push()
//                     prev[i] = curr.shift()
//                 }
//             }
//         }
//         prev = [...prev,...curr]

//         // if(prev.length === function_length && prev.every(val => val != 'deepak')) {
//         //     let ans = fn.apply(context,prev)
//         //     prev =[]
//         //     curr = []

//         //     return ans
//         // }

//         if(prev.length >= function_length) {
//             prev = prev.slice(0,function_length)
//             if(prev.every(item =>  item != 'deepak')) {
//                 let ans = fn.apply(context,prev)
//                 prev =[]
//                 curr = []
//                 return ans
//             }

//         }
//         return inner
//     }

//     return inner
// }

const curry = (fn) => {
    const curried = (...args) => {
        if (args.length >= fn.length && args.every((arg) => arg !== curry.placeholder)) {
            return fn(...args.slice(0, fn.length));
        }
        const prev = [...args];
        console.log('--------------- args',args)
        const inner = (...currArgs) => {
            console.log('--curr',currArgs)
            let combinedArgs = [...prev];
            let i = 0;

            // Replace placeholders in combinedArgs with values from currArgs
            while (i < combinedArgs.length && currArgs.length > 0) {
                if (combinedArgs[i] === curry.placeholder) {
                    combinedArgs[i] = currArgs.shift();
                }
                i++;
            }

            combinedArgs = [...combinedArgs, ...currArgs];

            if (combinedArgs.length >= fn.length) {
                const finalArgs = combinedArgs.slice(0, fn.length);
                if (finalArgs.every((item) => item !== curry.placeholder)) {
                    return fn(...finalArgs);
                }
            }
            console.log('---------------combined args',combinedArgs)
            return curried(...combinedArgs);
            // return inner
        };

        return inner;
    };

    return curried;
};

// Placeholder for missing arguments
curry.placeholder = 'deepak';

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
 const curriedJoin = curry(join)
 const _ = curry.placeholder

//  console.log(curriedJoin(1, 2, 3)) // '1_2_3'

//  console.log(curriedJoin(_, 2)(1, 3)) // '1_2_3'

 console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'

//  console.log(curriedJoin(_,_,3,4)(1,_)(2,5))

//  console.log(curriedJoin(1,2)(3))

//  console.log(curriedJoin(1,2)(3),curriedJoin(4)) //'1_2_4'

const curried = curry(join)(1, 2);
console.log("-----------", curried(3)); // '1_2_3'
console.log(curried(4));
 