
function asyncParallel(tasks, callbacks) {
  let results = [];
  let tasksCompleted = 0;
  tasks.forEach((asyncTask) => {
      asyncTask()
      .then((value) => {
        console.log("value", value);
        results.push(value);
        tasksCompleted++;
        // Invoking the callback function at the end of the loop won’t work as the async tasks may finish at different intervals.
        // SO invoke the final callback once all the tasks are completed
        if (tasksCompleted >= tasks.length) {
          callbacks(results);
        }
       
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });
}


function createAsyncTask(i) {
//   const value = Math.floor(Math.random() * 10);
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("value in setTimeout", i);
        resolve(i);
      }, i * 1000);
    });
  };
}

const taskList = [
  createAsyncTask(3),
  createAsyncTask(1),
  createAsyncTask(5),
  createAsyncTask(2),
  createAsyncTask(10),
];
asyncParallel(taskList, (result) => {
  console.log("results", result);
});

// in the given taskList it is exceuted based on the less value
// here 1st 1,2,3,5,10