 
let counter = 0;
const getData = (value,...args) => {
  // do api call here
  console.log('-val',value)
  console.log("Key Pressed----------", counter++, value,this.name,...args);
  
};
 

const debounce = (fn, d) => {
  // fn will not call again and again
  let timer;

  return function () {
    // console.log('args--',...args)
    // let context = this;
    let context = this
    let args1 = arguments;
    console.log('args1',args1)
    // let args1=[...args]
    // console.log('context',context)
    // args=arguments
    // console.log('args',args1)
    // if the key stokes occurs between that delay we have to clear timeout
    // whenever a new function call is made we have to clear this timeout

    clearTimeout(timer);
    timer = setTimeout(() => {
     
      fn.apply(context, args1);
    
    }, d);
  };
};

const betterFunction=debounce(function(e){
  getData(e.target.value)
},1000)
betterFunction('deeepak')
betterFunction('kumar')
// const betterFunction=debounce(getData(e),500)

// In JavaScript, the value of `this` refers to the context in which a function is executed. 
// The specific value of `this` depends on how a function is called or invoked.

// In the code you provided, `context = this` is used to capture the value of `this` from the surrounding scope and store it in the `context` variable. 
// The `context` variable is then used inside the `debounce` function to ensure that the original context is preserved when the debounced function (`fn`) is eventually called.

// By capturing the value of `this` in `context`, the `debounce` function ensures that the original context is maintained when calling the `fn` function using `fn.apply(context, args)`. 
// This allows the `fn` function to access the properties and methods of the original context within its execution.