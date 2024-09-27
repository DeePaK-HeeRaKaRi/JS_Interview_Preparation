const sleep=(ms)=>{
    const pr=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`Executed after ${ms} milli seconds`)
        },ms)
    })
    return pr
}
// sleep(1500)
// .then((res)=>{
//     console.log(res)
// })

const performAction=async()=>{
    const res=await sleep(2000)
    console.log(res)
}
performAction()