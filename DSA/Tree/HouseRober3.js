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


var rob = function(root) {
    
    if(!root) {
        return [0,0] //pick,notpick
    }

    let left = rob(root.left)
    let right = rob(root.right)

    let res = []
    let pick = root.val + left[1] + right[1] // left[1],right[1] > if we take roor, we should not take the child [those are directly connected]
    let notPick = Math.max(...left) + Math.max(...right) // We need to take the maximum from left and right as they willnot belong to the same parent
    res.push(pick)
    res.push(notPick)
    return res

    // TC -  o(n)
    // SC - ASC - o(n) skwed tree , o(logn) balanced tree, SC -o(1)
};

let inputs = [3,4,5,1,3,-1,1,-1,-1,-1,-1,-1,-1]
let root = LevelWiseInput(inputs)

let t = rob(root)
console.log(Math.max(...t))