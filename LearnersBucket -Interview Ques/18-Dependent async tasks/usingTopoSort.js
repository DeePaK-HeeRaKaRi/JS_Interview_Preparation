class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNodes(node) {
    // console.log(node);
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  // Directed Graph
  addEdges(u, v) {
    if (this.adjacencyList.has(u) && this.adjacencyList.has(v)) {
      this.adjacencyList.get(u).push(v);
    } else {
      throw new Error("Invalid Edges", u, v);
    }
  }

  topologicalSort() {
    const queue = [];
    const result = [];
    const indegree = new Map();
    const adjListKeys = this.adjacencyList.keys();
    const adjValues = this.adjacencyList.values();
    console.log("-adjListKeys-", adjListKeys);
    console.log("-adjValues-", adjValues);

    // Set keys to 0
    for (const key of adjListKeys) {
      indegree.set(key, 0);
    }

    // calculate indegree
    for (const values of adjValues) {
      for (const i of values) {
        indegree.set(i, indegree.get(i) + 1);
      }
    }

    for (const [node, degree] of indegree.entries()) {
      if (degree == 0) {
        queue.push(node);
      }
    }

    while (queue.length > 0) {
      const currNode = queue.shift();
      result.push(currNode);
      for (const node of this.adjacencyList.get(currNode)) {
        indegree.set(node, indegree.get(node) - 1);
        if (indegree.get(node) === 0) {
          queue.push(node);
        }
      }
    }
    return result;
  }
}

function executeTasks(taskSchedules) {
  const graph = new Graph();

  // instialising Nodes
  taskSchedules.forEach((task) => {
    graph.addNodes(task.id);
    if (task.dependencies.length > 0) {
      task.dependencies.forEach((dependency) => {
        graph.addNodes(dependency);
      });
    }
  });

  // Adding Nodes [Directed Graph] u > v

  taskSchedules.forEach((task) => {
    if (task.dependencies.length > 0) {
      task.dependencies.forEach((dependency) =>
        graph.addEdges(dependency, task.id)
      );
    }
  });

  // Topologicalsort [BFS]
  const executeTasks = graph.topologicalSort();

  return executeTasks;
}
const schedules = [
  { id: "a", dependencies: ["b", "c"] },
  { id: "b", dependencies: ["d"] },
  { id: "c", dependencies: ["e"] },
  { id: "d", dependencies: [] },
  { id: "e", dependencies: ["f"] },
  { id: "f", dependencies: [] },
];

console.log(executeTasks(schedules));
