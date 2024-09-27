// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

// -------------------NON STRICT ----------------------
// Behaves differently in strict mode and non strict mode

// [{crush:window},{'bewafa GF':function},{BF1:object},{BF2:object}]

//global [nothing is there]

// --- this is going to point to object or undefined ---

// console.log(this) 

// If you are in global scope and you are tring to access to this will be always window object [crush]


// Called  wrt to  crush [ window ]
function gfFunction() {
    console.log('From function',this)
}
// gfFunction() // nothing is there infront gfFunction than it is window
// window.gfFunction() //both are same

// SO Non-strict , If BF is present output BF[object] or crush[window]

// Called wrt to Objcet [ BF ]
let bfObject = {
    name : 'Deepak',
    age : 24,
    gfFunction: function() {
        console.log(this) // Same bfObject {name: 'Deepak', age: 24, gfFunction: ƒ}
    }
}
// bfObject.gfFunction() //Function Calling wrt to Objcet 


// Called wrt to window by passing reference
const gfRefFunction = bfObject.gfFunction;
gfRefFunction() //Nothing is there in front of gfRefFunction so , [cursh - window]

// --- Call apply bind ---

var bf1Object= {
    name: "Rahul",
    age: 30,
    car: 'Ola auto',
    gfFunction: function(a,b) {
        console.log(a,b,this)
    }
}

const bf2Object = {
    name: 'Amit',
    age: 24,
    car: "Mercedes",
    gfFunction: function(a,b) {
        console.log(a,b,this)
    }
}

bf1Object.gfFunction(1,2)  // Rahul Object

// If we want to pass any reference you can use call
bf1Object.gfFunction.call(bf2Object,1,2) // TO change the obhect ref [change bf lol]

bf1Object.gfFunction.apply(bf2Object,[1,2])

// Change bf using call and apply


// bind basically binds the function wrt to an object
const writeFunction = bf1Object.gfFunction.bind(bf2Object); // married wrt to bf
writeFunction()


//  ---------Advanced ---------

// When this is present inside async method / callback [ setTimeout, setInterval]


const obj = {
    value : 42,
    regularMethod: function() {
        // this > obj
        // But here is callback
        // So all your async callbacks execute wrt to global scope
        // If it is in strict mode it will be undefined
        setTimeout(function() {
            console.log("Regular Method this:",this) //window object
        }, 1000)
    },
    arrowFunction : function() {
        // At the time of creation of the callback it will bind
        setTimeout(() => {
            console.log("Using arrow function",this) // refers to obj
        },1000)
    }
}
obj.regularMethod();

obj.arrowFunction()


let obj2 = {
    a: 1,
    printRegularFun: function() {
        function innerPrint() {
            // Here this refers to global scope
            console.log("Inner Print Fun: ", this.a);
        }
        innerPrint()
    },

    printArrowFun: function(){
        console.log('this--------',this)
        // Now this refers to obj2
        let innerPrint = ()=>{
            console.log("Print Arrow Fun",this.a)
        }
        innerPrint()
    }
}

obj2.printRegularFun();
obj2.printArrowFun()