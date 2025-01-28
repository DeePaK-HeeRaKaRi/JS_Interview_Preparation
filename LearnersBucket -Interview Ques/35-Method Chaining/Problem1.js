/*
Why Arrow Functions Don't Work Well Here
In your example, methods like add, subtract, etc., rely on this to refer to the calculator object. 
Arrow functions capture the this from the scope in which they were defined, which is likely the global or outer context, not the calculator object itself.
arrow functions do not bind their own this but instead inherit it from their surrounding lexical scope.
*/

// using Objects

// const calculator={
//     total:0,
//     add:function(val){
//         this.total+=val
//         return this
//     },
//     subtract:function(val){
//         this.total-=val
//         return this
//     },
//     multiply:function(val){
//         this.total*=val
//         return this
//     },
//     divide:function(val){
//         this.total/=val
//         return this
//     }
// }
// const a=calculator.add(10).subtract(2).divide(2).multiply(5);
// console.log(a.total)  //20
// // calculator.total=0
// const b=calculator.add(10).subtract(2).divide(2).multiply(5);
// console.log(b.total) //here should be also 20 but we will get 70 cause total will not become 0 we have to make it to 0

// The problem with objects is that we cannot create a new instance of
// them. But it can be solved using functions

const Calculator=function(){
    this.total=0
    this.add=(val)=>{
        this.total+=val
        return this
    }
    this.divide=(val)=>{
        this.total/=val
        return this
    }
    this.multiply=(val)=>{
        this.total*=val
        return this
    }
    this.subtract = (val) => {
      this.total -= val;
      return this;
    };
}
const calc=new Calculator()
calc.add(10).subtract(2).divide(2).multiply(5)
console.log(calc.total)
// here every time creating a new instance
const calc1=new Calculator()
calc1.add(10).subtract(2).divide(2).multiply(5)
console.log(calc1.total)


/*
Why Arrow Functions Work Here?

A new object is created and assigned to this inside the Calculator function.
Arrow functions like add, subtract, divide, and multiply inherit this this from the Calculator function context.
Thus, when you call methods like calc.add(10), the this in the arrow function correctly refers to the calc instance.


Summary
Constructor Function with new: Arrow functions work because they inherit this from the constructor's scope, which is the instance being created.
Object Literal: Arrow functions don't work as expected because this in arrow functions is lexically scoped and doesn't bind to the object.
*/