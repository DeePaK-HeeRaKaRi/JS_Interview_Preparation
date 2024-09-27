function shallowCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return primitive values and null as is
  }

  if (Array.isArray(obj)) {
    return [...obj]; // Shallow copy for arrays using the spread operator
  }

  // Shallow copy for objects using a loop
  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = obj[key];
    }
  }

  return copy;
}

// Example usage:
let original = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"],
  address:{city:'hyderabad'}
};

let copied = shallowCopy(original);
// let copied = Object.assign({},original)
 
 

copied.address.city='kumar'
console.log('original',original);
console.log('copied',copied)


// using Shallow copy if we change anything in nested-copied that will also reflect in original
// Shallow Copy:

// A shallow copy creates a new object or array and copies the elements or properties of the original object into the new one at the top level.
// It only copies references to nested objects or arrays, not the actual nested objects or arrays themselves. As a result, nested objects and arrays are shared between the original and the copied object.
// Changes made to nested objects or arrays in the copied object will affect the original object and vice versa.
// Shallow copies are generally quicker to create because they do not involve recursively copying all nested elements.