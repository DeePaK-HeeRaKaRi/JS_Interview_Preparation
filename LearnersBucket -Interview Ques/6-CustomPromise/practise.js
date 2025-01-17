const STATE = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected'
};

class MyPromise {
  // Private fields for maintaining state and callbacks
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING;
  #value;
  
  // Bind success and failure methods for consistent `this`
  #onSuccessBinded = this.#onSuccess.bind(this);
  #onFailureBinded = this.#onFail.bind(this);

  constructor(cb) {
      try {
          // Execute the callback with the bound resolve and reject methods
          cb(this.#onSuccessBinded, this.#onFailureBinded);
      } catch (e) {
          // If the callback throws an error, reject the promise
          this.#onFail(e);
      }
  }

  // Method to execute all stored callbacks based on the current state
  #runCallbacks() {
      if (this.#state === STATE.FULFILLED) {
          // Execute all `then` callbacks with the resolved value
          this.#thenCbs.forEach(callback => callback(this.#value));
          this.#thenCbs = []; // Clear callbacks after execution
      }
      if (this.#state === STATE.REJECTED) {
          // Execute all `catch` callbacks with the rejection reason
          this.#catchCbs.forEach(callback => callback(this.#value));
          this.#catchCbs = []; // Clear callbacks after execution
      }
  }

  // Private method to handle successful resolution
  #onSuccess(value) {
      queueMicrotask(() => {
          if (this.#state !== STATE.PENDING) return; // Ignore if promise is already settled
          // inside of our success methids we have to handle both promise and values
            // p.then(() => {
                // return new Promise
            //     return "hi"
            // })
            // .then(())
            // so if it has a promise finish that promise
          if (value instanceof MyPromise) {
              // If the value is another promise, chain it
              value.then(this.#onSuccessBinded, this.#onFailureBinded);
              return;
          }

          this.#value = value; // Store the resolved value
          this.#state = STATE.FULFILLED; // Update state to fulfilled
          this.#runCallbacks(); // Execute stored callbacks
      });
  }

  // Private method to handle rejection
  #onFail(value) {
      queueMicrotask(() => {
          if (this.#state !== STATE.PENDING) return; // Ignore if promise is already settled

          if (value instanceof MyPromise) {
              // If the value is another promise, chain it
              value.then(this.#onSuccessBinded, this.#onFailureBinded);
              return;
          }

          this.#value = value; // Store the rejection reason
          this.#state = STATE.REJECTED; // Update state to rejected
          this.#runCallbacks(); // Execute stored callbacks
      });
  }

  // Method to add `then` callbacks for chaining
  then(thenCb, catchCb) {
      return new MyPromise((resolve, reject) => {
          this.#thenCbs.push(result => {
              if (!thenCb) {
                  resolve(result); // Pass value if no `then` callback is provided
                  return;
              }
              try {
                  resolve(thenCb(result)); // Resolve with the result of the callback
              } catch (error) {
                  reject(error); // Reject if callback throws an error
              }
          });

          this.#catchCbs.push(result => {
              if (!catchCb) {
                  reject(result); // Pass rejection reason if no `catch` callback is provided
                  return;
              }
              try {
                  resolve(catchCb(result)); // Resolve with the result of the catch callback
              } catch (error) {
                  reject(error); // Reject if callback throws an error
              }
          });

          this.#runCallbacks(); // Trigger callback execution
      });
  }

  // Method to add `catch` callbacks for handling rejections
  catch(cb) {
      return this.then(undefined, cb); // Forward to `then` with undefined success callback
  }

  // Method to add `finally` callbacks for cleanup actions
  finally(cb) {
      return this.then(
          result => {
              cb(); // Execute cleanup callback
              return result; // Pass the resolved value to the next handler
          },
          error => {
              cb(); // Execute cleanup callback
              throw error; // Re-throw the rejection to propagate it
          }
      );
  }

  // Static method to resolve a value immediately
  static resolve(value) {
      return new MyPromise(resolve => resolve(value));
  }

  // Static method to reject a value immediately
  static reject(value) {
      return new MyPromise((_, reject) => reject(value));
  }
}

// Custom function simulating an async task
function asyncTask(message, delay, shouldReject = false) {
  return new MyPromise((resolve, reject) => {
      setTimeout(() => {
          if (shouldReject) {
              reject(`${message} failed!`); // Reject with failure message
          } else {
              resolve(`${message} succeeded!`); // Resolve with success message
          }
      }, delay);
  });
}

// Demonstrating the usage of custom MyPromise
asyncTask("Order processing", 1000)
  .then(result => {
      console.log(result); // "Order processing succeeded!"
      return asyncTask("Payment processing", 2000);
  })
  .catch(error => {
      console.error("Error during order processing:", error);
      return "Recovered from order processing error.";
  })
  .then(result => {
      console.log(result); // "Payment processing succeeded!"
      return asyncTask("Shipment processing", 1500);
  })
  .finally(() => {
      console.log("Cleaning up after order processing...");
  })
  .then(result => {
      console.log(result); // "Shipment processing succeeded!"
      return asyncTask("Notification sending", 500);
  })
  .catch(error => {
      console.error("Error during shipment processing:", error);
  })
  .finally(() => {
      console.log("Cleaning up after shipment...");
  })
  .then(result => {
      console.log(result); // "Notification sending succeeded!"
      return asyncTask("Final confirmation", 1000, true); // This will fail
  })
  .catch(error => {
      console.error("Error during final confirmation:", error);
  })
  .finally(() => {
      console.log("Final cleanup after confirmation...");
  })
  .then(() => {
      console.log("Order process completed!");
  })
  .catch(error => {
      console.error("Order process failed:", error);
  })
  .finally(() => {
      console.log("Global cleanup after entire process...");
  });
