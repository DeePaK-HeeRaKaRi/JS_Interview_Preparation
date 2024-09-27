function deepfreeze(obj){
    const keys=Object.getOwnPropertyNames(obj)
    for(let key of keys){
        let value = obj[key]
        if(value && typeof value == 'object'){
            deepfreeze(value)
        }
        else{
            // assign back  // not required
            obj[key]=value
        }
    }
    return Object.freeze(obj)
}
function deepEqual(obj1,obj2){
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)

    if(keys1.length != keys2.length){
        return false
    }
    for(let key of keys1){
        let val1=obj1[key]
        let val2=obj2[key]

        const areObjects= (val1 && typeof val1 == 'object') && (val2 && typeof val2 == 'object')

        if(areObjects){
            let deepCheck = deepEqual(val1,val2)
            if(deepCheck==false){
                return false
            }
        }else if(!areObjects && val1!==val2){
            return false
        }
    }
    return true
}

function produce(base,recipe){
    // clone the frozen object , so we can modify
    let clone = JSON.parse(JSON.stringify(base))
    console.log('before passing to function -------',base,clone)
    // pass the clone to the given function to update the values
    recipe(clone)
    console.log("after passing to function -------", base,clone);
    // if equal return the original input
    if(deepEqual(base,clone)){
        clone=base
    }
    deepfreeze(clone)
    return clone
}

const obj = {
  a: {
    b: {
      c: 2,
    },
  },
};
// object is frozen
// its properties cannot be updated
deepfreeze(obj);
// obj can only be updated through the produce function
const newState = produce(obj, (draft) => {
  draft.a.b.c = 2;
  draft.a.b.d = 4;
});
delete newState.a.b.c
console.log(newState);
console.log(Object.isFrozen(newState))