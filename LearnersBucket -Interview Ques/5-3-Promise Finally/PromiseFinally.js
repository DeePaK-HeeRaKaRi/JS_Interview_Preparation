

  function promiseFinally(promise,callback) {
    return promise.then(
        (value) => Promise.resolve(callback()).then(() => value),
        (error) => Promise.resolve(callback()).then(() => error)
    )
  }
  
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Success'), 1000);
  });
  
  // Use the polyfill function
  promiseFinally(myPromise, () => {
    console.log('Cleanup operations');
  }).then((result) => {
    console.log('Resolved:', result);
  }).catch((error) => {
    console.log('Rejected:', error);
  });
  

//   Using Promise Prototype

 
    Promise.prototype.finally = function (callback) {
      const promise = this;
  
      return promise.then(
        (value) =>
          Promise.resolve(callback()).then(() => value),
        (reason) =>
          Promise.resolve(callback()).then(() => {
            throw reason;
          })
      );
    };

    /*
Why Execute the Callback First?
In Promise.prototype.finally, the primary goal is to ensure the cleanup happens before the final result is returned or the error is propagated. 
This is why the callback in finally is executed before the resolution or rejection of the Promise is passed along

Promise.resolve("Success")
  .finally(() => console.log("Cleanup"))
  .then((result) => console.log(result));


  Cleanup
Success


    */
  