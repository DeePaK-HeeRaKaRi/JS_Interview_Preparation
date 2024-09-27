function createSetTimeout(){
    // setTimeout returns a timerID for ClearTimeout
    var timerID=1
    // storing all of the setTimeouts and when someonecalls cleartimeout id, we are going to remove timer from the map
    // before setTimeout execution it will checkin the map that iam in the map or not,if iam not in the map my d was cleared
    // if id is present and timehas come execute it
    var timerMap={}
    function setTimeoutPolyfill(callback,delay,...args){
        var id=timerID++
        timerMap[id]=true
        var start=Date.now()    //timestamp in millisec
        // after every millisec check have we crossed the delay or not
        function triggerCallback(){
            if(!timerMap[id]) return
            if(Date.now() > start+delay){
                callback.apply(this,args) 
            }
            else{
                // due to recursion we will get max callstack size excedded when we give delay for 1000 ms
                // triggerCallback()
                requestIdleCallback(triggerCallback)
            }
        }
        requestIdleCallback(triggerCallback)
        return id
    }

    function cleartimeoutPolyfill(id){
        delete timerMap[id]
    }
    return {setTimeoutPolyfill,cleartimeoutPolyfill}
}
// var {setTimeoutPolyfill,cleartimeoutPolyfill}=createSetTimeout()
// console.log('start')

// var myId=setTimeoutPolyfill(function(){
//     console.log('Welcome to JSCafe 3000')
// },3000)
// var myId2=setTimeoutPolyfill(function(name){
//     console.log('Welcome to JSCafe 2000')
//     console.log(name,"------------")
// },2000,"deepak")
// var myId3=setTimeoutPolyfill(function(name){
//     console.log('Welcome to JSCafe 1000')
//     console.log(name,"------------")
// },1000,"kumar")
// // cleartimeoutPolyfill(myId)
// console.log('end')

export default createSetTimeout