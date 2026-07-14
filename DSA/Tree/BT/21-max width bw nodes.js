 
var widthOfBinaryTree = function(root) {
    let queue = [[root,0]]
    let res = 1
    while(queue.length > 0) {
        let n = queue.length
        let mini = queue[0][1] // first element
        let maxi = queue[n-1][1] //last element
        for(let i=0;i<n;i++){
            let curr = queue.shift()
            let ind = curr[1] - mini
            if(curr[0]?.left !== null) {
                queue.push([curr[0].left,2*ind+1])
            }
            if(curr[0]?.right !== null) {
                queue.push([curr[0].right,2*ind+2])
            }
        }
        res = Math.max(res,maxi-mini+1)
    }
    return res

};