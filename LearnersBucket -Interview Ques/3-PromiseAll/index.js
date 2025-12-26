 
// // Promises in list will execute in parallel & return the result in order
// // polyfill for promiseALL
const promiseAll = (taskList) => {
  const result = [];
  let promiseCompleted = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      //Instead of using a if condition you can use Promise.resolve(promise)
      if(promise && typeof promise.then == "function") {
         promise
        .then((val) => {
          console.log(val)
          result[index] = val;
          promiseCompleted += 1;
          if (promiseCompleted === taskList.length) {
            // console.log(result);
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
      }
      else {
          result[index] = promise;
          promiseCompleted += 1;
          if (promiseCompleted === taskList.length) {
            // console.log(result);
            resolve(result);
          }
      }
     
    });
  });
};
 
const timer=(time) => {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            if(time>=3000){
                reject(`rejected - the time is is greater than 3000`)
            }else{
                resolve(time)
            }

        },time)
    })
}

const taskList = [timer(2000), timer(1000), timer(1500),'Deepak',{},[],new Error()];
promiseAll(taskList)
  .then((results) => {
    console.log(results)
    console.log(`results arrived ${results}`);
  })
  .catch((err) => {
    console.log(err);
  });

  /*
Like string, number, objects etc should treat as a promise resolve
new Error() > it is a object > resolve

The same theory works for any,race,settled.

  */
 