 function merge(...args) {
  let result = {};
  
  for (let obj of args) {
    for (let key in obj) {
      const val = obj[key];

      if (typeof val === "object" && val !== null) {
        if (Array.isArray(val)) {
          // Merge arrays while keeping duplicates
          // result[key] = [...(result[key] || []), ...val];


          // To remove duplicates in array
          result[key] = Array.from(new Set([...(result[key] || []), ...val]))
        } else {
          // Recursively merge objects
          console.log('-------',result[key])
          result[key] = merge(result[key] || {}, val);
        }
      } else {
        result[key] = val;
      }
    }
  }

  return result;
 }

// }
// Example usage
let obj1 = {
  name: "prashant",
  age: 23,
  nature: {
    helping: true,
    shy: false,
  },
  attendees: { students: ["raj","deepak", "kumar"] },
};

let obj2 = {
  qualification: "BSC CS",
  loves: "Javascript",
  nature: {
    angry: false,
    shy: true,
  },
  attendees: { students: ["deepak", "kumar","ihuht"] },
};

let obj3 = {
  office: "mindtree",
  location: "hyderabad",
};
 
console.log(merge(obj1, obj2, obj3));
// console.log(merge(obj1));