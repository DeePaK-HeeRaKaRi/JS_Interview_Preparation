// shift -> pop 0th idex element
// unshift -> add at 0th index element
console.log(Date.now())
const My_Timer={
    timerId:1,
    queue:[],
    setTimeOutPolyfill:function(callback,delay,...args){
        // console.log("djj",callback,delay)
        const id=this.timerId++
        this.queue.push({
            id,
            callback,
            time:Date.now() + delay,
            args
        })

        // sort the queue in ascending order
        this.queue.sort((a,b)=>a.time-b.time)
        return id
    },
    clearTimeOutPolyfill:function(removeId){
        this.queue=this.queue.filter(({id}) => id!==removeId)
    },
    // to run
    // run:function(){
    //     while(true){
    //         // console.log("hellllo")
    //         const entry=this.queue.shift()
    //         const {id,callback,time,args}=entry

    //         if(Date.now() >= time){
    //             // invoke the callback
    //             callback.call(this,"deepak")
    //         }else{
    //             // console.log('entru',entry)
    //             this.queue.unshift(entry)
    //         }

    //         if(this.queue.length===0){
    //             break
    //         }
    //     }
    // }
    run: function () {
        const processQueue = () => {
            if (this.queue.length === 0) return;
        
            const entry = this.queue[0]; // Peek the first entry
            if (Date.now() >= entry.time) {
                const { id, callback, args } = this.queue.shift();
                callback.apply(this, args);
            }
        
            // Schedule the next check
            if (this.queue.length > 0) {
                requestAnimationFrame(processQueue);
            }
        };
        
        processQueue(); // Start the loop
    }
}

My_Timer.setTimeOutPolyfill((name) => {
    console.log(1,name)
}, 2500);
My_Timer.setTimeOutPolyfill(() => {
    console.log(2)
}, 1000);
My_Timer.setTimeOutPolyfill(() => {
    console.log(3)
}, 2500);
My_Timer.setTimeOutPolyfill(() => {
    console.log(4)
}, 3000);
My_Timer.run();