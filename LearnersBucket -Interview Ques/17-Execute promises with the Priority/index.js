const resolvePromisesWithPriority = (promises) => {
  const sortedPromises = promises.sort((a, b) => a.priority - b.priority);
  let inputs = sortedPromises.map((p) => p.task(p.priority))
  console.log(inputs)
  const response = Promise.allSettled(inputs);
  // console.log("response---------", response);
  return response.then((results) => {
    console.log('--results-----',results)
    for (const result of results) {
      if (result.status === "fulfilled" && result.value !== undefined) {
        return result.value;
      }
    }
    return Promise.reject(new Error("All Promises failed"));
  });
};

// create a promise that rejects or resolves
// randomly after some time
function createAsyncTask(priority) {
  console.log("priority---------", priority);
  const value = Math.floor(Math.random() * 10);
  // const value =1
  console.log("value", value);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        reject("error value is less than 2");
      } else {
        resolve({ priority: priority, value1: value });
      }
    }, value * 1000);
  });
}
const promises = [
  { task: createAsyncTask, priority: 1 },
  { task: createAsyncTask, priority: 4 },
  { task: createAsyncTask, priority: 3 },
  { task: createAsyncTask, priority: 2 },
];

resolvePromisesWithPriority(promises).then(
  (result) => {
    console.log('----result',result);
  },
  (error) => {
    console.log(error);
  }
);
