const wait=(ms)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },ms)
    })
}
const retryWithDelay=async(fn,retries,interval=2000,finalErr='Retry Failed')=>{
    console.log('fn,retries',retries) //7 6 5 4 3
    try{
        // console.log('fn')
        return await fn('deepak')
    }
    catch(err){
        console.log(err)
        // if no retries left

        if(retries<=0){
            return Promise.reject(`final ${finalErr}`)
        }
        await wait(interval)
        return retryWithDelay(fn,(retries-1),interval,finalErr)
    }
}

// Test function
const getTestFunc=(name) => {
   
    let callCounter=0
    return async(name) => {
        // console.log(name)
        // console.log('args',args)
        callCounter+=1
        // console.log('hello',callCounter)
        if(callCounter<5){
            // console.log('callCounter',callCounter)
            throw new Error(`Not yet still the callCounter is , ${callCounter}`)   // 1 2 3 4 5
        }else{
            console.log('---',callCounter)
            return 'Success after retires'
        }
        
    }
}

// Test Case

const test=async()=>{
    return await retryWithDelay(getTestFunc(),7)
    console.log('success')
    // await retryWithDelay(getTestFunc(),2)
    // console.log('will fail before getting here')
}
test()
.then((resp)=>{
    console.log('resp',resp)
})
.catch(console.error)



