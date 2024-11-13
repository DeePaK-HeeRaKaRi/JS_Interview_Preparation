//Leetcode Fe Experiences\1 -Tekion Corp\index.js

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return this.name + " makes a noise.";
};

// Child constructor function
function Dog(name, breed) {
  // Call the parent constructor function with `this` context
  Animal.call(this, name);
  this.breed = breed;
}

// Set the prototype of Dog to an instance of Animal

//Dog is now linked to Animal, so if a method or property is not found on Dog.prototype, JavaScript will look up the prototype chain and try to find it on Animal.prototype.
Dog.prototype = Object.create(Animal.prototype);

// Restore the constructor reference

// you explicitly set the constructor property back to Dog, making sure that any instance of Dog will have constructor correctly pointing to Dog.
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  return this.name + " barks.";
};

// Testing the inheritance
let dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak()); // Output: Buddy makes a noise.
console.log(dog.bark()); // Output: Buddy barks.
