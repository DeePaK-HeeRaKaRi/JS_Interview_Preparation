// console.log("hello");
const circuitBreaker = (fn, failureCount, delay) => {
  let failures = 0;
  let serviceUnavailable = false;
  let timeSinceLastFailed = 0;
  return function (...args) {
    if (serviceUnavailable) {
      const diff = Date.now() - timeSinceLastFailed;

      if (diff > delay) {
        serviceUnavailable = false;
        console.log("Service is available from now",diff);
      } else {
        console.error(`Service unavailable for ${delay}ms`);
        return;
      }
    }
    try {
      const result = fn.apply(this, args);
      failures = 0;
      return result;
    } catch (err) {
      console.log(err);
      failures += 1;
      timeSinceLastFailed = Date.now();
      if (failures >= failureCount) {
        serviceUnavailable = true;
      }
    }
  };
};

// test function
const testFunction = () => {
  let count = 0;

  return function () {
    count++;
    if (count < 4) {
      throw "failed";
    } else {
      return "hello";
    }
  };
};

let t = testFunction();
let c = circuitBreaker(t, 3, 1000);
c();
c();
c();

c();
c();
c();
c();
c();
c();
c();
c();
c();
c();
// Now try after 3000ms 
setTimeout(() => {
  console.log(c());
}, 2000);
setTimeout(() => {
  console.log(c());
}, 3000);
setTimeout(() => {
  console.log(c());
}, 4000);
