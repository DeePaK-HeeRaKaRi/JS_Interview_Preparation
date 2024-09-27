
export const Debounce = (fn,delay)=>{
    let timerID
    return function(){
        let context = this
        let args = arguments 
        console.log('args--------',args)
        clearTimeout(timerID)
        timerID = setTimeout(() => {
            fn.apply(context,args)
        },delay)
    }
}