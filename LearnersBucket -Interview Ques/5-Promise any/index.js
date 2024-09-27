// const any=(tasks)=>{
//     let rejectionsArray = new Array(tasks.length)
//     let tasksCount=0
    
//         return new Promise((resolve,reject) => {
//             tasks.forEach((promise,index)=>{
//             promise
//             .then((val) => {
//                 resolve(val)
//             })
//             .catch((err) => {
//                 rejectionsArray[tasksCount]=err
//                 tasksCount+=1
//                 if(tasksCount == tasks.length){
//                     reject(rejectionsArray)
//                 }
//             })
//         })
        
//     })
// }

const any=(promises)=>{
    let errors=[]
    let pComp=0
    return new Promise((resolve,reject)=>{
        promises.forEach((promise,index)=>{
            promise
            .then((val)=>{
                resolve(val)
            })
            .catch((err) => {
                errors.push(err)
                pComp+=1
                if(pComp===promises.length){
                    reject(errors)
                }
            })
        })
    })
}


const test1=new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject('one')
    },200)
    // setTimeout(reject, 500, 'one');
})
const test2=new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject('two')
    },200)
    // setTimeout(reject, 400, 'one');
})
const test3=new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('three')
    },200)
    // setTimeout(reject, 600, 'one');
})

any([test1,test2,test3]).then((val)=>{
    console.log(val)
})
.catch((err) => {
    console.log(err)
})