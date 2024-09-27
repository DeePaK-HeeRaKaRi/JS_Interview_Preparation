// let result = {};

// function flatten(obj, prefix = "") {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//         flatten(obj[key], prefix + key + ".");
//       } else if (Array.isArray(obj[key])) {
//         for (let i = 0; i < obj[key].length; i++) {
//           result[prefix + key + "." + i] = obj[key][i];
//         }
//       } else {
//         result[prefix + key] = obj[key];
//       }
//     }
//   }
// }

// const nested = {
//   A: "12",
//   B: 23,
//   C: {
//     P: 23,
//     O: {
//       L: 56
//     },
//     Q: [1, 2]
//   }
// };

// flatten(nested);
// console.log(result);

// -----

// function flatten(obj, prefix) {
//   let output = {};
//   for (let key in obj) {
//     let val = obj[key];
//     let newKey = prefix ? `${prefix}.${key}` : key;
//     if (obj.hasOwnProperty(key)) {
//       if (typeof val == "object") {
//         if (Array.isArray(val)) {
//           const { ...arrToObj } = val;
//           const newObj = flatten(arrToObj, newKey);
//           console.log("------Array", output, newObj);
//           output = { ...output, ...newObj };
//         } else {
//           const newObj = flatten(val, newKey);
//           console.log("------if", output, newObj);
//           output = { ...output, ...newObj };
//         }
//       } else {
//         output = { ...output, [newKey]: val };
//         console.log("else------", output);
//       }
//     }
//   }
//   return output;
// }

// this is the more efficient way
function flatten(obj, prefix) {
  let output = {};
  function getFlatten(obj, prefix) {
    for (let key in obj) {
      let val = obj[key];
      let newKey = prefix ? `${prefix}.${key}` : key;
      if (obj.hasOwnProperty(key)) {
        if (typeof val == "object") {
          if (Array.isArray(val)) {
            // const { ...arrToObj } = val;
            // console.log('------------',arrToObj)
            getFlatten(val, newKey);
          } else {
            getFlatten(val, newKey);
          }
        } else {
          output[newKey] = val;
        }
      }
    }
  }
  getFlatten(obj, prefix);
  return output;
}
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 5,
    e: [10, 341, 298, { deee: "deepak", ku: "heer",test:{dev:'dev1'} }, 700],
  },
  f: "iuhsiuh",
};
console.log(flatten(obj, ""));

// let test = {
//   c: 2,
//   d: 5,
//   e: [10, 341, 298, { deee: "deepak", ku: "heer" }, 700],
// };

// const { ...arrToObj } = test;
// console.log(arrToObj);

// function test1(){
//     let res={}
//     function test2(){
//         res={...res,'deepak':123334}
//     }
//     test2()
//     return res
// }
// console.log(test1())

 