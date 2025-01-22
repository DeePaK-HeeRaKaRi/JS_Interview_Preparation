// Custom instanceOf implementation
const ownInstanceOf = (obj, target) => {
    if (obj == null || typeof obj !== 'object') {
        return false;
    }
    while (obj) {
        console.log('proto----------', obj, obj.__proto__, Object.getPrototypeOf(obj));
        console.log('target---------', target.prototype);
        if (obj.__proto__ === target.prototype) return true;
        // obj = obj.__proto__;
        obj = Object.getPrototypeOf(obj);
    }
    return false;
};

/*
// Constructor functions
function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Animal(type) {
    this.type = type;
}

// Create an instance of Person
const john = new Person('John', 30);

// Create an instance of Animal
const dog = new Animal('Dog');

// Examples
console.log(ownInstanceOf(john, Person)); // true
console.log(ownInstanceOf(john, Animal)); // false
console.log(ownInstanceOf(dog, Animal)); // true
console.log(ownInstanceOf(dog, Person)); // false
*/

/*
Person Constructor:

When you create an instance of Person using new Person('John', 30), it sets john's internal [[Prototype]] (or __proto__) to Person.prototype.
Animal Constructor:

Similarly, dog's [[Prototype]] is set to Animal.prototype.
Prototype Chain Traversal:

The ownInstanceOf function:
Checks if the current obj.__proto__ matches target.prototype.
If not, it moves up the prototype chain using obj = obj.__proto__.
Output of console.log Statements:
 

*/

// Constructor Function
function Person(name) {
    this.name = name;
}

// Adding a method to the prototype property
Person.prototype.sayHello = function () {
    return `Hello, my name is ${this.name}`;
};

// Create an instance
const john = new Person("John");

// Accessing the prototype property
console.log(Person.prototype); // { sayHello: [Function (anonymous)] }

// Checking the instance's prototype
console.log(john.__proto__); // { sayHello: [Function (anonymous)] }

// Prototype chain relationship
console.log(john.__proto__ === Person.prototype); // true

// Using a method from the prototype
console.log(john.sayHello()); // Hello, my name is John
