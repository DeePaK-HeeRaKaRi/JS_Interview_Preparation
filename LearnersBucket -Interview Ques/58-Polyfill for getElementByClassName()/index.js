// function findByClass(clas){
//     const root=document.body
//     console.log(root)
//     function search(node){
//         console.log('---',Array.from(node.classList), node.classList);
//         let result=[]
//         if(node.classList.contains(clas)){
//             console.log('in if',node)
//             result.push(node)
//         }

//         for(const element of node.children){
//             const res=search(element)
//             console.log('reult---',res)
//             result=result.concat(res)
//         }
//         return result
//     }
//     return search(root)
// }
function findByClass(clas){
    const root=document.body
    let queue=[root]
    let ans=[]
    while(queue.length){
        const curr=queue.shift()
        // console.log('curr',curr,curr.classList,curr.className)
        if(curr.classList.value == clas){
            ans.push(curr)
        }
        if(curr.children.length > 0){
            console.log('-----curr CHildren',curr.children,curr.children.length,Array.from(curr.children))
            queue.push(...curr.children);
        }
    }
    return Array.from(ans)
}
// console.log(findByClass("a"));
const res = findByClass("a")
console.log(res)

for(let i of res) {
    console.log('---res',i.innerText)
}