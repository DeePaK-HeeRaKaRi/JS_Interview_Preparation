function MyClass(name, city) {
  this.name = name;
  this.city = city;
  this.value = 0
  console.log("in myclass", this.name,this.city);
}

function createInstance(className, ...args) {
  // console.log(className.__proto__.__proto__)
  // console.log(className.prototype)
  // console.log("--args", args);

  // Create an object with the prototype of the class
  let instance = Object.create(className.prototype);

  // Call the constructor function with the provided arguments
  className.apply(instance, args);

  console.log('instance',instance);
  return instance
}

const instance1 = createInstance(MyClass, "Alice", "bod");

MyClass.prototype.sayHello = function(place='chennai'){
    console.log(`Hello world----------`,this.name,place)
}

instance1.sayHello()

const instance2 = createInstance(MyClass, "Deepak", "Kumar");

instance2.sayHello('hyd')