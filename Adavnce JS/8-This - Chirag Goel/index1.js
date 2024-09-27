"use strict";
console.log('----',this)  //Same window object
// Called  wrt to  crush [ window ]
function gfFunction() {
    console.log('From function',this)
}
// gfFunction() // undefined in strict mode[no bf > undefined]
// window.gfFunction() //both are same

// SO Non-strict , If BF is present output BF[object] or undefined

// Called wrt to Objcet [ BF ]
let bfObject = {
    name : 'Deepak',
    age : 24,
    gfFunction: function() {
        console.log(this) // Same bfObject {name: 'Deepak', age: 24, gfFunction: ƒ}
    }
}
bfObject.gfFunction() //Function Calling wrt to Objcet 


// Called wrt to window by passing reference
const gfRefFunction = bfObject.gfFunction;
gfRefFunction() // in strict mode it is undefined//Nothing is there in front of gfRefFunction so , [cursh - window] 