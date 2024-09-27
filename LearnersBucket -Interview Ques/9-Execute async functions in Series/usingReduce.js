// const asyncSeriesExecuter=(promises)=>{
//     const result=promises.reduce((prev,curr) => {
//         return prev.then((res)=>{
//             return curr.then((res)=>{
//                 console.log(res)
//             })
//         })
//     },Promise.resolve(`First executed`))
//     return result
// }
// const asynctask=(i)=>{
//     console.log('in asynctask',i)
//     return new Promise((resolve,reject) => {
//         setTimeout(()=>{
//             resolve(`Executed after ${i} secs`)
//         },1000*i)
//     })
// }
// console.log('using reduce')
// const promises=[asynctask(3),asynctask(1),asynctask(0),asynctask(7),asynctask(3)]
// asyncSeriesExecuter(promises)


const asyncTask = (i) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`Executed after ${i} secs`)
        },1000*i)
    })
}

const asyncSeriesExecuter = (promises) => {
    promises.reduce((prevPromise,currPromise) => {
        return prevPromise
               .then((res) => {
                    // console.log('-----------',res)
                    return currPromise()
               })
               .then((res) => {
                    console.log('----------res',res)
               })
               .catch((err) => {
                console.log(err)
               })
    },Promise.resolve('Intial Execution'))
}



const tasks = [
    () => asyncTask(4),
    () => asyncTask(3),
    () => asyncTask(7),
    () => asyncTask(2),
    () => asyncTask(5)
];

asyncSeriesExecuter(tasks);