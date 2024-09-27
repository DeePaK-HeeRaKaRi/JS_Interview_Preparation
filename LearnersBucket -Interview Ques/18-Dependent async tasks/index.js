class Task {
  constructor(dependencies = [], callback) {
    this.dependencies = dependencies
      ? dependencies.filter(
          (dependency) => dependency instanceof Task && !dependency.isCompleted
        )
      : [];
    // this.dependencies = dependencies;
    this.currentDependenciesCount = this.dependencies?.length;
    this.callback = callback;
    this.isCompleted = false;
    this.subscribeList = []; // store the dependencies list callback to execute its sequence
    this.start();
  }
  start() {
    // console.log('dependecies',this.dependencies)
    // if there is dependency subscribe to each of them
    console.log("this.dependencies--", this.dependencies);
    if (this.dependencies && this.dependencies.length) {
      console.log("Dependent tasks");
      for (let dependency of this.dependencies) {
        // console.log('Dependency',dependency)
        dependency.subscribe(this.trackDependency.bind(this, "tracks"));
      }
    } else {
      console.log("Invoking callback fun directly", this.callback);
      // invoke the callback directly
      // const Done=()=>{
      //     console.log('Task Completed')
      //     this.completed=true
      // }
      this.callback(this.done.bind(this, "not dependent"));
      // this.callback()
      // console.log('this----',this.callback)
    }
  }
  trackDependency(name) {
    console.log("trackDependency---------", this, name);
    this.currentDependenciesCount--;
    if (this.currentDependenciesCount === 0) {
      console.log("------------------------------------------calling");
      this.callback(this.done.bind(this, "dependent task"));
    }
  }
  subscribe(cb) {
    console.log("subscribe--------------", cb);
    this.subscribeList.push(cb);
    console.log("subscribeList---------", this.subscribeList);
  }
  done(name) {
    this.isCompleted = true;
    console.log("helllo", name, this.subscribeList.length);
    for (const callback of this.subscribeList) {
      console.log("callback--------", callback);
      callback();
    }
  }
}
// class Task {
//     constructor(dependencies, callback) {
//       this.dependencies = dependencies;
//       this.callback = callback;
//       this.isCompleted = false;
//       this.start();
//     }

//     start() {
//       if (!this.dependencies || this.dependencies.length === 0) {
//         this.run();
//       } else {
//         this.runDependencies();
//       }
//     }

//     run() {
//       this.callback(() => {
//         // console.log(`Task completed.`);
//         this.isCompleted = true;
//       });
//     }

//     runDependencies() {
//       let completedCount = 0;
//       this.dependencies.forEach((task) => {
//         task.callback(() => {
//           // console.log(`Dependency Task completed.`,task);
//           completedCount++;
//           if (completedCount === this.dependencies.length) {
//             this.run();
//           }
//         });
//       });
//     }
//   }

const processA = new Task(null, (doneCb) => {
  setTimeout(() => {
    console.log("Process A Done", doneCb);
    doneCb();
    // console.log('processA1------------',processA)
  }, 5000);
});
console.log("processA------------", processA);
const processB = new Task([processA], (done) => {
  setTimeout(() => {
    console.log("Process B Done");
    done();
  }, 1000);
});

// const processC = new Task(null, (done) => {
//   setTimeout(() => {
//     console.log("Process C Done");
//     done();
//   }, 1000);
// });
// const processD = new Task([processA, processB], (done) => {
//   setTimeout(() => {
//     console.log("Process D Done");
//     done();
//   }, 1000);
// });

// const processE = new Task([processC, processD], (done) => {
//   setTimeout(() => {
//     console.log("Process E Done");
//     done();
//   }, 100);
// });

// const createAllDoneInstance = (allDoneCallback) =>
//   new Task([processA, processB, processC, processD, processE], allDoneCallback);

// createAllDoneInstance((done) => {
//   console.log("All is done!");
//   done();
// });
