 

// when you are using combination of map and settimeout you must use the Promise



let mapSeries = (arr, fn) => {
  return new Promise(async(resolve, reject) => {
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
              return reject(error);
          }
      }
      resolve(results);
      // return results
  });
};


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
