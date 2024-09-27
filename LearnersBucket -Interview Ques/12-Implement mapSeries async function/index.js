console.log('Implement mapSeries async function')
// let mapSeries=((arr,fn)=>{
//     console.log(arr,fn)
//     const output=new Promise((resolve,reject)=>{
//         const arrReduce=arr.reduce((prev,current)=>{
//             return prev.then((val)=>{
//                 console.log('val',val)
//                 return new Promise((resolve,reject) =>{
//                     fn(current,(error,resp)=>{
//                         if(error){
//                             reject(`failed at ${current} position`)
//                             // resolve([...val, `failed at ${current} position`]); 
//                         }else{
//                             console.log('[-----------]',[...val,resp])
//                             resolve([...val,resp])
//                         }
//                     })
//                     // In your current implementation, if any element fails, the promise chain stops, and the subsequent elements are not processed. 
//                     // This happens because the reject call in the inner promise immediately stops the chain.
//                 })
//             })
           
//         },Promise.resolve([]))
//         arrReduce
//         .then((resp)=>{
//             resolve(resp)
//         })
//         .catch((err)=>{
//             reject(err)
//         })
//     })

//     return output
// })

let mapSeries = (arr,fn) => {
    const output = new Promise((resolve,reject)=>{
        const arrReduce = arr.reduce((prev,curr) => {
           return prev.then((val) => {
                return new Promise((resolve,reject) => {
                    fn(curr,(err,res)=>{
                        if(err) {
                            reject(`Rejected @ ${curr} value`)
                        }
                        else{
                            resolve([...val,res])
                        }
                    })
                })
           })
        },Promise.resolve([]))
    })
    
}
let result=mapSeries([1,2,3,6,4,5],function(num,callback){
    let s = setTimeout(()=>{
        num=num*2
        console.log(num)
        if(num==12){
            callback(true)
        }else{
            callback(null,num)
        }
    },5000)

    clearTimeout(s)
})
// result
// .then((resp)=>{
//     console.log('success',resp)
// })
// .catch((err)=>{
//     console.log('Error -> ',err)
// })