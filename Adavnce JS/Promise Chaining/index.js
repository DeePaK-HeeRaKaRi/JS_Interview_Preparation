// call back hell
// api.createOrder(cart,function(){
//     api.proceedToPayment(function(){
//         api.showOrderSumary()
//     })
// })

// PROMISES
const cart=["shoes","kurtha","pant"]

// createOrder(cart)
// // if anyone we will get reject it will simply execute the catch block 
// // and it will not execute after .then method
//     .then(function(orderId){
//         console.log(orderId)
//         return orderId
//     })
//     // if we want catch only for creating order than place here else place bottom
//     // .catch(function(err){
//     //     console.log(err.message)
//     // })
//     .then(function(orderId){
//         return proceedToPayment(orderId)
//     })
//     .then(function(paymentInfo){
//         console.log(paymentInfo)
//         return paymentInfo
//     })
//     .catch(function(err){
//         console.log(err.message)
//     })
//     .then(function(paymentDetails){
//         console.log('NO matter what happens, i will definitely called')
//     })

function createOrder(cart){
    const pr = new Promise(function(resolve,reject){

        // createOrder
        // validateOrder from db
        console.log('validate',!validCart(cart))
        if(!validCart(cart)){
            const err = new Error('Cart is not valid')
            reject(err)
        }
        // fetch ordreId
        const orderid="12345"
        if(orderid){
            setTimeout(()=>{
                resolve(orderid)
            },2000) 
        }
        else{
            reject(new Error('Order is not valid'))
        }
    })
    return pr
}
function validCart(cart){
    return false
}

function proceedToPayment(orderId){
    return new Promise(function(resolve,reject){
        // setTimeout(()=>{
        //     resolve("Your Payment was Sucessfull")
        // },2000)
        if(!validCart('fhhfdf')){
            reject(new Error('No Payment'))
        }else{
            resolve("Your Payment was Sucessfull");
        }
        
        // const err=new Error('Payment Failed')
        // reject(err)
       
    })
}

createOrder(cart)
// if anyone we will get reject it will simply execute the catch block 
// and it will not execute after .then method
    // console.log('cart is',cart)
    .then(function(orderId){
        console.log('orderid------',orderId)
        return orderId
    })
    // if we want catch only for creating order than place here else place bottom
    .catch(function(err){
        console.log('ordeer-------',err.message)
    })
    .then(function(orderId){
        return proceedToPayment(orderId)
    })
    .then(function(paymentInfo){
        console.log('payment Info ->',paymentInfo)
        return paymentInfo
    })
    .catch(function(err){
        console.log(err.message)
    })
    .then(function(paymentDetails){
        console.log(
          "NO matter what happens, i will definitely called",
          paymentDetails
        );
        return 'okoko1'
    })
    .finally(()=>{
        console.log('FInished----------------')
        return 'okoko'
    })
    .then((dummy)=>{
        console.log('after finished',dummy)
    })
