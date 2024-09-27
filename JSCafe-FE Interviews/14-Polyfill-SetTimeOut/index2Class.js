// class CustomTimeout {
//   constructor() {
//     this.timerID = 1;
//     this.timerMap = {};
//   }

//   setTimeoutPolyfill(callback, delay, ...args) {
//     if (typeof callback !== "function") {
//       throw new Error("Callback should be a function");
//     }

//     const id = this.timerID++;
//     this.timerMap[id] = true;
//     const start = Date.now();
//     console.log('args---------',args)
//     const triggerCallback = () => {
//       if (!this.timerMap[id]) return;
//       let elapsedTime = Date.now() - start
//     //   if (Date.now() > start + delay) {
//      if(elapsedTime >= delay){
//         callback.apply(this, args);
//         this.clearTimeoutPolyfill(id);
//       } else {
//         requestIdleCallback(triggerCallback);
//       }
//     };

//     triggerCallback();
//     return id;
//   }

//   clearTimeoutPolyfill(id) {
//     console.log("------------clearTimeout", this.timerMap, id);
//     if (this.timerMap[id]) {
//       delete this.timerMap[id];
//     }
//   }
// }

// const customTimeout = new CustomTimeout();
// console.log("start");

// const myId = customTimeout.setTimeoutPolyfill(() => {
//   console.log("Welcome to JSCafe 3000");
// }, 3000);
// console.log("myId", myId);
// // customTimeout.clearTimeoutPolyfill(myId);
// const myId2 = customTimeout.setTimeoutPolyfill(
//   (name) => {
//     console.log("Welcome to JSCafe 2000");
//     console.log(name, "------------");
//   },
//   2000,
//   "deepak"
// );
// // customTimeout.clearTimeoutPolyfill(myId2);
// console.log("myId2", myId2);

// const myId3 = customTimeout.setTimeoutPolyfill(
//   (name) => {
//     console.log("Welcome to JSCafe 1000");
//     console.log(name, "------------");
//   },
//   1000,
//   "kumar"
// );
// console.log("myId3", myId3);

// console.log("end");

// // const myId4= customTimeout.setTimeoutPolyfill('okok',4000,'dummy')

// console.log("start");

// // Set a timeout for 3 seconds using setTimeout
// const myId = setTimeout(() => {
//   console.log("Welcome to JSCafe 3000");
// }, 3000);
// console.log("myId", myId);

// // Clear the timeout for myId (which was set for 3 seconds) using clearTimeout
// clearTimeout(myId);

// // Set a timeout for 2 seconds using setTimeout
// const myId2 = setTimeout(
//   (name) => {
//     console.log("Welcome to JSCafe 2000");
//     console.log(name, "------------");
//   },
//   2000,
//   "deepak"
// );
// console.log("myId2", myId2);

// // Set a timeout for 1 second using setTimeout
// const myId3 = setTimeout(
//   (name) => {
//     console.log("Welcome to JSCafe 1000");
//     console.log(name, "------------");
//   },
//   1000,
//   "kumar"
// );
// console.log("myId3", myId3);

// console.log("end");



function createSetTimeOutPolyfill(){
    let timerID = 1
    let timerMap = {}

    function setTimeoutPolyfill(callback,delay,...args) {
      const Id = timerID
      timerMap[Id] = true
      timerID+=1
      let startTime = Date.now()  //1000
      function triggerCallback() {
        // console.log('fjofjo')
        if(!timerMap[Id]) return
        let currTime = Date.now() //1003
        let elapsedTime = currTime - startTime //1003-1000=3
        if(elapsedTime >=  delay) {
          console.log('-----------------',timerMap)
          callback.apply(this,args)
          delete timerMap[Id]
        }else{
          requestIdleCallback(triggerCallback)
        }
      }
      triggerCallback()
      return Id;
    }

    function clearTimeOutPolyfill(id) {
      if(timerMap.hasOwnProperty(id)){
        delete timerMap[id]
      }
    }

    return {setTimeoutPolyfill,clearTimeOutPolyfill}
}

var {setTimeoutPolyfill,clearTimeOutPolyfill} = createSetTimeOutPolyfill()

let test1 = setTimeoutPolyfill(()=>{
  console.log('Hello - 3')
},3000)

console.log(test1)
clearTimeOutPolyfill(test1)
let test2 = setTimeoutPolyfill(()=>{
  console.log('Hello - 4')
},4000)
console.log(test2)