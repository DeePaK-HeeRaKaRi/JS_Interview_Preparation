//https://leetcode.com/discuss/post/6970499/

function Queue(processorFn, onCompleteFn, concurrency) {
    const items = []
    const functionsMap = {}
    let itemsInProgress = 0

    const onUnShift = (tasks) => {
        const list = Array.isArray(tasks) ? tasks : [tasks]
        items.unshift(...list)
        if(itemsInProgress < concurrency) {
            startProcessing()
        }
    }

     const onPush = (tasks) => {
        const list = Array.isArray(tasks) ? tasks : [tasks]
        items.push(...list)
        if(itemsInProgress < concurrency) {
            startProcessing()
        }
    }

    const onError = (fn) => functionsMap['error'] = fn

    const onDrain = (fn) => functionsMap['drain'] = fn

    const startProcessing = () => {
        if(items.length > 0 && itemsInProgress < concurrency) {
            // Get the concurrent tasks from the queue
            let tasks = items.splice(0,concurrency)
            for(let task of tasks) {
                //incease the tasks count
                itemsInProgress++

                processorFn(task,(msg,err) => {

                    if(err) {
                        const errorFn = functionsMap['error']
                        errorFn?.(err,task)
                    }
                    else {
                        onCompleteFn(msg,err,task)
                        console.log('message-',msg)
                    }

                    itemsInProgress--
                    startProcessing()
                })
            }

            if(items.length == 0 && itemsInProgress == 0) {
                const drainiFn = functionsMap['drain']
                drainiFn?.()
            }
        }
    }

    return {
        push: onPush,
        unshift: onUnShift,
        drain: onDrain,
        error: onError,

    }
}

const processorFn = (task,callback) => {
    setTimeout(() => {
        console.log('Processing task ' + task.name)
        callback(`${task.name} done`,false)

        // callback(null,`${task.name} error`)
    },200)
}


const onCompleteFn = (data, error, task) => {
    console.log('Task has completed processing: ', task.name, error, Date.now());
}

const myQueue = new Queue(processorFn, onCompleteFn, 2);

// add some items to the queue
myQueue.push({name: 'foo'});

// add some items to the queue (batch-wise)
myQueue.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}]);

// Add items after a certain timeout
setTimeout(() => {
  myQueue.push([{name: 'x'}, {name: 'y'}, {name: 'z'}, {name: 'w'} ]);
}, 600);

// assign a listener when the queue does not have any pending items
myQueue.drain(function() {
    console.log('all items have been processed');
});

// assign an error listener
myQueue.error(function(err, task) {
    console.error('task experienced an error', err, task);
});

// FOLLOW UP: add some items to the front of the queue
// myQueue.unshift({name: 'bar'});