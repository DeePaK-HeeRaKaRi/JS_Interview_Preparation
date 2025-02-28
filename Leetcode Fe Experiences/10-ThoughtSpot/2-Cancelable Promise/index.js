Promise.cancelable = (promise) => {
  //code here
    let isCancelable = false
    const wrappedPromise = new Promise((resolve,reject) => {
        promise
        .then((value) => {
            if(isCancelable) {
                reject('Promise has been Cancelled')
            }
            else {
                resolve(value)
            }
        })
        .catch((err) => reject(err))
    })

    wrappedPromise.cancel = () => isCancelable = true
    return wrappedPromise
};
// The above approach will cancel after resolving based on the cancelable flag
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

cancelableTask1
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

cancelableTask2
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
