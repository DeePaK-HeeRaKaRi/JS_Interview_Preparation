// const arr=[1,2,3,4]
// const maparray=arr.map(e => e*2)
// console.log(maparray)
// let s='jhjjh'.map(c=>c+'k')

Array.prototype.myMap=function(callback){
    // if(!this) {
    //   throw new TypeError('Array should not be undefined')
    // }
    if(!Array.isArray(this)){
      throw new Error('The method is only for arrays');
    }
    if(typeof callback !== 'function'){
      throw new TypeError('Callback should be a function')
    }
    console.log(callback)
    console.log(this)
    let output=[]
    this.forEach((ele,index) => {
        console.log('callback----',callback(ele))
        output.push(callback(ele,index,this))
    })
    return output
}
const arr=[1,2,3,4]
console.log(arr.myMap(e => e*2))

// What is an array prototype?
// prototype allows you to add new properties and methods to arrays. prototype is a property available with all JavaScript objects.

let firstName = 'Rajesh'
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.eyeColor = eyecolor;
  
}


Person.prototype.greet =function (){
    console.log(this)
    return "Hello, my name is " + this.firstName + " " + this.lastName + "Nationality >" + this.nationality;
};
 Person.prototype.nationality = "English";
  const p = new Person('deep', 'kuma', 23, 'black');
  
  console.log(p.greet());




// Arrow functions do not have their own this context, 
// so this inside the arrow function refers to the surrounding context, which is the global scope in this case.

// To fix this issue, you can use a regular function declaration instead of an arrow function for 