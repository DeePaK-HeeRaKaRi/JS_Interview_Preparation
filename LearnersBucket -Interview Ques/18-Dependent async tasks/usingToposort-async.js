class Graph {
    constructor() {
      this.adjacencyList = new Map();
    }
  
    addNodes(node) {
      if (!this.adjacencyList.has(node)) {
        this.adjacencyList.set(node, []);
      }
    }
  
    addEdges(u, v) {
      if (this.adjacencyList.has(u) && this.adjacencyList.has(v)) {
        this.adjacencyList.get(u).push(v);
      } else {
        throw new Error("Invalid Edges", u, v);
      }
    }
  
    topologicalSort(taskMap) {
      const queue = [];
      const indegree = new Map();
  
      // Initialize indegree for each node
      for (const key of this.adjacencyList.keys()) {
        indegree.set(key, 0);
      }
  
      // Calculate indegree
      for (const values of this.adjacencyList.values()) {
        for (const node of values) {
          indegree.set(node, indegree.get(node) + 1);
        }
      }
  
      // Add nodes with 0 indegree to the queue
      for (const [node, degree] of indegree.entries()) {
        if (degree === 0) {
          queue.push(node);
        }
      }
  
      console.log("Task execution order:");
  
      // Perform topological sort and execute tasks
      const executeNextTask = () => {
        if (queue.length === 0) {
          console.log("All tasks have been executed.");
          return;
        }
  
        const currNode = queue.shift();
        // console.log(`Starting task: ${currNode}`);
        const fn = taskMap.get(currNode)
        fn(() => {
        //   console.log(`Completed task: ${currNode}`);
          for (const neighbor of this.adjacencyList.get(currNode)) {
            indegree.set(neighbor, indegree.get(neighbor) - 1);
            if (indegree.get(neighbor) === 0) {
              queue.push(neighbor);
            }
          }
          executeNextTask(); // Continue execution of the next task
        });
      };
  
      executeNextTask();
    }
  }
  
  function executeTasks(taskSchedules) {
    const graph = new Graph();
  
    // Initialize nodes
    taskSchedules.forEach((task) => {
      graph.addNodes(task.id);
      if (task.dependencies.length > 0) {
        task.dependencies.forEach((dependency) => {
          graph.addNodes(dependency);
        });
      }
    });
  
    // Add edges for dependencies
    taskSchedules.forEach((task) => {
      if (task.dependencies.length > 0) {
        task.dependencies.forEach((dependency) =>
          graph.addEdges(dependency, task.id)
        );
      }
    });
  
    // Map tasks by ID for easy lookup
    const taskMap = new Map(taskSchedules.map((task) => [task.id, task.fn]));
    console.log('---Task Maop',taskMap)
    // Perform topological sort and execute tasks
    graph.topologicalSort(taskMap);
  }
  
  // Define task schedules
  const schedules = [
    {
      id: "a",
      dependencies: ["b", "c"],
      fn: taskA,
    },
    {
      id: "b",
      dependencies: ["d"],
      fn: taskB,
    },
    {
      id: "c",
      dependencies: ["e"],
      fn: taskC,
    },
    {
      id: "d",
      dependencies: [],
      fn: taskD,
    },
    {
      id: "e",
      dependencies: ["f"],
      fn: taskE,
    },
    {
        id: "f",
        dependencies: [],
        fn: taskF,
      },
  ];
  
  // Task definitions
  function taskA(done) {
    console.log("Task A Completed");
    done();
  }
  function taskB(done) {
    setTimeout(() => {
      console.log("Task B Completed");
      done();
    }, 2000);
  }
  function taskC(done) {
    setTimeout(() => {
      console.log("Task C Completed");
      done();
    }, 200);
  }
  function taskD(done) {
    console.log("Task D Completed");
    done();
  }
  function taskE(done) {
    console.log("Task E Completed");
    done();
  }

  function taskF(done) {
    setTimeout(() => {
      console.log("Task F Completed");
      done();
    }, 500);
  }
  
  // Execute the tasks
  executeTasks(schedules);
  