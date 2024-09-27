const deepCopy = (obj) => {
    if(typeof obj !='object' || typeof obj == null) {
        return obj //primitive values
    } 
    
    let res = Array.isArray(obj) ? [] : {}

    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            res[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return res

}

let original = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: null
  },
  hobbies: ["reading", "gaming"],
};
 
 
let copied = deepCopy(original);
// const copied = JSON.parse(JSON.stringify(original))
copied.address.city = 'hyderabad'

console.log(original)
console.log(copied)

// Deep Copy:

// A deep copy creates a completely independent duplicate of the original object, including all nested objects and arrays.
// It recursively copies all elements and properties of the original object and nested objects or arrays, ensuring that there are no shared references.
// Changes made to nested objects or arrays in the copied object do not affect the original object, and vice versa.
// Deep copies are more complex to implement and can be slower, especially for deeply nested structures.