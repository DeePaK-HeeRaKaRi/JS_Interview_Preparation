class TaskScheduler {
  constructor() {
    this.high = []
    this.normal = []
    this.processing = false
  }

  add(task, priority = 'normal') {
    priority === 'high' ? this.high.push(task) : this.normal.push(task)
    this.run()
  }

  async run() {
    if (this.processing) return
    this.processing = true

    while (this.high.length || this.normal.length) {
      const task = this.high.length
        ? this.high.shift()
        : this.normal.shift()

      await task()
    }

    this.processing = false
  }
}


class UberDriver {
  constructor() {
    console.log('Driver online')
    this.scheduler = new TaskScheduler()
  }

  pick(passenger, priority = 'normal') {
    this.scheduler.add(
      async () => {
        console.log(`Picked ${passenger}`)
      },
      priority
    )
    return this
  }

  drive(duration) {
    this.scheduler.add(async () => {
      console.log(`Driving for ${duration}s`)
      await new Promise(r => setTimeout(r, duration * 1000))
    })
    return this
  }

  drop(passenger) {
    this.scheduler.add(async () => {
      console.log(`Dropped ${passenger}`)
    })
    return this
  }
}


new UberDriver()
  .pick("NormalUser")
  .drive(5)
  .pick("NormalUser2")
  .pick("VIPUser", "high")
  .drop("NormalUser2")


  /*
Picked NormalUser
Driving for 5s
Picked VIPUser
Picked NormalUser2
Dropped NormalUser2


  */