// let has block scope, meaning it is scoped within the current loop iteration. 
// Each iteration gets its own copy of i, so the value of i inside the setTimeout callback will be the correct value for that iteration.

for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log(i); // This prints 1, 2, 3,..., 10 as expected
    }, i * 1000);
  }
// var, on the other hand, has function scope, meaning it would not create a new scope for each iteration of the loop. 
// Instead, all callbacks would share the same i, and by the time the setTimeout callbacks run, i would have the final value from the loop (which is 11 after the loop finishes).

for (var i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log(i); // This will print 11 ten times, because `i` is function-scoped
    }, i * 1000);
  }
  

// In summary, let should be used because it creates a new binding for each iteration of the loop, which ensures the correct value is captured inside the setTimeout callback.