// const asyncSeriesExecuter=async(promises) => {
//     for(let promise of promises){
//         try{
//             console.log('--------------')
//             const result=await promise
//             console.log('result',result)
//         }
//         catch(e){
//             console.log(e)
//         }
//     }
// }
// const asyncTask=(i)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if(i==12){
//                 reject('Rejected at 2000 ms')
//             }else{
//                 resolve(`completing the given task in ${i} secs`)
//             }
            
//         },1000*i)
        
//     })
// }
// const promises=[asyncTask(4),asyncTask(3),asyncTask(7),asyncTask(2),asyncTask(5)]
// asyncSeriesExecuter(promises)


const asyncSeriesExecuter = async (tasks) => {
    for (let task of tasks) {
        try {
            console.log('--------------');
            const result = await task(); // Create and await each promise sequentially
            console.log('result', result);
        } catch (e) {
            console.log(e);
        }
    }
};

const asyncTask = (i) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (i === 12) {
                reject('Rejected at ' + i + ' secs');
            } else {
                resolve(`completing the given task in ${i} secs`);
            }
        }, 1000 * i);
    });
};

const tasks = [
    () => asyncTask(4),
    () => asyncTask(3),
    () => asyncTask(7),
    () => asyncTask(2),
    () => asyncTask(5)
];

asyncSeriesExecuter(tasks);
//Instead of creating and starting the promises immediately, we create functions that return the promises. 
// This ensures the promises are only created when the functions are called.