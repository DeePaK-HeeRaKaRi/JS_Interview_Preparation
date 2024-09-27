class Task {
  constructor(dependencies, callback) {
    this.dependencies = dependencies || [];
    this.callback = callback;
    this.completed = false;
  }

  execute() {
    if (this.dependencies.length === 0) {
      this.callback(() => {
        this.completed = true;
      });
    } else {
      const pendingDependencies = this.dependencies.filter(
        (task) => !task.completed
      );
      if (pendingDependencies.length === 0) {
        this.callback(() => {
          this.completed = true;
        });
      } else {
        const tasks = pendingDependencies.map((task) => task.execute());
        Promise.all(tasks).then(() => {
          this.callback(() => {
            this.completed = true;
          });
        });
      }
    }
  }
}

const processA = new Task(null, (done) => {
  setTimeout(() => {
    console.log("Process A");
    done();
  }, 100);
});

const processB = new Task([processA], (done) => {
  setTimeout(() => {
    console.log("Process B");
    done();
  }, 1500);
});

const processC = new Task(null, (done) => {
  setTimeout(() => {
    console.log("Process C");
    done();
  }, 1000);
});

const processD = new Task([processA, processB], (done) => {
  setTimeout(() => {
    console.log("Process D");
    done();
  }, 1000);
});

const processE = new Task([processC, processD], (done) => {
  setTimeout(() => {
    console.log("Process E");
    done();
  }, 100);
});

const createAllDoneInstance = (allDoneCallback) => {
  const tasks = [processA, processB, processC, processD, processE];
  const allDoneTask = new Task(tasks, allDoneCallback);
  return allDoneTask;
};

createAllDoneInstance(() => {
  console.log("All is done!");
}).execute();
