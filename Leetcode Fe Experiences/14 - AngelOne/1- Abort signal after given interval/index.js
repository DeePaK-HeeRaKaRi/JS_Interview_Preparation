


function fetchApi(timer){
    const controller = new AbortController()
    const signal = controller.signal
    const timeOutId = setTimeout(() => {
        controller.abort()
    },timer)
    // fetch('https://10.204.61.144',{signal})
    fetch('https://jsonplaceholder.typicode.com/todos',{signal})
    .then(resp => {
       
        if(resp.ok) {
            return resp.json()
        }
    })
    .catch((err)=>{
        console.log('-Err',err)
    })
    .finally(()=>{
        clearTimeout(timeOutId)
    })
}

const timer =100
fetchApi(timer)


