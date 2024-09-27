// Regular Functions
// In regular functions, the value of this depends on how the function is called:

// Global Context: When a function is called without an object, this refers to the global object (window in browsers, global in Node.js).

function regularFunction() {
    console.log(this);
}
regularFunction(); // Logs: global object (e.g., window in browsers)

// Object Method: When a function is called as a method of an object, this refers to the object.
//This is because JavaScript sets this to the object that is before the dot when a function is invoked as a method. 

const obj1 = {
    method: function() {
        console.log(this);
    }
};
obj1.method(); // Logs: obj1

// Constructor Function: When a function is used as a constructor (called with new), this refers to the new instance being created.

function ConstructorFunction() {
    console.log(this);
}
const instance = new ConstructorFunction(); // Logs: instance

// Explicit Binding: You can explicitly set this using call, apply, or bind.

function regularFunction() {
    console.log(this);
}
const obj2 = { name: 'Test' };
regularFunction.call(obj2); // Logs: obj2

// Arrow Functions
// Arrow functions behave differently.
// They do not have their own this context; instead, they inherit this from the surrounding lexical context (the context in which they were defined).

// Lexical this: this in an arrow function is the same as this in the surrounding scope at the time the arrow function is defined.

const obj3 = {
    regularFunction: function() {
        console.log(this); // Logs: obj3
        const arrowFunction = () => {
            console.log(this); // Also logs: obj3
        };
        arrowFunction();
    }
};
obj3.regularFunction();

// No Rebinding: Arrow functions do not get rebounded when called as methods or with new.

const obj4 = {
    arrowFunction: () => {
        console.log(this);
    }
};
obj4.arrowFunction(); // Logs: global object (or undefined in strict mode)

const ConstructorFunction = () => {
    console.log(this);
};
new ConstructorFunction(); // TypeError: ConstructorFunction is not a constructor

// Explicit Binding Ignored: Using call, apply, or bind has no effect on this inside an arrow function.

const arrowFunction = () => {
    console.log(this);
};
const obj = { name: 'Test' };
arrowFunction.call(obj); // Logs: global object (or undefined in strict mode)
// Summary
// Regular Functions: this is dynamic and depends on how the function is called.
// Arrow Functions: this is lexically inherited from the surrounding context and cannot be changed.
// This lexical behavior of this in arrow functions makes them particularly useful in cases where you want to preserve the this value from the surrounding context, such as in callbacks or event handlers.






