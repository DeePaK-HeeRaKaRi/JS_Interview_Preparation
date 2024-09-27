const STATE={
    FULFILLED:'fulfilled',
    PENDING:'pending',
    REJECTED:'rejected'
}
class MyPromise{
    // (resolev,reject) -> cb
    #thenCbs=[]
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
    #runCallbacks(){
        if(this.#state === STATE.FULFILLED){
            this.#thenCbs.forEach(callback => {
                callback(this.#value)
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
        // whenever success or failed we make sure that we dont actually execute the code immmediately just wait for microseconds
        queueMicrotask(() => {
            if(this.#state !== STATE.PENDING) return

            // inside of our success methids we have to handle both promise and values
            // p.then(() => {
                // return new Promise
            //     return "hi"
            // })
            // .then(())
            // so if it has a promise finish that promise
            if(value instanceof MyPromise){
                console.log('yes instance---------')
                value.then(this.#onSuccessBinded,this.#onFailureBinded)
            }
            this.#value=value
            this.#state=STATE.FULFILLED
            this.#runCallbacks()
        })
    }

    #onFail(value){
        // promises always have asynchronously
        // setTimeout(() => {},0)
        queueMicrotask(() => {
            if(this.#state !== STATE.PENDING) return

            if(value instanceof MyPromise){
                value.then(this.#onSuccessBinded,this.#onFailureBinded)
            }
            this.#value=value
            this.#state=STATE.REJECTED
            this.#runCallbacks()
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
        return new MyPromise((resolve,reject) => {
            this.#thenCbs.push(result => {
                // .then().catch().then() so if 1st then is executed we have to skip 2nd catch()
                // .then(()=>{console.log('modfjgnf)})
                if(thenCb == null){
                    resolve(result)
                    return 
                }
                try{
                    // .then(return 'hi').catch().then() hi should passs to the next then
                    // resolve with prev promise
                    return resolve(thenCb(result));
                }catch(error){
                    return reject(error);
                }
            })

            this.#catchCbs.push(result => {
               
                if(catchCb == null){
                    reject(result)
                    return 
                }
                try{
                     
                    return reject(catchCb(result));
                }catch(error){
                    return reject(error);
                }
            })
        })
    }

    catch(cb){
        console.log(cb)
        this.then(undefined,cb)
    }

    finally(cb) {
        // p.then().finally().then() if inside 1st then if we return result it will not pass to finally insted it will go to next then()
        return this.then(result => {
            // dont pass the result to the cb skip it insted return result
            cb()
            return result
        },
        result => {
            cb()
            throw result
        }
        )
    }
    static resolve(value){
        return new MyPromise((resolve) => {
            resolve(value)
        })
    }
    static reject(value){
        return new MyPromise((resolve,reject) => {
            resolve(value)
        })
    }
}
// const p=new MyPromise((resolve,reject) => {
//     setTimeout(() => {
//       // reject(new Error('Deepak '))
//       resolve("Deepak");
//       // resolve('kumar')  need to call only once so keep this check  if(this.#state !== STATE.PENDING) return in above , same will aply to reject

//       // resolve("kumar");
//       // resolve("kumar");
//     },2000)
// })
// p.then((value) => {
//     console.log('result value-',value)
// })
// .catch((err)=>{
//     console.log(err)
     
// })
let cart = ["shoes", "kurtha", "pant"];

function createOrder(cart) {
  const pr = new MyPromise(function (resolve, reject) {
    // createOrder
    // validateOrder from db
    console.log("validate", !validCart(cart));
    if (!validCart(cart)) {
      const err = new Error("Cart is not valid");
      reject(err);
    }
    // fetch ordreId
    const orderid = "12345";
    if (orderid) {
      setTimeout(() => {
        resolve(orderid);
      }, 2000);
    } else {
      reject(new Error("Order is not valid"));
    }
  });
  return pr;
}
function validCart(cart) {
  return false;
}

function proceedToPayment(orderId) {
  return new MyPromise(function (resolve, reject) {
    // setTimeout(()=>{
    //     resolve("Your Payment was Sucessfull")
    // },2000)
    if (!validCart("fhhfdf")) {
      reject(new Error("No Payment"));
    } else {
      resolve("Your Payment was Sucessfull");
    }

    // const err=new Error('Payment Failed')
    // reject(err)
  });
}

createOrder(cart)
  // if anyone we will get reject it will simply execute the catch block
  // and it will not execute after .then method
  // console.log('cart is',cart)
  .then(function (orderId) {
    console.log("orderid------", orderId);
    return orderId;
  })
  // if we want catch only for creating order than place here else place bottom
  .catch(function (err) {
    console.log("ordeer-------", err.message);
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
      "NO matter what happens, i will definitely called",
      paymentDetails
    );
    return "okoko1";
  })
  .finally(() => {
    console.log("FInished----------------");
    return "okoko";
  })
  .then((dummy) => {
    console.log("after finished", dummy);
  });

// module.exports=MyPromise

// inside of our success methids we have to handle both promise and values
// p.then(() => {
    // return new Promise
//     return "hi"
// })
// .then(())

// const res=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         reject(new Error('deepak'))
//     },1000)
// })
// res.then((val)=>{
//     console.log(val)
// })
// .catch((err)=>{
//     console.log(err)
// })