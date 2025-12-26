 
    Promise.prototype.finally = function (callback) {
      const promise = this;
      callback = typeof callback === "function" ? callback : () => {};
      return promise.then(
        (value) => Promise.resolve(callback()).then(() => value),  // Success Handler 
        (reason) => Promise.resolve(callback()).then(() => {throw reason}) // Error Handler
      );
    };

    // new Promise((resolve) => resolve("Success")
  
    Promise.resolve("OK")
  .finally(123)  // Not a function, should be ignored
  .then((val) => console.log(val)); //Ok

  // new Promise((resolve, reject) => reject("Error occurred"))
  // .finally(() => console.log("Cleanup action - 1"))
  // .finally(() => console.log("Cleanup action - 2"))
  // .then((value) => console.log("Resolved with:", value))
  // .catch((error) => console.log("Caught error:", error));

    /*

   The then(successHandler, errorHandler) function automatically decides which callback to execute:
If promise resolves: The first function (value) => {} runs.
If promise rejects: The second function (reason) => {} runs.
Inside finally, we wrap callback() with Promise.resolve(callback()) to handle both synchronous and asynchronous callbacks safely.
The return value of finally is the original resolution/rejection of the promise, ensuring it doesn’t modify the promise state.
The callback is executed before the promise is resolved or rejected, ensuring the cleanup happens before the final result is returned or the error is propagated.

Why Execute the Callback First?
In Promise.prototype.finally, the primary goal is to ensure the cleanup happens before the final result is returned or the error is propagated. 
This is why the callback in finally is executed before the resolution or rejection of the Promise is passed along

Promise.resolve("Success")
  .finally(() => console.log("Cleanup"))
  .then((result) => console.log(result));


  Cleanup
Success

Before I continue, let me clean up — and I’ll wait if the cleanup is async.
Promise.resolve("OK")
  .finally(async () => {
    console.log("cleanup start");
    await new Promise(res => setTimeout(res, 2000));
    console.log("cleanup done");
  })
  .then(console.log);

  so need to wrap inside the callback
    */
  