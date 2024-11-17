function curry(fn) {
    let res =[]
    const inner = (...args) => {
        let context = this
        res =[...res, ...args]
        console.log('res',res)
        if(res.length == 3 ) {
            const result =fn.apply(context,res)
            res = []
            
            return result
        }
        return inner
    }
    return inner
}

const join = (a, b, c) => {
    return `${a}_${b}_${c}`
 }
 const curriedJoin = curry(join)
 console.log(curriedJoin(1, 2, 3)) // '1_2_3'
 console.log(curriedJoin(1)(2, 3)) // '1_2_3'
 console.log(curriedJoin(1, 2)(3)) // '1_2_3'