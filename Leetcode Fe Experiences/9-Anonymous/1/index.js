const add = (a, b, c) => a + b + c

const mul = (a, b, c, d) => a * b * c * d


// const perpetualCurry = (fn) => {
//     let arr = []
//     const inner = (...args) => {
//         arr =[...arr,...args]
//         if(arr.length == 3) {
//             return fn(...arr)
//         }else{
//             return inner
//         }
//     }
//     return inner
// }
 
const perpetualCurry = (fn) => {
    const arity = fn.length; // Get the arity of the function
    console.log('------',arity)
    let args = [];

    const inner = (...newArgs) => {
        args = [...args, ...newArgs];
        if (args.length >= arity) { // Check if enough arguments have been collected
            const result = fn(...args.slice(0, arity)); // Call the function with the collected arguments
            args = []; // Reset args for next curry
            return result;
        } else {
            return inner;
        }
    };

    return inner;
};

const multplyC = perpetualCurry(mul)
const addC = perpetualCurry(add)
console.log('--------',addC(1,10)(2)(3))
console.log(multplyC(1)(2)(3)(4))


//  const perpetualCurry= fn =>(...args)=>{
//      if(args.length===fn.length){   
//         return fn(...args)
//     }
//     else return perpetualCurry(fn.bind(fn,...args))
//  }