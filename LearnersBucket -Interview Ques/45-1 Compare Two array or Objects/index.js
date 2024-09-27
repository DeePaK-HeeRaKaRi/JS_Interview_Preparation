function deepEqual(obj1,obj2){
    
    const keys1= Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    console.log("-----obj", obj1, obj2,keys1,keys2);
    if(keys1.length!=keys2.length){
        return false
    }
    for(let key of keys1){
        let val1 = obj1[key]
        let val2 = obj2[key];
        const areObjects = val1 && (typeof val1 == "object") && val2 && (typeof val2 == "object");
        console.log('-------',val1,val2,areObjects)
        if(areObjects){
            if(!deepEqual(val1,val2)){
                return false
            }
        }
        else if(!areObjects && val1 !=val2){
            return false
        }
    }
    return true;
}

const obj1 = {
  name: "learnersbucket",
  details: {
    x: [1, 2],
    y: 2,
  },
};
const obj2 = {
  name: "learnersbucket",
  details: {
    y: 2,
    x: [1, 2,3],
  },
};
console.log(deepEqual(obj1, obj2));
