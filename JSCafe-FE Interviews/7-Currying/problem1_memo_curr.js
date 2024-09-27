const sum = (...args1) => {
    console.log(args1)
    let cache = {}
    let sum = calculateSum(args1)
    const inner = (...args2) => {
        console.log(args2)
        const argsTokey = JSON.stringify(args2)
        if(argsTokey in cache) {
            console.log('--------Fetching from cache',args2,cache[argsTokey])
        }else{
            const curargSum = calculateSum(args2)
            cache[argsTokey] = curargSum
            console.log('--------Calculating the sum',args2,cache[argsTokey])
        }
        sum += cache[argsTokey]
        console.log('-------arr',sum)
        if(args2.length === 0) {
            return sum
        }
        return inner
    }
    return inner
}

const calculateSum = (arr) => {
    const result = arr.reduce((prev,curr) => {
        prev = prev +curr
        return prev
    },0)
    return result
}
const res2 = sum(1)(2,3)(4,5)(2,3)(4,5)(2,3)()
console.log('-res2-------------',res2)