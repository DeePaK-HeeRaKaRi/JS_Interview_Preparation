
//https://leetcode.com/discuss/post/4491831/meta-frontend-async-handler-fe-promises-dw5nv/

/* Default execution is FIFO
Execute two operations at a time
If two actions continously happening , the third one should go into the queue

*/

class QueueCallBacks {
    constructor(order = 'FIFO', max_callbacks = 6) {
        this.order = order;
        this.callbacks_queue = [] 
        this.count_callbacks = 0
        this.max_callbacks = max_callbacks
    }

    process(callback){
        
        if(this.count_callbacks < 2) {
            this.count_callbacks++
            callback().
            then((item) => console.log(item))
            .catch((err) => console.log(err))
            .finally(() => {
                this.count_callbacks--
                this.executeNext()
            })
        }
        else {
            if(this.callbacks_queue.length < this.max_callbacks) {
                this.callbacks_queue.push(callback)
            }    
        }
    }

    executeNext() {
       if(this.callbacks_queue.length > 0) {
            const next_callback = this.order === 'FIFO' ? this.callbacks_queue.shift() : this.callbacks_queue.pop()
            this.process(next_callback)
       }
    }
}

let dummyAPI = (index) => {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`API call ${index} completed in ${index} seconds`)
            }, index*1000)
        })
    }
}

// const asyncCallbacks = new QueueCallBacks()
const asyncCallbacks = new QueueCallBacks('LIFO')
asyncCallbacks.process(dummyAPI(1))
asyncCallbacks.process(dummyAPI(2))
asyncCallbacks.process(dummyAPI(3))
asyncCallbacks.process(dummyAPI(4))
asyncCallbacks.process(dummyAPI(5))
asyncCallbacks.process(dummyAPI(6))
asyncCallbacks.process(dummyAPI(7))
asyncCallbacks.process(dummyAPI(8))
asyncCallbacks.process(dummyAPI(9))
asyncCallbacks.process(dummyAPI(10))
asyncCallbacks.process(dummyAPI(11))