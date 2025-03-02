
// Parent class
function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.speak = function () {
    console.log(this.name + ' makes a sound.');
  };
  
  // Child class
  //When Animal.call(this, name); is executed inside Dog, it assigns this.name = name to the Dog instance.
  function Dog(name, breed) {
    Animal.call(this, name);  // Call the parent constructor
    this.breed = breed;
  }
  

  // Inherit from Animal

// This creates an empty object whose prototype is Animal.prototype. Now, Dog instances inherit methods from Animal.
  Dog.prototype = Object.create(Animal.prototype);

// This explicitly sets Dog.prototype.constructor to Dog, so that the constructor reference is correct. Without this, Dog.prototype.constructor would mistakenly point to Animal.
  Dog.prototype.constructor = Dog;
  
  // Override the speak method
  Dog.prototype.speak = function () {
    console.log(this.name + ' barks.');
  };
  
  // Create a new Dog object
  let myDog = new Dog('Buddy', 'Labrador');
  myDog.speak();  // Output: Buddy barks.
  
/*



What is prototype in JavaScript?
In JavaScript, prototype is an object associated with functions and used for inheritance.

Key Points:
Prototype as an Inheritance Mechanism:

Every function in JavaScript (except arrow functions) has a prototype property.
Objects created from a constructor function inherit from the constructor's prototype.
Prototype Chain:

If a property/method is not found on an object, JavaScript looks up its prototype chain.
Prototype vs __proto__:

prototype is a property of functions (used when creating objects via new).
__proto__ is a reference that exists on objects and points to their prototype.


 Conclusion:

prototype is used for method inheritance.
Objects use __proto__ to access the prototype chain.
Object.create() can also be used to set prototypes manually
*/