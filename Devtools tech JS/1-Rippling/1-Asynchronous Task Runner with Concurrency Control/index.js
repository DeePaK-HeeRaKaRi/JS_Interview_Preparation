class TaskRunner{
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.limit = 0
        this.tasks = []
    }

    async push(task) {
       
        if(this.limit < this.concurrency) {
            await this.executeTask(task) // t1 , t2, t3 , t4[queu] , t2 time exceeded
        }
        else {
           this.tasks.push(task)
        }
    }

    async executeTask(task) {
        this.limit++
        try{
            await task()
        }catch(err){
            throw new Error(err)
        }
        finally{
            this.limit--
            this.executeQueueTasks()
        }
        
    }

    async executeQueueTasks() {
        if(this.limit <= this.concurrency && this.tasks.length > 0) {
            console.log('Executing from queue tasks')
            const currTask = this.tasks.shift()
            await this.executeTask(currTask)
        }
    }
}


const ex =new TaskRunner(3);
const delay =async(time) => {
    return new Promise((resolve,reject) => {
        const timer = setTimeout(() => {
            resolve('Promise has been resolved')
        },time)
    })
}

const delay2 =async(time) => {
    return new Promise((resolve,reject) => {
        const timer = setTimeout(() => {
            reject('Promise has been rejected')
        },time)
    })
}
// Simulated async tasks
const t1 = async () => { 
    console.log('t1 started'); 
    await delay(2000); 
    console.log('t1 finished'); 
};
const t2 = async () => { console.log('t2 started'); await delay(1000); console.log('t2 finished'); };
const t3 = async () => { console.log('t3 started'); await delay(1500); console.log('t3 finished'); };
const t4 = async () => { console.log('t4 started'); await delay(1000); console.log('t4 finished'); };
const t5 = async () => { console.log('t5 started'); await delay(1000); console.log('t5 finished'); };
const t6 = async () => { console.log('t6 started'); await delay(2500); console.log('t6 finished'); };
const t7 = async () => { console.log('t7 started'); await delay(3500); console.log('t7 finished'); };
const t8 = async () => { console.log('t8 started'); await delay(4500); console.log('t8 finished'); };
// Add tasks to the executor
ex.push(t1);  // Starts immediately
ex.push(t2);  // Starts immediately
ex.push(t3);  // Starts immediately
await ex.push(t4);  // Waits until at least one task finishes , executes after t2 is done
await ex.push(t5);  // Waits until another task finishes , executes after t3 is done
ex.push(t6);  // Waits until another task finishes , executes after t4 is done
ex.push(t7); // Waits until another task finishes , executes after t1 is done
ex.push(t8); // Waits until another task finishes , executes after t3 is done

// console.log('------tasks',ex.tasks)