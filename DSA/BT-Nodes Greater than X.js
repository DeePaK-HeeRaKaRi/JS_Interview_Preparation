class BinaryTreeNode{
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}
class Result{
    constructor(data) {
        this.count = 0
        this.arr = []
    }
}
function TreeInput(values) {
    if(values.length == 0) {
        return null
    }
    let rootData = values.shift()
    let root = new BinaryTreeNode(rootData)
    if(rootData == -1) {
        return null
    }
    let leftTree = TreeInput(values)
    let rightTree = TreeInput(values)
    root.left = leftTree
    root.right = rightTree
    return root
}

function LargestNodeGT_x(root,x,res) {
    if(root == null) {
        return null
    }
    if(root.data > x) {
        res.count++
        res.arr.push(root.data)
    }
    LargestNodeGT_x(root.left,x,res)
    LargestNodeGT_x(root.right,x,res)
    return
}
let inputValues = [1,2,4,-1,-1,5,-1,-1,3,-1,-1]
let rootInput = TreeInput(inputValues)
let res = new Result()
LargestNodeGT_x(rootInput,2,res)
console.log(res.count)
console.log(res.arr)
