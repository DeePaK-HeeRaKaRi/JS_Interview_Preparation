Promise.cancelable = (promise) => {
    //code here
        let controller = new AbortController()
        let signal = controller.signal

        const onAbort = () => Promise.reject(new Error('Promise has been Aborted'));

      const wrappedPromise = new Promise((resolve,reject) => {
          promise
          .then((value) => resolve(value))
          .catch((err) => reject(err))
          .finally(() => {
            signal.removeEventListener('abort', onAbort); // Correct way to remove listener
          });

          signal.addEventListener('abort',onAbort)
      })
  
      
      return {wrappedPromise, cancel : () => controller.abort()}
  };
//   This approach will gets aborted immediately 
  // Test
  const asyncTask1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 1 completed");
    }, 500);
  });
  const asyncTask2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 2 completed");
    }, 3000);
  });
  const cancelableTask1 = Promise.cancelable(asyncTask1);
  const cancelableTask2 = Promise.cancelable(asyncTask2);
  
  cancelableTask1.wrappedPromise
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  
  cancelableTask2.wrappedPromise
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  // Cancel the task after 1 second
  setTimeout(() => {
    cancelableTask1.cancel();
    cancelableTask2.cancel();
  }, 1000);
  // Output
  // Task 1 completed
  // ERROR! CanceledPromiseError: Promise has been canceled
  