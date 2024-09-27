// Singleton is a design pattern that tells us that we can create only one instance of a class and that instance can be accessed globally.
// ex - redux, state management globally

// const singleTon=(function(){
//     function ProcessManager(name){
//         this.numProcess=0
//         this.name=name
//     }
//     let pManager
//     function createProcessManager(name){
//         console.log('only once')
//         pManager = new ProcessManager(name)
//         return pManager
//     }

//     return{
//         getProcessmanager:(name)=>{
//             if(!pManager){
//                 pManager=new createProcessManager(name) //it will run once
//             }
//             return pManager
//         }
//     }
// })()

// const p1=singleTon.getProcessmanager("deepak")
// const p2=singleTon.getProcessmanager("kumar")
// console.log(p1,p2)
// console.log(p1===p2)


class Counter{
    constructor(){
        this.count = 0
        this.data = []
    }
    increment(){
        this.count++
    }
    decrement(){
        this.count--
    }
    addValue(value){
        this.count = value
        this.data.push(value)
    }
    
}

const singleton = (function(){
    let instance
    return{
        getCounter(value){
            if (!instance){
                console.log('creating a counter for once',value)
                instance = new Counter() 
            }
            console.log('---',instance)
            instance.addValue(value)
            return instance
        }
    }
}())

const counter = singleton.getCounter(10)
console.log(counter);
const counter1=  singleton.getCounter(20)
console.log(counter1)
console.log(counter1 == counter)

console.log(counter)

//  here we are creating everytime new instance
// const counter = new Counter()
// const counter1 = new Counter()
// console.log(counter == counter1)


// class Singleton {
//   constructor() {
//     if (!Singleton.instance) {
//       console.log("Creating a instance for first time");
//       this.data = [];
//       Singleton.instance = this; //this refers to the current instance of the class or object, so Singleton.instance now points to the newly created instance.
//     } else {
//       console.log(
//         "Instance is already available, so not creating a new instance"
//       );
//     }
//     return Singleton.instance;
//   }

//   addData(item) {
//     this.data.push(item);
//   }

//   getData() {
//     return this.data;
//   }
// }
// const instance1 = new Singleton();
// instance1.addData("Item 1");

// const instance2 = new Singleton(); // This will return the same instance as instance1

// console.log(instance1 === instance2); // true, because both refer to the same instance

// instance2.addData("Item 2");

// console.log(instance2.getData());