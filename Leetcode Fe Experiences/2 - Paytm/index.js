const getAllClassNames = (node) => {
    const childRes = []
    const queue = [node]
    while(queue.length > 0) {
        const getCurrNode = queue.shift()
        const children = getCurrNode.children
        const classAttr = getCurrNode.classList;
        if (classAttr.length>0) {
          childRes.push(classAttr.value);
        }
        if(children.length > 0) {
            queue.unshift(...children)
        }
    }
    return childRes
}

// For both class and IDS
const getclassnames_dfs = (node) => {
    if(!node) return []

    let res = []
    // if(node.classList.contains())
   // Check if node has a class
    // if (node.classList.length > 0) {
    //     res.push(`Class: ${node.classList.value}`);
    // }

    if (node.hasAttribute('class')) {
        res.push(`Class: ${node.classList.value}`);
    }
    // Check if node has an ID
    // if (node.id) {
    //     res.push(`ID: ${node.id}`);
    // }

    if(node.hasAttribute('id')) {
        res.push(`ID: ${node.id}`)
    }
    if(node && node.children.length > 0) {
        Array.from(node.children).forEach((child) => {
        //    res.push(...getclassnames_dfs(child))
            res.push(...getclassnames_dfs(child))
        })
    }

    return res
}
const body = document.getElementsByTagName('body')[0]
const result =[]
const bodyChildren = Array.from(body.children)
bodyChildren.forEach((child) => {
   const currChild = getclassnames_dfs(child)
   result.push(currChild)
})
console.log('------',result)