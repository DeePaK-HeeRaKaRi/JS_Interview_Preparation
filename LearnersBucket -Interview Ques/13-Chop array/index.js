
// const arr=[1,2,3,4,5,6,7,8,9,10]
// const result=((arr,size)=>{
//     // do not mutate original array
//     let temp=[...arr]

//     const output=[]
//     let i=0
//     while(i<temp.length){
//         output.push(temp.slice(i,i+size))
//         i=i+size
//     }
//     return output
// })

// console.log(result(arr,5))



Array.prototype.chop=function(size){
    let temp=[...this]
    if(!size || size>=temp.length){
        console.log('mjdn')
        return [temp]
    }
    const output=[]
    let i=0
    while(i<temp.length){
        output.push(temp.slice(i,i+size))
        i=i+size
    }
    return output
}
const arr=[1,2,3,4,5,6,7,8,9,10]
console.log(arr.chop(9))