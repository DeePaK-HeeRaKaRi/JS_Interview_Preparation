
const asyncSeriesExecuter=(promises)=>{
    let promise=promises.shift()
    promise
    .then((result)=>{
        console.log(result)
        if(promises.length>0){
            asyncSeriesExecuter(promises)
        }
    })
    
}
const asyncTask=(i)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`completing the given task in ${i} secs`)
        },1000*i)
        
    })
}

const promises=[asyncTask(3),asyncTask(1),asyncTask(7),asyncTask(2),asyncTask(5)]
asyncSeriesExecuter(promises)