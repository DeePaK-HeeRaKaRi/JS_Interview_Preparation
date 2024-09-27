
const generateKey=(path,config) => {
    const key=Object.keys(config)
    .sort((a,b) =>a.localeCompare(b))
    .map((k) => console.log(k))
    .join("&")

    return path+key
}
// console.log(generateKey('https://jsonplaceholder.typicode.com/todos/1', {}))

const makeApiCall = async(path,config)=>{
    try{
        let response=await fetch(path,config)
        let data=await response.json()
        return data
    }catch(e){
        console.log('Error in making Api Call',e)
    }
    return null
}
const cachedApiCall=(timer) =>{
    const cache = {}
    let result = async(path,config) => {
        // if you are sending any headers like tokens , we need to generate unique key for both path+headers
        const key = JSON.stringify(path)
        // const key = generateKey(path,config)
        let entry = cache[key]
        
        if(!entry || Date.now() > entry.expiryTime) {
            
            try {
                const value=await makeApiCall(path,config)
                console.log("Making New ApiCall");
                cache[key]={value:value,expiryTime : Date.now() + timer}
            }
            catch(e){
                console.log(e)
            }
        }else{
            console.log("Fetching from cache Response");
        }
        return cache[key].value
    }
    return result
}

const call=cachedApiCall(1400)
call('https://jsonplaceholder.typicode.com/todos/1',{})
.then((a)=>{
    console.log(a)
})


setTimeout(() => {
    call("https://jsonplaceholder.typicode.com/todos/1", {})
    .then((a) => {
        console.log(a)
    })
},900)

setTimeout(() => {
    call("https://jsonplaceholder.typicode.com/todos/2", {})
    .then((a) => {
        console.log(a)
    })
},900)
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) => {
    console.log(a);
  });
}, 1000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) => {
    console.log(a);
  });
}, 2000);


// 1000 
//     expTime =lets say 1000+1000 =2000
// next time i will call for lets say 900
//     so Date.now() < expTime . so it will call from cache response
// if i will call for 2200
//     so Date.now() > expTime i.e., 2200 > 2000 it will make new api call