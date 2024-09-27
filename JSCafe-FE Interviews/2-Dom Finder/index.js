// we have to print the node b value
// 1-traverse form nodeA to rootA and get the path
// 2-frm that path travel from rootB upto the path length is 0 than you can find the value of nodeB

const getPathFromChildToParent=(parent,child) => {
    let currentNode=child
    let pathArray=[]
    while(currentNode!==parent){
        // console.log('---------------------------------')
        const parentElement=currentNode.parentElement
        // console.log("parent element", parentElement);
        const childArray=Array.from(parentElement.children)
        // console.log('childArray-',childArray)
        pathArray.push(childArray.indexOf(currentNode))
        // console.log('path---',pathArray)
        // console.log(parentElement,childArray,currentNode,path)
        currentNode=parentElement
    }
    console.log("pathArray=-----------", pathArray);
    return pathArray
}
const getValueFromParentToChild=(parent,path) => {
    let currentNode=parent
     
    while(path.length){
        currentNode=currentNode.children[path.pop()]
        // console.log(currentNode)
    }
    return currentNode.innerText
}
const findNodeValue = () => {
    console.log("in findnode")
    const rootA=document.getElementById('rootA')
    const rootB=document.getElementById('rootB')
    // console.log(rootB.innerText)
    const nodeA=document.getElementById('nodeA')
    const path=getPathFromChildToParent(rootA,nodeA)
    return getValueFromParentToChild(rootB,path)
}
console.log(findNodeValue())