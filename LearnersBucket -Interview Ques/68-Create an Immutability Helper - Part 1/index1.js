function deepFreeze(obj){
    let keys=Object.getOwnPropertyNames(obj)
    for(let key in keys){
        let value = obj[key]
        if(value && typeof value === 'object'){
            deepFreeze(obj)
        }
        else{
            obj[key] = value
        }
    }
    return Object.freeze(obj)
}
function update(inputObj , action){
    let clone = JSON.parse(JSON.stringify(inputObj))
    function helper(target,action){
        for(let [key,value] of Object.entries(action)){
            switch(key){
                case '_replace_':
                    return value;
                default:
                    if(key instanceof Array){

                    }else{
                        const updatedTarget = {...target}
                        updatedTarget[key]=helper(target[key],value)
                        return updatedTarget
                    }
            }
        }
    }
    const output=helper(clone,action)
    deepFreeze(output)
    return output
}

const inputArr = [1, 2, 3, 4];
// deep freeze object
deepFreeze(inputArr);
const outputArr = update(inputArr, { _push_: [5, 6, 7] });
// won't update as output is deep freezed
outputArr[0] = 10;
console.log(outputArr);

const state = {
  a: {
    b: {
      c: 1,
    },
  },
  d: 2,
};
// console.log('entries------',Object.entries(state))
// freeze the object
deepFreeze(state);
const newState = update(state, { a: { b: { c: { _replace_: 3 } } } });
// // does not updates
// // as output is frozen

newState.a.b.c = 10;
console.log(newState);

const newState1 = update(state, { a: { b: { _merge_: { e: 5 } } } });
// does not updates
// as output is frozen
newState1.a.b.e = 10;
console.log(newState1);

const state1 = { a: { b: 2 } };
// freeze the object
deepFreeze(state1);
const newState2 = update(state1, {
  a: { b: { _transform_: (item) => item * 2 } },
});
// does not updates
// as output is frozen
newState2.a.b = 10;
console.log(newState2);
