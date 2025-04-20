//https://leetcode.com/discuss/post/6444811/goldman-sachs-coderpad-graphs-by-anonymo-kcqx/

function getDressingOrder(items, dependencyMapping) {
    const graph = new Map();      // Adjacency list
    const inDegree = new Map();   // Count of incoming edges

    // Initialize graph and inDegree for all items
    for (const item of items) {
        graph.set(item, []);
        inDegree.set(item, 0);
    }

    // Build the graph
    for (const [item, deps] of Object.entries(dependencyMapping)) {
        for (const dep of deps) {
            graph.get(dep).push(item);        // dep -> item
            inDegree.set(item, inDegree.get(item) + 1);
        }
    }

    // Start with all items that have no dependencies
    const queue = [];
    for (const [item, degree] of inDegree.entries()) {
        if (degree === 0) queue.push(item);
    }

    const order = [];

    while (queue.length > 0) {
        const current = queue.shift();
        order.push(current);

        for (const neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Check for cycles (i.e. invalid dependency)
    return order.length === items.length ? order : [];
}

const items = ["shirt", "pants", "underpants", "vest", "socks", "shoes", "belt", "watch"];
const dependencyMapping = {
    shirt: ["vest"],
    pants: ["underpants"],
    shoes: ["pants", "socks"],
    belt: ["pants"]
};

console.log(getDressingOrder(items, dependencyMapping));
