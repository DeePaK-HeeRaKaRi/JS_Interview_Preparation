class BinaryTreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function treeInput(values) {
    // let rootData = parseInt(prompt("Enter node value:"));
    if(values.length == 0) {
        return null
    }
    let rootData = values.shift()
    if (rootData === -1) {
        return null;
    }
    let root = new BinaryTreeNode(rootData);
    let leftTree = treeInput(values);
    let rightTree = treeInput(values);
    root.left = leftTree;
    root.right = rightTree;
    return root;
}

function printTree(root) {
    if (root === null) {
        return;
    }
    console.log(root.data);
    printTree(root.left);
    printTree(root.right);
}

// pre-order - root-left-right
function printDetailedTree(root) {
    if (root === null) {
        return;
    }
    let output = root.data + ":";
    if (root.left !== null) {
        output += "L" + root.left.data + ",";
    }
    if (root.right !== null) {
        output += "R" + root.right.data;
    }
    console.log(output);
    printDetailedTree(root.left);
    printDetailedTree(root.right);
}

function removeLeaves(root) {
    if (root === null) {
        return null;
    }
    if (root.left === null && root.right === null) {
        return null;
    }
    root.left = removeLeaves(root.left);
    root.right = removeLeaves(root.right);
    return root;
}

// To simulate the input in the browser, you might want to call the functions using a certain sequence of prompts.
// The following is an example of how you might test the code in the browser.
let inputValues = [1,2,4,-1,-1,5,-1,-1,3,-1,7,-1,-1]
let root = treeInput(inputValues);
printDetailedTree(root);
let RL = removeLeaves(root);
printDetailedTree(RL);
