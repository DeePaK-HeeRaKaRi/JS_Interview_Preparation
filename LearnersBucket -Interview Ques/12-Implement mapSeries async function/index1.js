 

// when you are using combination of map and settimeout you must use the Promise



let mapSeries = async (arr, fn) => {
      let results = [];
      for (let item of arr) {
          try {
              let result = await new Promise((resolve, reject) => {
                  fn(item, (error, resp) => {
                      if (error) {
                          reject(`failed at ${item} position`);
                      } else {
                          resolve(resp);
                      }
                  });
              });
              console.log('--------result',result)
              results.push(result);  
          } catch (error) {
              throw new Error(error)
          }
      }
      return results
}


let result = mapSeries([1, 2, 3, 6, 4, 5], function(num, callback) {
  setTimeout(() => {
      num = num * 2;
      console.log(num);
      if (num == 12) {
          callback(true);
      } else {
          callback(null, num);
      }
  }, 3000);
});

result
  .then((resp) => {
      console.log('success', resp);
  })
  .catch((err) => {
      console.log('Error -> ', err);
  });


/*
Loop starts
→ setTimeout registered (Timers API)
→ await pauses async function
→ timer expires
→ callback enters Macrotask Queue
→ Event Loop pushes callback to Call Stack
→ resolve() schedules Microtask
→ callback finishes
→ Microtask Queue drains
→ async function resumes

Event loop always executes ALL microtasks before the next macrotask
*/