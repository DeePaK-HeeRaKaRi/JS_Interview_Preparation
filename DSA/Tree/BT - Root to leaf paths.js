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
function rootToLeafs(root) {
   
    function getRootToLeafs(root) {
        if(root == null) {
            return
        }
        currPath.push(root.val)
        if(root?.left == null && root?.right == null) {
            let t=currPath.reduce((prev,curr) => `${prev}${curr}->`,'').slice(0,-2)
            result.push(t)
            console.log(currPath,t)
        }
    
        getRootToLeafs(root.left)
        getRootToLeafs(root.right)
        currPath.pop()
        return
    }
    let result = []
    let currPath = []
    getRootToLeafs(root)
    return result
}
let inputs = [1,2,3,4,5,-1,-1,-1,-1,6,7,-1,-1,-1,-1]
inputs = [1,2,4,3,-1,-1,-1,-1,-1]
let root = LevelWiseInput(inputs)
console.log(rootToLeafs(root))
// console.log(printLevelWiseTree(root))
