// const STATE = {
//   PENDING: "pending",
//   FULFILLED: "fulfilled",
//   REJECTED: "rejected",
// };
// class MyPromise {
//   #thenCbs = [];
//   #catchCbs = [];
//   #value;
//   #state = STATE.PENDING;
//   #onSuccessBind = this.#onSuccess.bind(this);
//   #onFailureBind = this.#onFailure.bind(this);
//   constructor(cb) {
//     try {
//       cb(this.#onSuccessBind, this.#onFailureBind);
//     } catch (e) {
//       this.#onFailure(err);
//     }
//   }
//   #runCallBacks() {
//     if (this.#state === STATE.FULFILLED) {
//       this.#thenCbs.forEach(callBack => {
//         callBack(this.#value);
//       });
//       this.#thenCbs = [];
//     }
//     if (this.#state === STATE.REJECTED) {
//       this.#catchCbs.forEach(callBack => {
//         callBack(this.#value);
//       });

//       this.#catchCbs = [];
//     }
//   }
//   #onSuccess(result) {
//     queueMicrotask(() => {
//       if (this.#state !== STATE.PENDING) return;

//       if (result instanceof MyPromise) {
//         result.then(this.#onSuccessBind, this.#onFailureBind);
//       }
//       this.#value = result;
//       this.#state = STATE.FULFILLED;
//       this.#runCallBacks();
//     });
//   }

//   #onFailure(result) {
//     queueMicrotask(() => {
//       if (this.#state !== STATE.PENDING) return;
//       if (result instanceof MyPromise) {
//         result.then(this.#onSuccessBind, this.#onFailureBind);
//       }
//       this.#value = result;
//       this.#state = STATE.REJECTED;
//       this.#runCallBacks();
//     });
//   }

//   then(thenCb, catchCb) {
//     return new MyPromise((resolve, reject) => {
//       this.#thenCbs.push((result) => {
//         //  then('hii)
//         if (thenCb == null) {
//           resolve(result);
//           return;
//         }
//         try {
//           resolve(thenCb(result));
//         } catch (err) {
//           reject(err);
//         }
//       });

//       this.#catchCbs.push((result) => {
//         if (catchCb == null) {
//           reject(result);
//           return;
//         }
//         try {
//           reject(catchCb(result));
//         } catch (error) {
//           reject(error);
//         }
//       });
//     });
//   }
//   catch(cb) {
//     // this.#catchCbs.push(val);
//     this.then(undefined, cb);
//   }
//   finally(cb) {
//     return this.then(
//       (result) => {
//         cb();
//         return result;
//       },
//       (result) => {
//         cb();
//         throw result;
//       }
//     );
//   }
// }

// const cart = ["shoes", "kurtha", "pant"];

// function createOrder(cart) {
//   const pr = new MyPromise(function (resolve, reject) {
//     // createOrder
//     // validateOrder from db
//     console.log("validate", !validCart(cart));
//     if (!validCart(cart)) {
//       const err = new Error("Cart is not valid");
//       reject(err);
//     }
//     // fetch ordreId
//     const orderid = "12345";
//     if (orderid) {
//       setTimeout(() => {
//         resolve(orderid);
//       }, 2000);
//     } else {
//       reject(new Error("Order is not valid"));
//     }
//   });
//   return pr;
// }
// function validCart(cart) {
//   return false;
// }

// function proceedToPayment(orderId) {
//   return new MyPromise(function (resolve, reject) {
//     // setTimeout(()=>{
//     //     resolve("Your Payment was Sucessfull")
//     // },2000)
//     if (!validCart("fhhfdf")) {
//       reject(new Error("No Payment"));
//     } else {
//       resolve("Your Payment was Sucessfull");
//     }

//     // const err=new Error('Payment Failed')
//     // reject(err)
//   });
// }

// createOrder(cart)
//   // if anyone we will get reject it will simply execute the catch block
//   // and it will not execute after .then method
//   // console.log('cart is',cart)
//   .then(function (orderId) {
//     console.log("orderid------", orderId);
//     return orderId;
//   })
//   // if we want catch only for creating order than place here else place bottom
//   .catch(function (err) {
//     console.log("ordeer-------", err.message);
//   })
//   .then(function (orderId) {
//     return proceedToPayment(orderId);
//   })
//   .then(function (paymentInfo) {
//     console.log("payment Info ->", paymentInfo);
//     return paymentInfo;
//   })
//   .catch(function (err) {
//     console.log(err.message);
//   })
//   .then(function (paymentDetails) {
//     console.log(
//       "NO matter what happens, i will definitely called",
//       paymentDetails
//     );
//     return "okoko1";
//   })
//   .finally(() => {
//     console.log("FInished----------------");
//     return "okoko";
//   })
//   .then((dummy) => {
//     console.log("after finished", dummy);
//   });
const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #thenCbs = [];
  #catchCbs = [];
  #value;
  #state = STATE.PENDING;
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailureBind = this.#onFailure.bind(this);

  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailureBind);
    } catch (err) {
      this.#onFailure(err);
    }
  }

  #runCallBacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((callBack) => {
        callBack(this.#value);
      });
      this.#thenCbs = [];
    }
    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((callBack) => {
        callBack(this.#value);
      });
      this.#catchCbs = [];
    }
  }

  #onSuccess(result) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (result instanceof MyPromise) {
        result.then(this.#onSuccessBind, this.#onFailureBind);
      }

      this.#value = result;
      this.#state = STATE.FULFILLED;
      this.#runCallBacks();
    });
  }

  #onFailure(result) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (result instanceof MyPromise) {
        result.then(this.#onSuccessBind, this.#onFailureBind);
      }

      this.#value = result;
      this.#state = STATE.REJECTED;
      this.#runCallBacks();
    });
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (thenCb == null) {
          resolve(result);
          return;
        }
        try {
          return resolve(thenCb(result));
        } catch (err) {
          return reject(err);
        }
      });

      this.#catchCbs.push((result) => {
        if (catchCb == null) {
          reject(result);
          return;
        }
        try {
          return reject(catchCb(result));
        } catch (error) {
          return reject(error);
        }
      });
    });
  }

  catch(cb) {
    return this.then(undefined, cb);
  }

  finally(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
      }
    );
  }
}

const cart = ["shoes", "kurtha", "pant"];

function createOrder(cart) {
  return new MyPromise(function (resolve, reject) {
    console.log("validate", validCart(cart));
    if (!validCart(cart)) {
      const err = new Error("Cart is not valid");
      reject(err);
    }

    const orderId = "12345";
    if (orderId) {
      setTimeout(() => {
        resolve(orderId);
      }, 2000);
    } else {
      reject(new Error("Order is not valid"));
    }
  });
}

function validCart(cart) {
  return true; // Return true for a valid cart
}

function proceedToPayment(orderId) {
  return new MyPromise(function (resolve, reject) {
    if (!validCart(cart)) {
      reject(new Error("No Payment"));
    } else {
      resolve("Your Payment was Successful");
    }
  });
}

createOrder(cart)
  .then(function (orderId) {
    console.log("orderid------", orderId);
    return orderId;
  })
  .catch(function (err) {
    console.log("order-------", err.message);
  })
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log("payment Info ->", paymentInfo);
    return paymentInfo;
  })
  .catch(function (err) {
    console.log(err.message);
  })
  .then(function (paymentDetails) {
    console.log(
      "No matter what happens, I will definitely be called",
      paymentDetails
    );
    return "okoko1";
  })
  .finally(() => {
    console.log("Finished----------------");
    return "okoko";
  })
  .then((dummy) => {
    console.log("after finished", dummy);
  });
