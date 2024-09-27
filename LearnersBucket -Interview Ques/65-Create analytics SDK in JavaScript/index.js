class SDK {
  constructor() {
    this.queue = [];
    this.count = 1;
  }
  wait=()=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(this.count %5 === 0){
            reject()
        }else{
            resolve()
        }
    },1000)
  })
  logEvent=(event)=>{
    this.queue.push(event)
  }
  sendAnalytics=async function(){
    if(this.queue.length === 0) {
        console.log("-------------------");
        console.log('Queue is Empty')
        console.log("-------------------");
        return
    }
    const current=this.queue.shift()
    try{
        // wait for 1sec
        await this.wait()

        console.log("analytics sent",current)
        this.count++
    }catch(e){
        console.log('----------------------------')
        console.log('Failing to send',current)
        console.log('Retrying to send',current)
        console.log("----------------------------");
        
        this.count=1
        // pushing the event back to queue
        this.queue.unshift(current)
    }finally{
        // call the same function again for remaining items in the queue
        this.sendAnalytics()
    }
  }
  send = async function () {
    this.sendAnalytics();
  };
}
const sdk=new SDK()

sdk.logEvent("event 1")
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7")
sdk.logEvent("event 8")
sdk.logEvent("event 9")
sdk.logEvent("event 10");
sdk.logEvent("event 11");
sdk.logEvent("event 12");
sdk.logEvent("event 13")
sdk.logEvent("event 14");
sdk.logEvent("event 15");

sdk.send()