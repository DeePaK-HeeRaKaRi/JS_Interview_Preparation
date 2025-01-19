const STATE={
    FULFILLED:'fulfilled',
    PENDING:'pending',
    REJECTED:'rejected'
}

/*
The private fields like #thenCbs, #catchCbs, #state, and #value are declared outside the constructor for several key reasons:
Clarity and Modern JavaScript Practices:
Cleaner Constructor:
Default Values:
Consistency and Maintainability:
No Dependence on Constructor Arguments:

*/
class MyPromise{
    // (resolev,reject) -> cb
    #thenCbs=[] //If two diff callbacks run on the success , so take array
    #catchCbs=[]
    #state=STATE.PENDING
    #value
    // for chaining this willl mess up so use binding
    #onSuccessBinded=this.#onSuccess.bind(this)
    #onFailureBinded=this.#onFail.bind(this)
    constructor(cb){
        try{
            console.log('-cb',cb)
            cb(this.#onSuccessBinded,this.#onFailureBinded)
        }
        catch(e){
            this.#onFail(e)
        } 
    }
     // Method to execute all stored callbacks based on the current state
    #runCallbacks(){
        if(this.#state === STATE.FULFILLED){
            this.#thenCbs.forEach(callback => {
                callback(this.#value)  // Call each 'then' callback with the value
            })
            // .then() .then() new promise so previous callbacks should be removed
            this.#thenCbs=[]
        }
        if(this.#state === STATE.REJECTED){
            this.#catchCbs.forEach(callback => {
                callback(this.#value)
            })
            // .catch() .catch() new promise so previous callbacks should be removed
            this.#catchCbs=[]
        }
    }
    //  #it should not be accessed outside of the class
    #onSuccess(value){
        console.log('------------value',value)
        /*
        const promise = new Promise((resolve, reject) => {
            resolve('First resolve');
            resolve('Second resolve');
            reject('This will be ignored');
            });

            promise.then((result) => {
            console.log(result); // Output: 'First resolve'
            });

            Remianing will ingred so keep a check
        */
        // whenever success or failed we make sure that we dont actually execute the code immmediately just wait for microseconds
        queueMicrotask(() => {
            if(this.#state !== STATE.PENDING) return // Prevent further processing if the promise is not pending

            // inside of our success methids we have to handle both promise and values
            // p.then(() => {
                // return new Promise
            //     return "hi"
            // })
            // .then(())
            // so if it has a promise finish that promise
            if(value instanceof MyPromise){
                console.log('yes instance---------')
                value.then(this.#onSuccessBinded,this.#onFailureBinded) // Chain this promise if it’s another MyPromise
                return
            }
            this.#value=value // Store the value (resolved value)
            this.#state=STATE.FULFILLED // Change state to 'fulfilled'
            this.#runCallbacks()  // Run any stored 'then' callbacks
        })
    }

    #onFail(value){
        // promises always have asynchronously
        // setTimeout(() => {},0)
        queueMicrotask(() => {
            if(this.#state !== STATE.PENDING) return // Prevent further processing if the promise is not pending

            if(value instanceof MyPromise){
                value.then(this.#onSuccessBinded,this.#onFailureBinded) // Chain this promise if it’s another MyPromise
                return
            }
            this.#value=value // Store the error (rejection reason)
            this.#state=STATE.REJECTED // Change state to 'rejected'
            this.#runCallbacks()  // Run any stored 'catch' callbacks
        })
        
    }
    // .then(() => {})
    // store in array because .then().then()
    // then(thenCb,catchCb){
    //     // .then(() => {},())
    //     if(thenCb!=null){
    //         this.#thenCbs.push(thenCb)
    //     }
    //     if(catchCb!=null){
    //         this.#catchCbs.push(catchCb)
    //     }
        
    //     // for multiple thens
    //     this.#runCallbacks()
    // }

    // chaining
    // p.then(()=>{},()=>{})  then catch
    then(thenCb,catchCb){
        // console.log('-----------then',thenCb,catchCb)
         // Return a new MyPromise to enable chaining
        return new MyPromise((resolve,reject) => {
          // Store success callback to execute when promise is fulfilled

        //   resolve("Hi") > result will take hi
            this.#thenCbs.push(result => {
                // .then().catch().then() so if 1st then is executed we have to skip 2nd catch()
                // .then(()=>{console.log('modfjgnf)})
                if(!thenCb){
                    resolve(result)  // Resolve if no 'then' callback is provided
                    return 
                }
                try{
                    // .then(return 'hi').catch().then() hi should passs to the next then
                    // resolve with prev promise
                    resolve(thenCb(result));
                }catch(error){
                    reject(error);
                }
            })

            this.#catchCbs.push(result => {
               
                if(!catchCb){
                    reject(result)
                    return 
                }
                try{
                     
                     reject(catchCb(result));
                }catch(error){
                     reject(error);
                }
            })
            this.#runCallbacks(); 
        })
    }

    // Method to handle .catch() chaining (only for rejection)
    catch(cb){
        console.log(cb)
        return this.then(undefined,cb)   // Pass the 'catch' callback to the 'then' method
    }

    // Method to handle .finally() chaining
    finally(cb) {
      return this.then(
          result => {
            cb() // Execute cleanup callback
              // Pass the resolved value to the next handler.
              return result;
          },
          error => {
              cb()
              // Pass the rejection reason to the next handler.
              throw error;
          }
      );
  }

  // Static method to resolve a promise with a given value
    static resolve(value){
        return new MyPromise((resolve) => { resolve(value)  }) // Immediately resolve the promise with the given value
    }
 
    // Static method to reject a promise with a given value
    static reject(value) {
      return new MyPromise((resolve, reject) => { reject(value) });// Corrected to use reject

  }
  
}

// Custom function simulating an async task
function asyncTask(message, delay, shouldReject = false) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (shouldReject) {
              reject(`${message} failed!`);
          } else {
              resolve(`${message} succeeded!`);
          }
      }, delay);
  });
}

// Simulating jumbled usage of then, catch, and finally with multiple steps
asyncTask("Order processing", 1000)
  .then((result) => {
      console.log(result);  // Order processing succeeded!
      return asyncTask("Payment processing", 2000);
  })
  .catch((error) => {
      console.error("Error during order processing:", error);  // Not executed unless the first task fails
      return "Recovered from order processing error.";
  })
  .then((result) => {
      console.log(result);  // Payment processing succeeded!
      return asyncTask("Shipment processing", 1500);
  })
  .finally(() => {
      console.log("Cleaning up after order processing...");  // Always executed after any task
  })
  .then((result) => {
      console.log(result);  // Shipment processing succeeded!
      return asyncTask("Notification sending", 500);
  })
  .catch((error) => {
      console.error("Error during shipment processing:", error);  // Not executed unless shipment task fails
  })
  .finally(() => {
      console.log("Cleaning up after shipment...");  // Always executed after shipment task
  })
  .then((result) => {
      console.log(result);  // Notification sending succeeded!
      return asyncTask("Final confirmation", 1000, true);  // This will fail
  })
  .catch((error) => {
      console.error("Error during final confirmation:", error);  // Final confirmation failed
  })
  .finally(() => {
      console.log("Final cleanup after confirmation...");  // Always executed after final confirmation task
  })
  .then(() => {
      console.log("Order process completed!");
  })
  .catch((error) => {
      console.error("Order process failed:", error);  // Catch final error if any
  })
  .finally(() => {
      console.log("Global cleanup after entire process...");  // Always executed after everything
  });


// Example usage of MyPromise with createOrder and proceedToPayment functions
// let cart = ["shoes", "kurtha", "pant"];

// function createOrder(cart) {
//     const pr = new MyPromise(function (resolve, reject) {
//         console.log("validate", !validCart(cart));
//         if (!validCart(cart)) {
//             const err = new Error("Cart is not valid");
//             reject(err);  // Reject if the cart is not valid
//         }
//         const orderid = "12345";
//         if (orderid) {
//             setTimeout(() => {
//                 resolve(orderid);  // Resolve with the order ID after a delay
//             }, 2000);
//         } else {
//             reject(new Error("Order is not valid"));  // Reject if the order ID is invalid
//         }
//     });
//     return pr;
// }

// function validCart(cart) {
//     return false;  // Simulating a validation failure
// }

// function proceedToPayment(orderId) {
//     return new MyPromise(function (resolve, reject) {
//         if (!validCart("fhhfdf")) {
//             reject(new Error("No Payment"));  // Reject if cart validation fails
//         } else {
//             resolve("Your Payment was Sucessfull");  // Resolve if payment is successful
//         }
//     });
// }

// // Chaining promises with then/catch/finally
// createOrder(cart)
//     .then(function (orderId) {
//         console.log("orderid------", orderId);
//         return orderId;
//     })
//     .catch(function (err) {
//         console.log("ordeer-------", err.message);
//     })
//     .then(function (orderId) {
//         return proceedToPayment(orderId);  // Proceed to payment if order creation succeeds
//     })
//     .then(function (paymentInfo) {
//         console.log("payment Info ->", paymentInfo);
//         return paymentInfo;
//     })
//     .catch(function (err) {
//         console.log(err.message);  // Catch any errors in the process
//     })
//     .then(function (paymentDetails) {
//         console.log("NO matter what happens, i will definitely called", paymentDetails);
//         return "okoko1";
//     })
//     .finally(() => {
//         console.log("FInished----------------");
//         return "okoko";  // 'finally' is always executed at the end
//     })
//     .then((dummy) => {
//         console.log("after finished", dummy);
//     });
