
//How do you make a function that only calls input function f every 50 milliseconds?


function throttle(fn,delay) {
    let lastCall = Date.now()
    return function(...args) {
        let currCall = Date.now()

        if(currCall - lastCall >= delay) {
            fn.apply(this,args)
            lastCall = Date.now()
        }
    }
}

function logMessage(data) {
    console.log('---------data',data,Date.now())
}

const throttledMessage = throttle(logMessage,500)

const intervalID = setInterval(() => throttledMessage('hello world'), 50)

setTimeout(() => {
    clearInterval(intervalID)
    console.log('-interval cleared')
},5000)