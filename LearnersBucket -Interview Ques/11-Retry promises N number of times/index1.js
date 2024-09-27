// const wait=(i)=>{
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve('Wait is completed')
//         },i)
//     })
// }
// const retryWithDelay = async(fn,retries,delay=1000)=>{
//     try{
//         await fn()
//     }catch(err){
//         if(retries<=0){
//             throw new Error('This task is failed Completed')
//         }
//         await wait(delay)
        
//         return retryWithDelay(fn,retries-1,delay)
//     }
// }

// const getTestFunc =() =>{
//     let callCounter = 0
//     return async()=>{
//         callCounter +=1
//         if(callCounter <5){
//             throw new Error('Not yet')
//         }
//     }
// }

// const test=async()=>{
//     await retryWithDelay(getTestFunc(),7)
// }
// test().then((res)=>{
//     console.log(res)
// })
// .catch((err) =>{
//     console.log(err)
// })
const wait=async()=>{
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('Wait has been completed')
        },2000)
    })
}
const retryWithDelay=async(fn,limit,delay=2000)=>{
    try {
        return await fn()
       
    }catch(e){
        console.log('eeeee,',e)
       
        if(limit<=0) {
            throw new Error('retries has been completed')
        }

        await wait();

        return await retryWithDelay(fn,limit-1)
    }
}

const getTestFunc=() =>{
    let counter = 0
    return async function(){
        counter +=1
        if(counter < 5) {
            throw new Error('Not Yet')
        }else{
            return 'Success after retires'
        }
    }
}

const test = async() => {
    return await retryWithDelay(getTestFunc() ,7)
}
test()
.then((resp) => {
    console.log('Final res---resp',resp)
})
.catch((err)=> {
    console.log('final err------',err)
})