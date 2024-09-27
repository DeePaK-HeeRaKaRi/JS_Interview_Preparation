const allSettled = (promises) => {
  //     const mappedPromises = promises.map((p) =>
  //     Promise.resolve(p)
  //     .then(
  //         (val) => ({status:'fulfilled',response:val}),
  //         (err) => ({status:'rejected',reason:err})
  //     )
  //     )
  //    console.log(mappedPromises)
  //     return Promise.all(mappedPromises)
  const mappedPromises = promises.map((p) =>
    p
      .then((val) => {
        return { status: "fulfilled", value: val };
      })
      .catch((err) => {
        return { status: "rejected", reason: err };
      })
  );
  console.log(mappedPromises);
  return Promise.all(mappedPromises);
  // By returning Promise.all(mappedPromises), you return a single promise that resolves to an array of the results of the mapped promises. 
// This array will contain objects that indicate the status and result of each original promise.
};

const a = new Promise((resolve) =>
  setTimeout(() => {
    resolve(3);
  }, 200)
);
const b = new Promise((resolve, reject) => reject(9));
const c = new Promise((resolve) => resolve(5));
allSettled([a, b, c]).then((val) => {
  console.log('-----------',val);
});
