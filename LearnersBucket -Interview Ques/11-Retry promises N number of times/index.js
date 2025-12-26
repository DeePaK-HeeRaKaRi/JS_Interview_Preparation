 const wait=async(ms)=>{
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('Wait has been completed')
        },ms)
    })
}
const retryWithDelay=async(fn,limit,delay)=>{
    try {
        return await fn()
       
    }catch(e){
        console.log('--Error--,',e)
       
        if(limit<=0) {
            throw new Error('retries has been completed')
        }

        await wait(delay);

        return await retryWithDelay(fn,limit-1,delay)
    }
}

const getTestFunc=() =>{
    let counter = 0 
    return async function(){
        counter +=1
        if(counter < 5) {
            throw new Error('Not Yet')
        }else{
            return `Success after ${counter} retires`
        }
    }
}

const test = async() => {
   return await retryWithDelay(getTestFunc() ,10,2000) 
}
test()
.then((resp) => {
    console.log('Final res------',resp)
})
.catch((err)=> {
    console.log('final err------',err)
})

 