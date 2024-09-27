class Emitter{
    constructor(){
        this.subscriptions = new Map()
    }

    subscribe(eventName,callback){
        /*
            {
                modify : {
                    "unique-id" : callback
                }
            }
        */
        if(!this.subscriptions.has(eventName)) {
            this.subscriptions.set(eventName,new Map())
        }
        const subscriptionId = Symbol() // returns a unique symbol
        const eventSubscriptions = this.subscriptions.get(eventName)
        eventSubscriptions.set(subscriptionId,callback)
        
        return{
            release:function(){
                if(!eventSubscriptions.has(subscriptionId)) {
                    throw new Error("Subscription is already released !!")
                }
                eventSubscriptions.delete(subscriptionId)
            }
        }
    }

    emit(eventName,...args){

    }
}

const emitter = new Emitter();
let channel = ''
console.log({channel})
const subscription1 = emitter.subscribe('modify',(link)=>{
    channel = link
    console.log({modifiedChannelLink: channel})
})

emitter.emit('modify','devtools.tech/youtube')

console.log({afterRelease: channel})

subscription1.release()

emitter.emit('modify','linkedin.com/deepakheerakari')