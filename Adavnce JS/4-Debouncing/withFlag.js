let count=0
const incrementCount=()=>{
    console.log('count----',count++)
}
const debounce=(fn,delay,flag)=>{
    let timer
    return function(...args){
        let context=this
        
        const callNow=flag && !timer
        clearTimeout(timer)
        timer=setTimeout(()=>{

            if(!flag){
                fn.apply(context,[...args])
            }
            
        },delay)

        if(callNow){
            fn.apply(context,[...args])
        }
    }
}
// const betterFunction=debounce(incrementCount,500,false)



function onMouseMove(e){
    console.clear();
    console.log(e.x, e.y);
  }
  
  // define the debounced function
  const debouncedMouseMove = debounce(onMouseMove, 1500, false);
  
  // call the debounced function on every mouse move
  window.addEventListener('mousemove', debouncedMouseMove);


