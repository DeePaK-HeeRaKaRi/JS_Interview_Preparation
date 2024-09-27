import createSetTimeout from './setTimeout.js'
function createInterval(){
    var intervalId=1
    // whether intervalId is cleared or not
    var intervalMap={}

    var {setTimeoutPolyfill,cleartimeoutPolyfill}=createSetTimeout()

    function setIntervalPoly(callback,delay){
        var id=intervalId++
        function reIterate(){
            // if(!intervalMap[id]) return
            intervalMap[id]=setTimeoutPolyfill(function(){
                callback()
                //  if id is present call settimeout again
                if(intervalMap[id]){
                    reIterate()
                }else{
                    console.log('No more iterations to be done')
                    return 
                }
            },delay)
        }

        reIterate()
        return id
    }

    function clearIntervalPoly(id){
        // cleartimeoutPolyfill(id)
        if(intervalMap[id]){
            delete intervalMap[id];
        }
        
    }

    
    return {setIntervalPoly,clearIntervalPoly}
}
var {setIntervalPoly,clearIntervalPoly}=createInterval()
var counter=0
var myId=setIntervalPoly(function(){
    console.log('SetInterval Poly')
    counter+=1
    if(counter>=2){
        clearIntervalPoly(myId)
    }
},1000)