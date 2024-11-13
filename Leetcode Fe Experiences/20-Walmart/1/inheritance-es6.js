// Parent class
class Animal {
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      return `${this.name} makes a noise.`;
    }
  }
  
  // Child class
  class Dog extends Animal {
    constructor(name, breed) {
      // Call the parent constructor with `super`
      super(name);
      this.breed = breed;
    }
  
    bark() {
      return `${this.name} barks.`;
    }
  }
  
  // Testing the inheritance
  const dog = new Dog("Buddy", "Golden Retriever");
  console.log(dog.speak()); // Output: Buddy makes a noise.
  console.log(dog.bark());  // Output: Buddy barks.
  