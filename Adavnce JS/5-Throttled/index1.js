// Throttle by count
// throttle will be invoked once per 4 clicks
function throttle(fn,count,span){
    let counter = 0
    return function(...args) {
        counter += 1
        span.innerHTML = counter
        if(counter !== count){ 
            return
        }
        fn.apply(this, args);
        span.innerHTML = 'Calling function'
        counter = 0
        
    }
}
const onClick = () => {
    console.log('clicked')
}
const span = document.getElementById('clicked')
console.log('------',span)
const throttleClick = throttle(onClick,4,span)
const btn =document.getElementById('btn')
btn.addEventListener("click", throttleClick);