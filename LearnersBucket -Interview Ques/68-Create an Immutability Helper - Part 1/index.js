// to frozen nested objects -> the object properties should not update
function deepFreeze(obj) {
  const keys = Object.getOwnPropertyNames(obj);
  // console.log('t---',keys)
  for (let key of keys) {
    // console.log(key);
    let value = obj[key];
    // console.log(value);
    if (value && typeof value === "object") {
      deepFreeze(value);
    } else {
      // else assign back to its key
      obj[key] = value;
    }
  }
  return Object.freeze(obj);
}
function update(inputObj, action) {
  // if we clone we can modify the freeze object as well
  const clone = JSON.parse(JSON.stringify(inputObj));
  function helper(target, action) {
    for (const [key, value] of Object.entries(action)) {
      switch (key) {
        case "_replace_":
          // console.log('final-------',value)
          return value;
        case "_push_":
          return [...target, ...value];
        case "_merge_":
          if (!(target instanceof Object)) {
            throw Error("bad merge");
          }
          return { ...target, ...value };
        case "_transform_":
          // console.log('-----------transform',target,action,value,value(target))
          return value(target);
        default:
          if (target instanceof Array) {
            console.log('---------targfet',target)
            const res = [...target];
            res[key] = helper(target[key], value);
            return res;
          } else {
            // console.log("----------", { ...target });
            const currentTarget = { ...target };
            console.log('-------',target[key],value)
            currentTarget[key] = helper(target[key], value);
            // console.log("-----updated", currentTarget);
            return currentTarget;
          }
      }
    }
  }
  const output = helper(clone, action);
  // console.log('op------',output)
  deepFreeze(output);
  return output;
}

const inputArr = [1, 2, 3, 4];
// deep freeze object
deepFreeze(inputArr);
const outputArr = update(inputArr, { _push_: [5, 6, 7,[9,10]] });
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

// const newState1 = update(state, { a: { b: { _merge_: { e: 5 } } } });
// // does not updates
// // as output is frozen
// newState1.a.b.e = 10;
// console.log(newState1);

// const state1 = { a: { b: 2 } };
// // freeze the object
// deepFreeze(state1);
// const newState2 = update(state1, {
//   a: { b: { _transform_: (item) => item * 2 } },
// });
// // does not updates
// // as output is frozen
// newState2.a.b = 10;
// console.log(newState2);
