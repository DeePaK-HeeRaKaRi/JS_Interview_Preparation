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

const debounce_ = (fn,delay,options = {leading : false, trailing: true}) => {
    let timer
    let isLeadingInvoked = false
    return function(...args){
        const context = this
        // for trailing case
        if(timer) {
            clearTimeout(timer)
        }

        if(options.leading && !timer) {
            fn.apply(context,[...args])
            isLeadingInvoked = true
        }
        else {
            isLeadingInvoked = false
        }

        timer = setTimeout(() => {
            if(options.trailing && !isLeadingInvoked) {
                fn.apply(context,[...args])
            }

            timer = null // for precations
        },delay)
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


