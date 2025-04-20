function findLargestTreeRoot(childToParent) {
    const parentToChildren = new Map();
    const allNodes = new Set();
  
    // Step 1: Build parent -> [children] map and collect all nodes
    for (const [child, parent] of Object.entries(childToParent)) {
      if (!parentToChildren.has(parent)) {
        parentToChildren.set(parent, []);
      }
      parentToChildren.get(parent).push(Number(child));
      allNodes.add(Number(child));
      allNodes.add(Number(parent));
    }
  
    // Step 2: Find root nodes (those not in child keys)
    const childNodes = new Set(Object.keys(childToParent).map(Number));
    const rootNodes = [...allNodes].filter(node => !childNodes.has(node));
  
    // Step 3: BFS/DFS from each root to count size
    let maxSize = 0;
    let largestRoot = null;
  
    const countSize = (node) => {
      let size = 1;
      const stack = [node];
      while (stack.length > 0) {
        const current = stack.pop();
        const children = parentToChildren.get(current) || [];
        size += children.length;
        stack.push(...children);
      }
      return size;
    };
  
    for (const root of rootNodes) {
      const size = countSize(root);
      if (size > maxSize) {
        maxSize = size;
        largestRoot = root;
      }
    }
  
    return largestRoot;
  }
  
  // Example input
  const input = {
    1: 2,
    3: 4
  };
  
  console.log(findLargestTreeRoot(input)); // Output: 2
  