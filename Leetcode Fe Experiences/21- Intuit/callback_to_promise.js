// Suppose you have a callback-based function:
function fetchData(url,callback){
    setTimeout(() => {
        if(!url) {
            callback('Error: URL is required',null);
        }
        else{
            callback(null, {val:'deepak'})
        }
    })
}

// You can wrap this function in a Promise:
function fetchDataPromise(url) {
    const result = new Promise((resolve,reject) => {
        fetchData(url,(err,data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

fetchDataPromise('https://www.placeholderapi.com')
.then((data) => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})