function createSetTimeout(){
    // setTimeout returns a timerID for ClearTimeout
    var timerID=1
    // storing all of the setTimeouts and when someonecalls cleartimeout id, we are going to remove timer from the map
    // before setTimeout execution it will checkin the map that iam in the map or not,if iam not in the map my d was cleared
    // if id is present and timehas come execute it
    var timerMap={}
    function setTimeoutPolyfill(callback,delay,...args){
        console.log('---calling settimeout',callback,delay)
        if(typeof callback !== 'function'){
            throw new Error('Callback should be a function')
        }
        var id=timerID++
        timerMap[id]=true
        var start=Date.now()    //timestamp in millisec
        // after every millisec check have we crossed the delay or not
        function triggerCallback(){
            // console.log('timerMap',timerMap)
            if(!timerMap[id]) return
            if(Date.now() > start+delay){
                callback.apply(this,args) 
            }
            else{
                // due to recursion we will get max callstack size excedded when we give delay for 1000 ms
                // triggerCallback()
                requestIdleCallback(triggerCallback)
                //  requestIdleCallback() within an idle callback function to schedule another callback to take place no sooner than the next pass through the event loop.
            }
        }
        // requestIdleCallback(triggerCallback)
        triggerCallback()
        return id
    }
    function cleartimeoutPolyfill(id){
        console.log('------------clearTimeOut',timerMap,id)
        if(timerMap[id]){
            delete timerMap[id];
        }
    }
    return {setTimeoutPolyfill,cleartimeoutPolyfill}
}
var {setTimeoutPolyfill,cleartimeoutPolyfill}=createSetTimeout()
console.log('start')

var myId=setTimeoutPolyfill(function(){
    console.log('Welcome to JSCafe 3000')
},3000)
console.log('myId',myId)

var myId2=setTimeoutPolyfill(function(name){
    console.log('Welcome to JSCafe 2000')
    console.log(name,"------------")
},2000,"deepak")
cleartimeoutPolyfill(myId2);
console.log('myId2',myId2)
var myId3=setTimeoutPolyfill(function(name){
    console.log('Welcome to JSCafe 1000')
    console.log(name,"------------")
},1000,"kumar")

console.log('myId3',myId3)
// cleartimeoutPolyfill(myId)
console.log('end')



// Role of requestIdleCallback
// requestIdleCallback allows the browser to pause the execution of the recursive function until the browser is idle. 
// This gives the browser time to process other tasks, clear the call stack, and avoid the overflow issue.

// What Happens Without requestIdleCallback
// If you directly call triggerCallback() recursively:

// The function is called repeatedly in a tight loop.
// Each call adds a new frame to the call stack.
// If the stack grows too large (due to too many nested calls), it results in the "maximum call stack size exceeded" error.