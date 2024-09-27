// const add=(...args) => {
//     let sum=args
//     const inner=(...args2) => {
//         console.log('inner')
//         // console.log(args2)
//         sum=[...sum,...args2]
//         console.log(sum)
//         return inner
//     }
    
//     // inner.valueOf1=() => {
//     //     console.log('sum',sum)
//     //     return sum.reduce((prev,cur) => prev+cur , 0)
//     // }
//     inner.value=() => {
//         console.log('sum',sum)
//         return sum.reduce((prev,cur) => prev+cur , 0)
//     }
//     return inner
// }
// console.log(add(1)(2).value() === 3);
// console.log(add(1, 2)(3)(4)(5).value() === 15);
// // console.log(add(1)(2)(3).value() === 6);
// // console.log(add(1)(2) + 3);

const add=function(...args){
    let sum=args
    const inner=function(...args2){
        // console.log('inner')
        // console.log(args2)
        sum=[...sum,...args2]
        // console.log(sum)
        return inner
    }
    
    // inner.valueOf1=() => {
    //     console.log('sum',sum)
    //     return sum.reduce((prev,cur) => prev+cur , 0)
    // }
    inner.prototype.value=function(){
        // console.log('sum',sum)
        return sum.reduce((prev,cur) => prev+cur , 0)
    }
    return inner
}
console.log(add(1)(2).prototype.value() === 3);
console.log(add(1, 2)(3)(4)(5).prototype.value() === 15);
// console.log(add(1)(2)(3).value() === 6);
// console.log(add(1)(2) + 3);


//Unlike regular functions, arrow functions do not have their own this, arguments, super, or prototype