
/*
// Base object
const animal = {
    eats: true,
};

// Intermediate object
const mammal = {
    hasFur: true,
};

// Specific object
const dog = {
    barks: true,
};

// Establish prototype relationships
Object.setPrototypeOf(mammal, animal); // mammal inherits from animal
Object.setPrototypeOf(dog, mammal);   // dog inherits from mammal

// Start with the dog
let obj = dog;

// Traverse the prototype chain
while (obj) {
    console.log(obj); // Log the current object
    obj = Object.getPrototypeOf(obj); // Move to the prototype
}


//dog --> mammal --> animal --> Object.prototype --> null

console.log(dog.barks); // true (own property of dog)
console.log(dog.hasFur); // true (inherited from mammal)
console.log(dog.eats); // true (inherited from animal)
console.log(dog.__proto__ === mammal); // true
console.log(mammal.__proto__ === animal); // true
console.log(animal.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
*/


/*
Resetting the constructor property is important for maintaining the correct reference to the constructor function in a prototype chain, 
especially when you override the prototype of a constructor function.


*/
// Base object
function Animal() {}
Animal.prototype.eats = true;

// Intermediate object
function Mammal() {}
Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.hasFur = true;
Mammal.prototype.constructor = Mammal; // Reset constructor

// Specific object
function Dog() {}
Dog.prototype = Object.create(Mammal.prototype);
Dog.prototype.barks = true;
Dog.prototype.constructor = Dog; // Reset constructor

// Create an instance of Dog
const dog = new Dog();

// Check instanceof relationships
console.log(dog instanceof Dog); // true
console.log(dog instanceof Mammal); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
console.log(dog instanceof Array); // false

/*
dog
  instanceof Dog (true)
    |
    --> Dog.prototype
          instanceof Mammal (true)
            |
            --> Mammal.prototype
                  instanceof Animal (true)
                    |
                    --> Animal.prototype
                          instanceof Object (true)
                            |
                            --> Object.prototype
                                  --> null

*/


const arr = [];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true
console.log(arr instanceof Dog); // false
