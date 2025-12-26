 const filterPromise=async(arr,fn)=>{
    const output=[]
    let tasks=0
     let flag = false
    const results = new Promise((resolve,reject) => {
       
        arr.forEach((item,i)=>{
            fn(item,(error,resp)=>{
                if(flag) return /*If you dont wanna see the timers[consoles] even after rejection keep the flag and return */
                if(error){
                    flag = true
                    reject(`Failed at ${item}`)
                }else{
                    console.log(resp)
                    tasks++
                    if(resp){
                        output[i]=item
                    }
                    if(tasks>=arr.length){
                        // resolve(output)  //[1,empty,3,4,5]
                        resolve(output.filter(Boolean)) //[1,3,4,5] remove the empty
                    }
                }
            })
        })
    })
    return results
}
const arr=[1,2,3,4,5]
const numPromise=filterPromise(arr,function(num,callback){
    setTimeout(()=>{
        num=num*2
        if(num==4){
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
    console.log('No Success',err)
})

/*
Rejecting a Promise does NOT cancel already-started async operations.

That’s why your console.log(resp) keeps printing even after rejection.

If you dont wanna see the timers keep the flag and return

*/