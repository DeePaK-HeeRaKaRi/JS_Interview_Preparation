const memoize=(fn) => {
    const cache={}
    
    return (...args) => {
        console.log('cahce',cache,{args})
        // console.log(this)
        const argsToKey = JSON.stringify(args)
        // console.log("argss",args,argsToKey)
        if(argsToKey in cache){
            console.log(`Fetching from cache ${argsToKey}`)
            return cache[argsToKey]
        }else{
            console.log(`Computing the result ${argsToKey}`,args)
            const result=fn.call(this,args)
            cache[argsToKey]=result
            return result
        }
    }
}

// // const addNums=(a,b,c)=>{
// //     return a+b+c
// // }
// const addNums=(arr1)=>{
//     const calculate=arr1.reduce((prevValue,curvalue) => {
//         const result=prevValue+curvalue
//         return result
//     },0)
//     return calculate
// }
const addNums = (arr) => arr.reduce((prev,curr) => prev+curr, 0)
const add=memoize(addNums)
console.log(add(1,2,3))
console.log(add(1,2,3))
console.log(add(1,2,3,4))


// const Factorial=memoize((i)=>{
//     if(i==0 || i==1){
//         return 1
//     }
//     return i*Factorial(i-1)
// })
// console.log(Factorial(5))
// // console.log(Factorial(6))
// console.log(Factorial(8))

 


// const Factorial=(i)=>{
//         if(i==0 || i==1){
//             return 1
//         }
//         return i*Factorial(i-1)
//     }
// const fact=memoize(Factorial)
// console.log(fact(5))
// console.log(fact(5))
// console.log(fact(6))
// console.log(fact(10))
// const add=memoize(addNums)(1,2,3,4)
