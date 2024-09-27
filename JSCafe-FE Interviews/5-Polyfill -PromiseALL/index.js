const dummyAPI=(time,ind) => {
    return new Promise((resolve,reject) => {
        if(ind==3){
            setTimeout(() => {
                reject(time)
            },time)
        }else{
            setTimeout(() => {
                resolve(time)
            },time)
        }
       
    })
}
const tasks=[dummyAPI(1000,1),dummyAPI(2000,2),dummyAPI(3000,3)]

const polyfillPromiseAll = (tasks) => {
    let promiseCompleted=0
    let result=[]
    return new Promise((resolve,reject) => {
        tasks.forEach((promise,index) => {
            promise
            .then((value) => {
                result[index]=value
                promiseCompleted+=1
                console.log(promiseCompleted)
                if(promiseCompleted === tasks.length){
                    resolve(result)
                }
            })
            .catch((error) => {
                reject(`Error `,error)
            })
        })
    })
}
polyfillPromiseAll(tasks)
.then((result) => {
    console.log(`Results are arrived ${result}`)
})
.catch((err) => {
    console.log(`Error`,err)
})