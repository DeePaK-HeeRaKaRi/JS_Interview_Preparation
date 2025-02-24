

/*
First Code Snippet (Using Map)
 
const userMap = new Map([
  ['name', 'John Doe'],
  ['age', 25],
  ['email', 'john@example.com'],
]);

userMap.set('__proto__', { isAdmin: true });

console.log(userMap.get('__proto__')); 
Explanation:
In Map, __proto__ is just a regular key, like any other string.
Map does not inherit properties from Object.prototype, so setting __proto__ as a key does not affect the prototype of the Map instance.
The userMap.get('__proto__') simply returns { isAdmin: true }.
✅ Output:

 
{ isAdmin: true }

Second Code Snippet (Using Object)
 
const user = {
  name: 'John Doe',
  age: 25,
  email: 'john@example.com',
};

user['__proto__'].isAdmin = true;

console.log(user.isAdmin);
Explanation:
Unlike Map, objects in JavaScript inherit from Object.prototype.
user['__proto__'] actually refers to the object's prototype, not just a normal key.
This modifies Object.prototype.isAdmin = true, affecting all objects in JavaScript.
However, user.isAdmin does not exist directly in user, so JavaScript looks up the prototype chain and finds isAdmin in Object.prototype.
✅ Output:

 
⚠️ Warning:
Modifying Object.prototype like this pollutes the global prototype and can cause unexpected bugs across your entire codebase.

Feature	Map	Object
Key Types	            Any type (objects, functions, etc.)	   |  Only strings and symbols
Key Order	            Keys are stored in insertion order  |	No guaranteed order (since ES6, order is maintained for string keys but symbols may be unordered)
Performance	         Faster for large datasets (optimized for frequent additions/removals)	| Slower for large-scale key-value lookups
Iteration	            Direct iteration via .forEach() and .keys(), .values() |	Needs Object.keys(), Object.values(), for...in loop
Size Property	        .size property gives the number of entries	| No direct .size, must use Object.keys(obj).length
Prototype Inheritance	No prototype pollution risk (keys don’t inherit from Object.prototype)	| Risk of prototype pollution (__proto__ can modify Object.prototype)
Best For	Storing and iterating over key-value pairs efficiently	| Structuring data (e.g., models, objects with methods)
*/