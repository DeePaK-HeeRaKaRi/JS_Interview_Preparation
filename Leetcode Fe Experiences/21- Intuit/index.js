//https://javascriptinterviewquestions.com/2020/05/intuit-front-end-developer-interview-questions-experience.html											

// How will setTimeOut respond inside for loop and using IIFE and let inside it

//When using var, the loop variable is function-scoped, meaning all the callbacks share the same variable instance. 
// As a result, the loop runs to completion, 
// and the final value of the loop variable will be the same in all the setTimeout callbacks.

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output after 1 second:
// 3
// 3
// 3

// When using let, the loop variable is block-scoped, meaning a new instance of the variable is created for each iteration. 
// Each callback will close over its own instance of the loop variable.
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output after 1 second:
// 0
// 1
// 2


//An IIFE can be used to create a new scope and "capture" the value of the loop variable in each iteration. This works even
//  if var is used because the value of i is passed into the IIFE, effectively making it scoped to the function.
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 1000);
  })(i);
}
// Output after 1 second:
// 0
// 1
// 2
