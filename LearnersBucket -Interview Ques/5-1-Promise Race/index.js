// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, "one");
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, "two");
// });

// Promise.race([promise1, promise2]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// });
// // Expected output: "two"


// const p3 = sleep(100, "three", "fulfill");
// const p4 = sleep(500, "four", "reject");

// Promise.race([p3, p4]).then(
//   (value) => {
//     console.log(value); // "three"
//     // p3 is faster, so it fulfills
//   },
//   (error) => {
//     // Not called
//   }
// );

// const p5 = sleep(500, "five", "fulfill");
// const p6 = sleep(100, "six", "reject");

// Promise.race([p5, p6]).then(
//   (value) => {
//     // Not called
//   },
//   (error) => {
//     console.error(error.message); // "six"
//     // p6 is faster, so it rejects
//   }
// );


// Polyfill for Promise any
const promiseAny=(tasks)=>{
    return new Promise((resolve,reject) => {
        tasks.forEach((task) =>{
            task.then((val)=>{
                resolve(val)
            })
            .catch((err)=>{
                reject(new Error(err))
            })
        })
    })

}
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "two");
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 400, "three");
});

const tasks = [promise1, promise2, promise3];

promiseAny(tasks)
.then((val)=>{
    console.log(val)
})
.catch((err)=>{
    console.log(err)
})