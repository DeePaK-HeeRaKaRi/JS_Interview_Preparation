class BinaryTreeNode{
    constructor(val){
        this.data = val;
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

function printNodesinRange(root,low,high) {
    let ans = []
    function helper(root,low, high) {
        if(root == null) return
    
        if(low < root.data) {
           helper(root.left, low, high)
        }
        
        
        if(root.data < high) {
            helper(root.right, low, high)
        }
        if(low <= root.data && root.data<=high) {
            ans.push(root.data)
        }
        
    }
    helper(root,low,high)
    return ans
}
let inputs = [4,2,10,1,3,7,12,-1,-1,-1,-1,-1,6,11,18,-1,-1,-1,-1,-1,-1]
let root = LevelWiseInput(inputs)
let low = 5
let high =10
console.log(printNodesinRange(root,low,high))
