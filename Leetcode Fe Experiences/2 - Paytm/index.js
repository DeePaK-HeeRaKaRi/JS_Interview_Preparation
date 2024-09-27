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

const body = document.getElementsByTagName('body')[0]
const result =[]
const bodyChildren = Array.from(body.children)
bodyChildren.forEach((child) => {
   const currChild = getAllClassNames(child)
   result.push(currChild)
})
console.log('------',result)