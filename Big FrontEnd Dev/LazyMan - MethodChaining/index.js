class ALazyMan{
    constructor(name,log){
      this.name = name
      this.log = log
      this.normalTasks = []
      this.priorityTasks = []
      this.greet()
    //   setTimeout(() => this.startExecute(),0)
    queueMicrotask(() => this.startExecute()); // Ensures tasks are added first
    //Critically, setTimeout(() => this.startExecute(), 0) schedules startExecute() to run after the current synchronous execution finishes.
    }
  
    greet(){
      this.normalTasks.push(['greet',this.name])
      return this
    }
    eat(food){
      this.normalTasks.push(['eat',food])
      return this
    }
  
    sleep(sec) {
      this.normalTasks.push(['timer',sec])
      return this
    }
  
    sleepFirst(sec) {
      this.priorityTasks.push(['timer',sec])
      return this
    }
  
    startExecute(){
      let task = this.priorityTasks.shift()
      if(!task) {
        task = this.normalTasks.shift()
      }
  
      if(!task) {
        return
      }
  
      const [type,param] = task
  
      switch(type){
        case 'greet':
          this.log(`Hi, I'm ${param}.`)
          this.startExecute()
          return
        case 'eat':
          this.log(`Eat ${param}.`)
          this.startExecute()
          return
        case 'timer':
          setTimeout(() => {
            this.log(`Wake up after ${param} second${param > 1 ? 's' :''}.`)
            this.startExecute()
            return
          },param*1000)
          
      }
    }
  
  }
  function LazyMan(name, logFn) {
    // your code here
    
    return new ALazyMan(name,logFn)
        
  }
  
  LazyMan('Jack', console.log)
  .eat('banana')
    .sleepFirst(3)
    .eat('apple')
    .sleep(1)

// Wake up after 10 seconds.
// Hi, I'm Jack.
// Eat banana
// Eat apple
// Wake up after 1 second.

/*
LazyMan('Jack', console.log)
  .eat('banana')
  .sleep(10)
  .eat('apple')
  .sleep(1)
// Hi, I'm Jack.
// Eat banana.
// Wake up after 10 seconds.
// Eat Apple.
// Wake up after 1 second.


LazyMan('Jack', console.log)
  .eat('banana')
  .eat('apple')
// Hi, I'm Jack.
// Eat banana.
// Eat Apple.

*/