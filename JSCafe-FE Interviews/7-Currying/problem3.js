// Create a javascript function that will remember its previously passed
// values and return the sum of the current and previous value.
// const curry=() => {
//     let store=0
//     const inner=(value=0) => {
//         store+=value
//         return store
//     }
//     return inner
// }
// let sum=curry()
// console.log(sum(1))
// console.log(sum(4))
// console.log(sum(5))
// console.log(sum(10))
// console.log(sum())

const curry=() => {
    let store=0
    const inner=(...values) => {
        // console.log('store',store)
        let containsString = values.some((element) => typeof element === "string");
        if(containsString){
            return `Cannot calculate as it contains String -> ${values}`
        }
        // console.log('values',values)
        if(values.length==0){
            return store
        }
        const result=values.reduce((prev,curr) => prev+curr ,0)
        store+=result
        console.log('---------',store)
        return store
    }
    return inner
}
let sum=curry()
console.log(sum(1,2,3))
console.log(sum(4,5))
console.log(sum(10))
console.log(sum(10,20))
console.log(sum(40))
console.log(sum(98,'deeak',90,100))
console.log(sum(40));
let t=[1,2,3]
console.log(Array.isArray(t))