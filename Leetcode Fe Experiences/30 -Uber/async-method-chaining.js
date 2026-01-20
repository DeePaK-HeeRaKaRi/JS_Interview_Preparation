

class UberDriver {
    constructor() {
        console.log('Hello uber driver is online')
        this.queue = Promise.resolve()
    }
    /*
    pick(passenger) {
        console.log(`User ${passenger} is picked`)
        return this
    }

    drop(passenger) {
        console.log(`${passenger} dropped`)
        return this
    }
    */

    /*
    drive(duration) {
        console.log('Driver is driving')
        this.delay(duration).then(() => {
            return this // intially it will return undefined, so we cannot chain it further
        })
    }
    */

    /*
    async drive(duration) {
        console.log('Driver is driving')
        this.delay(duration) // Async function will return promise, we need to use .then() > new UberDriver().driver().then() -- CHAIN BREAKS
       return this
    }
    */
    pick(passenger) {
        this.queue = this.queue.then(() => {
            console.log(`User ${passenger} is picked`)
        })
        return this
    }


    drop(passenger) {
        this.queue = this.queue.then(() => {
            console.log(`${passenger} dropped`)
        })
        return this
    }

    delay(duration) {
        return new Promise((resolve) => {
           setTimeout(() => {
                resolve()
           },duration*1000)
        })
    }

    drive(duration) {
        this.queue = this.queue.then(async() => {
            console.log(`Driver is driving - Waiting for ${duration} seconds`)
            await this.delay(duration)
        })
        return this
    }
    rest(duration) {
        this.queue = this.queue.then(async() => {
            console.log(`Driver is in ofline mode`)
            await this.delay(duration)
        })
        return this
    }
   
}
new UberDriver()
  .pick("TestUser")
  .pick("Rahul")
  .drive(2)
  .pick("Deepak")
  .drop("Rahul")
  .drive(4)
  .drop("TestUser")
  .rest(10);

  /*
JavaScript does not pause execution for Promises.
If pick and drop are not chained, they execute immediately on the call stack, while drive schedules async work.
Using a shared promise queue forces all operations—sync or async—into the microtask chain, ensuring strict ordering

  */