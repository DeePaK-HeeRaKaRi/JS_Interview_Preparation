let count=0
const counter=()=>{
    console.log('Counter--',count++)
}
/*
const throttle=(fn,delay)=>{
    let interval
    let lastRun
    return function(){
        let context=this
        let args=arguments
        if(!lastRun){
            fn.apply(context,args)
            lastRun=Date.now()
        }else{
            clearTimeout(interval)
            interval=setTimeout(()=>{
                if(Date.now()-lastRun>=delay){
                    fn.apply(context,args)
                    lastRun =Date.now()
                }
                console.log(Date.now()-lastRun - delay)
            },delay-(Date.now()-lastRun))
        }
    }
}
*/
const throttle=(fn,delay)=>{
    let interval
    let lastRun=true
    return function(...args){
        let context=this
        let args1=args
        if(lastRun){
            fn.apply(context,args1)
            lastRun=false
            setTimeout(()=>{
                lastRun=true
            },delay)
        }
    }
}
const throttled=throttle(counter,2500)
window.addEventListener('mousemove',throttled,false)



// What is the difference between debouncing and throttling?

// ● Debouncing:- It is used to invoke/call/execute functions only
// when things have stopped happening for a given specific time.
// For example, Call a search function to fetch the result when the
// user has stopped typing in the search box. If the user keeps on
// typing then reset the function.

// ● Throttling:- It is used to restrict the no of time a function can be
// called/invoked/executes. For example, making an API call to the
// server on the user’s click. If the user spam’s the click then also
// there will be specific calls only. Like, make each call after 10
// seconds.