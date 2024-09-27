
// In JavaScript, instanceof is an operator used to check if an object is an instance of a specific class or constructor function. 
// It tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.
const ownInstanceOf =(obj,target)=>{
    // console.log(typeof obj)
    if(obj == null || typeof obj !=='object'){
        return false
    }
    while(obj){
        console.log('proto----------',obj,obj.__proto__,Object.getPrototypeOf(obj))
        console.log('target---------',target.prototype)
        // console.log('hi')
        if(obj.__proto__ === target.prototype) return true
        obj=obj.__proto__
    }
    return false
}
const details={name:'deepak',age:23,city:'hyd'}
// console.log(ownInstanceOf(details,Array))
console.log(ownInstanceOf(details,Object))

class P {

}
class Q extends P {
    
}
const q = new Q()
console.log("p is---", Q);
console.log('q is---',q)

// console.log(ownInstanceOf(q, Q)) // true
// console.log(ownInstanceOf(q, P)) // true
// console.log(ownInstanceOf(q, Object)) // true
// function R() {}
// console.log(ownInstanceOf(q, R)) // false
// R.prototype = Q.prototype
// console.log(ownInstanceOf(q, R)) // true
// R.prototype = {}
// console.log(ownInstanceOf(q, R)) // false