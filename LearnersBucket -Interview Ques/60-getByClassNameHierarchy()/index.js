function getByClassNameHierarchy(root,path){
    const classNames = path.split('>')
    console.log("classNames", classNames);
    let queue = [[root,0]];
    let ans=[]
    while(queue.length) { 
        const [currNode ,currIndex]=queue.shift()
        const targetClass=classNames[currIndex]
        if(!currNode){
          continue
        }
        console.log(currNode.children, currIndex, currNode.classList.value);
        if (currIndex == classNames.length - 1 && currNode.classList.contains(targetClass)) {
          ans.push(currNode);
          continue
        }
       console.log('child--',currNode.children,targetClass)
        for(const child of currNode.children){
            if (currNode.classList.contains(targetClass)) {
                queue.push([child, currIndex + 1]);
              }
        }
    }
    console.log(ans)
}
const root=document.getElementById('root')
getByClassNameHierarchy(root,"a>b>c")