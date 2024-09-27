/*
This refers to an object
The value of this depends on how the function is invoked

Behaviour of this in a Function: this refers to window object
Behaviour of this in a object: this refers to the object

Arrow function:Arrow functions dont have defined this.Instead the treat it as a variable
*/

// const person={
//     name:'Deepak',
//     getname:function(){
//         return `${this.name} is my Name`
//     }
// }
// console.log(person.getname())

// function test(){
//     console.log(this)
// }
// test()
// var name1 = "deepak kumar";

// console.log(this.name1);

//  arrow functions do not have their own this context. Instead, they inherit the this value from the surrounding scope (lexical scope).
//  In this case, the surrounding scope is the global scope, where this does not refer to the person object but to the global context.
// var name = "deepak kumar1";
// const person = {
//   name: "Deepak",
//   // getname defined using arrow functions and it dont have this,instead it treat like a variable and inherit the
//   // the value of this lexically and it searches in global scope and in global scope it dont have a name
//   // so it is undefined is my name
//   getname: () => {
//     // name = "deepak kumsr";
//     return `${this.name} is my Name`;
//   },
// };
// console.log(person.getname());

// function User(){
//     this.name="Deepak Kumar",
//     this.score=20,
//     this.sayUser=function(){
//         console.log(this.name)

//         this.sayuser2=function(){
//             console.log('user2',this.name)
//         }
//         this.sayuser2()
//         function sayUser3(name){
//             this.name="heera"
//             console.log('in user3->>>>>>>>>>>>',name,this.name)
//         }
//         sayUser3(this.name)
//     }
// }
// let fn=new User()
// fn.sayUser()
// console.log(fn)

function User(){
    this.name="Deepak Kumar",
    this.score=20,
    this.sayUser=function(){
        this.name ='dep'
        console.log(this.name)

        this.sayuser2=function(){
            console.log(this.name)
        }
        this.sayuser2()
        // now it treat as a variable
        const sayUser3=()=>{
            // this.name ='d1'
            console.log('in user3',this.name)
        }
        sayUser3()
    }
}
let fn=new User()
fn.sayUser()
console.log(fn)
