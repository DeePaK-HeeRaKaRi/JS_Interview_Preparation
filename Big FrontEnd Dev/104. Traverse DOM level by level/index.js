function flatten(root) {
    // your code here
    let queue = [root]
    let result = []
    while (queue.length > 0) {
        let node = queue.shift()
        result.push(node)
        if(node && node?.children.length > 0) {
            queue.push(...node.children)
        }
    }
    return result
}
const root = document.querySelector('.container')
console.log(flatten(root))
