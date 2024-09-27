const getFlattenArrayResults = (obj) => {
  let finalArr = [];
  for (let key in obj) {
    let value = obj[key];
    if (typeof value == "object") {
      if (Array.isArray(value)) {
        finalArr = [...finalArr, ...value];
      } else {
        const getNestedRes = getFlattenArrayResults(value);
        finalArr = [...finalArr, ...getNestedRes];
      }
    }
  }
  return finalArr;
};

const FlattenArray = (arr) => {
  let obj = {};
  arr.forEach((val, ind) => {
    if (Array.isArray(val)) {
      const arrLen = val.length;
      const flatChild = FlattenArray(val);
      if (!obj[arrLen]) { 
        obj[arrLen] = { 0: flatChild };  //if the Nested Array with same length ex {3 : {0 :{},1:{}}}
      } else {
        let keysLen = Object.keys(obj[arrLen]).length;  // Here increase the keys Length
        obj[arrLen][keysLen] = flatChild;
      }
    } else {
      if (!obj[0]) {  
        obj[0] = [val];
      } else {
        obj[0].push(val);
      }
    }
  });
  const getFinalArray = getFlattenArrayResults(obj);
  return getFinalArray;
};

const arr = [
  1,
  2,
  [3, [4, 10, [90, 100], [900, 999]], 5],
  [100, 200, 300],
  6,
  [7],
  [10],
];
// const arr = [1, 2, [3, [4], 5], 6, [7]];
const res = FlattenArray(arr);
console.log("Final Array", res);
 
 