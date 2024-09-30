Array.prototype.chop=function(size){
    // do not mutate the array directly
    let temp=[...this]
    if(!size || size>temp.length){
        return [temp]
    }
    const output=[]
    let i=0
    while(i<temp.length){
        output.push(temp.slice(i,i+size))
        i=i+size
    }
    return output
}
const mapLimit=((arr,limit,fn)=>{
    const mapLimitOutput = new Promise((resolve,reject) => {
        let choppedArr = arr.chop(limit)
        console.log('choppedArr',choppedArr)
        let batches=0
        let chopp=[]
        const final=choppedArr.reduce((prev,cur) => {
            // prev.then ensures that the next item is processed only after the previous one is complete.
            return prev.then((val)=>{
                const subArrayResult = new Promise((resolve,reject) => {
                    const results=[]
                    let taskCompleted=0
                    cur.forEach((e)=>{
                        fn(e,(error,resp) => {
                            if(error){
                                reject(`failed at ${e}`)
                            }else{
                                taskCompleted++
                                results.push(resp)
                                if(taskCompleted>=cur.length){
                                    console.log('baches',batches++)
                                    chopp.push(results)
                                    // resolve([...val,...results])
                                    resolve(chopp)
                                }
                            }
                        })
                    })
                })
                return subArrayResult
            })
        },Promise.resolve([]))
        final
        .then((result) => {
            resolve(result);
        })
        .catch((e) => {
            reject(e);
        })
    })
    return mapLimitOutput    
})

const mapLimit_with_Cache = (arr, limit, fn) => {
    const cache = {}; // Initialize the cache object

    const mapLimitOutput = new Promise((resolve, reject) => {
        let choppedArr = arr.chop(limit);
        console.log('choppedArr', choppedArr);
        let batches = 0;
        let chopp = [];

        const final = choppedArr.reduce((prev, cur) => {
            return prev.then(() => {
                const subArrayResult = new Promise((resolve, reject) => {
                    const results = [];
                    let taskCompleted = 0;

                    cur.forEach((e) => {
                        if (cache[e]) {
                            // If the result is cached, use it
                            console.log(`Using cached result for ${e}`);
                            results.push(cache[e]);
                            taskCompleted++;
                            if (taskCompleted >= cur.length) {
                                chopp.push(results);
                                resolve(chopp);
                            }
                        } else {
                            // If not cached, process with the function
                            fn(e, (error, resp) => {
                                if (error) {
                                    reject(`Failed at ${e}`);
                                } else {
                                    taskCompleted++;
                                    results.push(resp);
                                    cache[e] = resp; // Store result in cache
                                    if (taskCompleted >= cur.length) {
                                        console.log('batches', batches++);
                                        chopp.push(results);
                                        resolve(chopp);
                                    }
                                }
                            });
                        }
                    });
                });
                return subArrayResult;
            });
        }, Promise.resolve([]));

        final
            .then((result) => {
                resolve(result);
            })
            .catch((e) => {
                reject(e);
            });
    });

    return mapLimitOutput;
};

// const arr=[1,2,3,4,5,6,7,8]
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(arr.chop(3))
let limit=3
// const numPromise=mapLimit(arr,limit,function(num,callback){
const numPromise=mapLimit_with_Cache(arr,limit,function(num,callback){
    setTimeout(()=>{
        num=num*2
        console.log(num)
        // callback(null,num)
        if(num==120){
            callback(true,num)
        }else{
            callback(null,num)
        }
        
    },num*1000)
})
numPromise
.then((resp)=>{
    console.log('Success ->',resp)
})
.catch((err)=>{
    // console.log('Error ->',err)
    throw new Error(err)
})
.finally(()=>{
    console.log('Map limit is completed')
})