function getElementById(id){
    const root=document.body
    let queue=[root]
    let result=[]
    while(queue.length > 0){
        const currElement = queue.shift()
        // console.log(currElement.id, currElement.children);
        if(currElement.id===id){
            // console.log('if id becomes same',currElement);
            result.push(currElement);
        }
        if (currElement.children.length>0) {
            // console.log("chlden", ...currElement.children);
          queue.push(...currElement.children);
        // queue = [...queue, ...currElement.children];
          console.log(queue)
        }
    }
    return result
}
console.log(getElementById('a'));
