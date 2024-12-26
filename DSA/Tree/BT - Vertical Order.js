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

function verticalOrder(root) {
    let level = 0
    let vertical = 0
    let queue = [[root,level,vertical]]
    let verticals_map = {}
    while(queue.length > 0) {
        let n= queue.length
        let level_map = {}
        for(let i=0;i<n;i++) {
            let [currNode,level,vertical] = queue.shift()
            if(!level_map[vertical]) {
                level_map[vertical] = []
            }
            level_map[vertical].push(currNode.val)
            if(currNode?.left) {
                queue.push([currNode.left,level+1,vertical-1])
            }
            if(currNode?.right) {
                queue.push([currNode.right,level+1,vertical+1])
            }
        }
        console.log({level_map})
        // KEy is vertical
        for(let key in level_map) {
            if(!verticals_map[key]){
                verticals_map[key] = []
            }
            verticals_map[key] = [...verticals_map[key],...level_map[key]]
        }
        console.log({verticals_map})
    }
    let sorted_Keys = Object.keys(verticals_map).map(Number).sort((a,b) => a-b)
    console.log({sorted_Keys})
    let result = []
    for(let i of sorted_Keys) {
        result.push(verticals_map[i].sort((a,b) => a-b))
    }
    console.log({result})
}

let inputs = [1,2,3,4,10,9,10,-1,5,-1,-1,-1,-1,-1,-1,-1,6,-1,-1]
// let inputs= [3,9,20,-1,-1,15,7,-1,-1,-1,-1]
let root = LevelWiseInput(inputs)
// console.log(printLevelWiseTree(root))
verticalOrder(root)