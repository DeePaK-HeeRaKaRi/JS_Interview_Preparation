
// Parent class
function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.speak = function () {
    console.log(this.name + ' makes a sound.');
  };
  
  // Child class
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
  