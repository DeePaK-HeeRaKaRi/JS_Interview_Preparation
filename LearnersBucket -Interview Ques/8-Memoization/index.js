const memoize=(fn) => {
    const cache={}
    return (...args) => {
        
        const argsToKey = JSON.stringify(args)
        // console.log("argss",args,argsToKey)
        if(argsToKey in cache){
            console.log(`Fetching from cache ${argsToKey}`)
            return cache[argsToKey]
        }else{
            console.log(`Computing the result ${argsToKey}`,args)
            const result=fn.apply(this,[args])
            cache[argsToKey]=result
            return result
        }
    } 
}

// // const addNums=(a,b,c)=>{
// //     return a+b+c
// // }
const addNums=(arr1)=>{
    const calculate=arr1.reduce((prevValue,curvalue) => {
        const result=prevValue+curvalue
        return result
    },0)
    return calculate
}
const Factorial=memoize((i)=>{
    if(i==0 || i==1){
        return 1
    }
    return i*Factorial(i-1)
})
 

const add=memoize(addNums)
console.log(add(1,2,3))
console.log(add(1,2,3))
console.log(add(1,2,3,4))
console.log(Factorial(5))
console.log(Factorial(6))

// const add=memoize(addNums)(1,2,3,4)
