class BinaryTreeNode{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function LevelWiseInput(values) {
    let getInputData = values.shift()
    let root = new BinaryTreeNode(getInputData)
    let queue = []
    queue.push(root)
    let currentNode = null
    let leftValue = null
    let rightValue = null
    while(queue.length > 0) {
        currentNode = queue.shift()
        leftValue = values.shift()
        if(leftValue !== -1) {
            left = new BinaryTreeNode(leftValue)
            currentNode.left = left
            queue.push(left)
        }
        rightValue = values.shift()
        if(rightValue !== -1) {
            right = new BinaryTreeNode(rightValue)
            currentNode.right = right
            queue.push(right)
        }
    }
    return root
}
function printLevelWiseTree(root) {
    if(root === null) return;
    let queue = [root]
    let currNode = null
    let res = []
    let level = []
    let n = 0
    while(queue.length > 0) {
        level = []
        n = queue.length
        for(let i=0;i<n;i++) {
            currNode = queue.shift()
            level.push(currNode.val)
            if(currNode.left) {
                queue.push(currNode.left)
            }
            if(currNode.right) {
                queue.push(currNode.right)
            }
        }
        res.push(level)
    }
    return res
}
let inputs = [1,2,3,4,5,6,7,-1,-1,-1,-1,-1,-1,-1,-1]
let root = LevelWiseInput(inputs)
console.log(printLevelWiseTree(root))
