// In this case, fn.apply(this, args) is used to invoke the original function fn with the same context (this) 
// and arguments (args) passed to the memoized function. 
// So, this in this context will refer to the same context in which the memoized function was called.

const memoize=(fn) => {
    const cache={}
    
    return function(...args){
 
        // console.log('args----',args,typeof args)
        // console.log('cahce',cache)
        // console.log(this)
        const argsToKey = JSON.stringify(args)
        // console.log("argss",args,argsToKey)
        // if(argsToKey in cache){
        if(cache.hasOwnProperty(argsToKey)){
            console.log(`Fetching from cache ${argsToKey}`)
            return cache[argsToKey]
        }else{
            console.log(`Computing the result ${argsToKey}`,args)
            const result=fn.apply(this,args)
            cache[argsToKey]=result
            return result
        }
    }
}
 
// // const addNums=(a,b,c)=>{
// //     return a+b+c
// // }
const addNums=(...arr1)=>{
    // console.log('arguments in addNums----',arr1)
   
    // console.log('arr1-',arr1)
    const calculate=arr1.reduce((prevValue,curvalue) => {
        const result=prevValue+curvalue
        return result
    },0)
    return calculate
}
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
