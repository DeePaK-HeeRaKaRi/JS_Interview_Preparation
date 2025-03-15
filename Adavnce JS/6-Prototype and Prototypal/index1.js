
const p1 = {
    fname : 'Deepak',
    lname : 'Kumar',
    getFullName : function(){
        return `${this.fname} ${this.lname}`
    }
}

const p2 = Object.create(p1)

console.log({p1})

console.log({p2}) // {} but it is pointing to p1

console.log(p2.fname) // Deepak  
/*
Prototype  [ Deepak duew to prototype]
p1 = {
    fname : 'Deepak',
    lname : 'Kumar',
    __proto__ :{}     
}

p1.<property>  It will search the property. If not found JS will serach in  __proto__.

p2 = {
    __proto__ : p1  [prototype of p2 is p1]
}

in p2, if we try to access any property, it will first search in p2. If not found, it will search in p1.
*/

p2.fname = 'Hack'
p2.__proto__.fname = 'Deepak'

console.log({p2}) // {fname: "Hack"}  but it is pointing to p1
console.log(p2.fname) // Hack   , IF p2.fname is commented than output is Deepak

const p3 = {
    __proto__ : p1,
}

console.log({p3}) // {} but it is pointing to p1
console.log(p3.fname) // Deepak

console.log(p1.fname) // Deepak


let fname = 'Test - 1' // String

// fname.  You can see all the properties of string like includes, indexoF etc

let x = 10 // Number

// x.  You can see all the properties of Number like toFixed, toPrecision etc

/*
Wrapper classes are used to convert primitive data types into objects.
String, Number, Boolean, Symbol, BigInt

When you try to access a property on a primitive value, JavaScript will automatically wrap the primitive value in its wrapper object.

ex - fname = 'Test - 1' >converts to > fname = new String('Test - 1') 
    x = 10 >converts to > x = new Number(10)

    let s= 'Test-1'
    s.__proto__ = String.__proto__ = Object.__proto__ = null

    let x = 10
    x.__proto__ = Number.__proto__ = Object.__proto__ = null


    SO THIS IS THE REASOON EVERYTHING IN JS IS OBJECT [BASED ON PROTOTYPE CHAIN]
    EVERYTHING IN JS ORIGINATES FROM OBJECT

    IN PRODUCTION DONT USE __proto__ , USE object.create()
*/

console.log(fname.__proto__) // Pointing to String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}

/*
const fname = new String()
fname.__proto__ = String.prototype
*/

console.log(x.__proto__) // Number {[[PrimitiveValue]]: 10, constructor:

// The prototype of a wrapper object is the prototype of the constructor function that created the object.

console.log(String.prototype) // String {"", anchor: ƒ, big: ƒ, blink: ƒ, bold: ƒ, …}

// Note - for objects __proto__ and for class, functions prototype is used.



const p4 = {
    xp4 : "I am inside P4"
}

// Now P4 is have Protoype > pointing to built in Object class > __proto__ > null

console.log(p4.__proto__.__proto__) // null

// Prototypal INheritance
// Inheritance is the process by which one object can borrow the properties of another object.
const p5 = {
    xp5 : "I am inside P5",
    __proto__ : p4
}

console.log(p5.xp4) // > p5.__proto__.xp4 > I am inside P4

const p6 = {
    xp6 : "I am inside P6",
    __proto__ : p5
}

console.log(p6.xp4) // > p6.__proto__.xp4 > I am inside P4


/*
p4
 xp4 : "I am inside P4"
 __proto__ : Object  >  Object.__proto__ = null

p5
 xp5 : "I am inside P5"
 __proto__ : p4

p6
  xp6 : "I am inside P6"
  __proto__ : p5


  p6.xp4 > Not Found in p6 > 
            p6.__proto__.xp4 > 
                Not Found in p6.__proto__ > 
                    p6.__proto__.__proto__.xp4 > Found in p6.__proto__.__proto__


The above porcess is called prototypal inheritance > prototype chain


*/

console.log(p6.__proto__) //P5
console.log(p6.__proto__.__proto__) //P4
console.log(p6.__proto__.__proto__.__proto__) //Object
console.log(p6.__proto__.__proto__.__proto__.__proto__) //null




class Student {
    constructor(name, age){
        this.name = name
        this.age = age
    }
    getName(){
        return this.name
    }
}

console.log('-----Student class',Student.prototype) // {constructor: ƒ, getName: ƒ}

console.log(Student.prototype.__proto__) // {constructor: ƒ} > Pointing to Object class

console.log(Student.prototype.__proto__.__proto__) // null


const s1 = new Student('Deepak', 25)  //S1 is an object of Student class 
// new >> s1.__proto__ = Student.prototype

console.log(s1) // Student {name: "Deepak", age: 25}

console.log(s1.__proto__) // {constructor: ƒ, getName: ƒ} > Pointing to Student class

console.log(s1.__proto__.__proto__) // {constructor: ƒ} > Pointing to Object class

console.log(s1.__proto__.__proto__.__proto__) // null

const s2 = {__proto__ : Student.prototype} // s2 is an object of Student class
s2.name = 'Aditya'
console.log(s2.getName())

/*
__proto__  > actual object that is used in the lookup chain to resolve methods, etc.
prototype > is the object that is used to build __proto__ when you create an object with new
*/

console.log(s1 instanceof Student) // true
console.log(s2 instanceof Student) // true > I set the proto to Student Class

s1.__proto__ = null
console.log(s1 instanceof Student) // false