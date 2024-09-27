const filterPromise=((arr,fn)=>{
    const final=new Promise((resolve,reject)=>{
        let temp=[...arr]
        const output=[]
        let tasks=0
        temp.forEach((e,i)=>{
            fn(e,(error,resp)=>{
                if(error){
                    reject(`Failed at ${e}`)
                }else{
                    console.log(resp)
                    tasks++
                    if(resp){
                        output[i]=e
                    }
                    if(tasks>=temp.length){
                        // resolve(output)  //[1,empty,3,4,5]
                        resolve(output.filter(Boolean)) //[1,3,4,5] remove the empty
                    }
                }
            })
        })
    })
    return final
})
const arr=[1,2,3,4,5]
const numPromise=filterPromise(arr,function(num,callback){
    setTimeout(()=>{
        num=num*2
        if(num==11){
            callback(true)
        }else{
            callback(null,num!==4)
        }
    },2000)
})
numPromise
.then((resp)=>{
    console.log('success',resp)
})
.catch((err)=>{
    console.log('error',err)
})