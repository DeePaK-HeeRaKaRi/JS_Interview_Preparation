/**
 * Read FAQs section on the left for more information on how to use the editor
**/
/**
* Do not change the class name
**/

class Emitter {
    // write your code here
       constructor() {
         this.events = new Map()
       }
   
       subscribe(event_name,cb){
         const hasEventName = this.events.has(event_name)
         if(!hasEventName) {
           this.events.set(event_name,[cb])
         }else{
           const existing_callbacks = this.events.get(event_name)
           console.log(existing_callbacks)
           this.events.set(event_name,[...existing_callbacks,cb])
         }
   
         return{
           release:()=>{
             const getEvents = this.events.get(event_name)
             const filterCbs = getEvents.filter(curr => curr!=cb)
             this.events.set(event_name,filterCbs)
           }
         }
       }
   
       emit(event_name,data){ 
         const getEvents = this.events.get(event_name)
         getEvents.forEach((cb) => {
           cb.call(this,data)
         })
       }
}
const callback1 = (a,b) => {
  console.log('--------',a,b)
}
const callback2 = (a,b) => {
  console.log('--------',a,b)
}
const emitter = new Emitter();
const sub1 = emitter.subscribe('event_name', callback1);
// you can have multiple callbacks to the same event
const sub2 = emitter.subscribe('event_name', callback2);

emitter.emit('event_name', 'foo', 'bar');

sub1.release();