function deepEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  // console.log("-----obj", obj1, obj2, keys1, keys2);

  // Handle prototype mismatch
  if (Object.getPrototypeOf(obj1) !== Object.getPrototypeOf(obj2)) {
      return false;
  }

  if (keys1.length !== keys2.length) {
      return false;
  }

  for (let key of keys1) {
      let val1 = obj1[key];
      let val2 = obj2[key];

      const areObjects = val1 && typeof val1 === "object" && val2 && typeof val2 === "object";

      // console.log('-------', val1, val2, areObjects);

      if (areObjects) {
          if (!deepEqual(val1, val2)) {
              return false;
          }
      } else {
          if (Object.is(val1, val2) === false) {  // Handles NaN correctly
              return false;
          }
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


 
// Test case with different prototypes
function CustomClass() {
  this.x = 10;
}

const obj__1 = new CustomClass(); // Inherits from CustomClass.prototype
const obj__2 = { x: 10 }; // Inherits from Object.prototype

console.log(Object.getPrototypeOf(obj__1)); // CustomClass.prototype
console.log(Object.getPrototypeOf(obj__2)); // Object.prototype
console.log(deepEqual(obj1, obj2)); // ❌ false because prototypes are different

 
// Test cases
console.log(deepEqual({ a: NaN }, { a: NaN })); // ✅ true
console.log(deepEqual({ a: null }, { a: {} })); // ✅ false
console.log(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })); // ✅ true
console.log(deepEqual({ a: [1, 2, 3] }, { a: [3, 2, 1] })); // ✅ false (order-sensitive arrays)
console.log(deepEqual(Object.create({ x: 10 }), { x: 10 })); // ✅ false (different prototypes)
console.log(deepEqual({ a: new Date(2024, 0, 1) }, { a: new Date(2024, 0, 1) })); // ✅ true
console.log(deepEqual({ a: new Set([1, 2, 3]) }, { a: new Set([1, 2, 3]) })); // ✅ true
console.log(deepEqual({ a: new Map([["key", 10]]) }, { a: new Map([["key", 10]]) })); // ✅ true

let obj_1 = { a: new Map([["key", 10]]) }
let obj_2 = { a: new Map([["key", 10]]) }
console.log(deepEqual(obj_1,obj_2))


