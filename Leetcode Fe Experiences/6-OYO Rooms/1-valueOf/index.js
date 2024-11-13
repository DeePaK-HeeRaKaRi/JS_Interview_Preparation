const obj1 = {
  value: 100,
};
console.log(obj1.valueOf(), obj1.valueOf() == obj1);

const obj = {
  value: 10,
  valueOf: function () {
    // console.log(this.value)
    return this.value;
  },
};
const res = obj + 10; // Calls obj.valueOf() to get the numeric value
console.log(obj.valueOf(), res);

let a = {
  value: 1,
  valueOf: function () {
    return this.value++;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log("The condition is true");
} else {
  console.log("The condition is false");
}

//In the expression a == 1, JavaScript encounters a, which is an object, and expects a primitive for the == comparison.
// JavaScript calls a.valueOf() automatically to attempt this conversion.
// -- So, in short: You don't need to call valueOf directly; JavaScript will do this as part of its internal type coercion.
// The valueOf method returns a different value each time (1, then 2, then 3 in our example) to make the expression a == 1 && a == 2 && a == 3 evaluate as true.

// In this code, a is an object with a custom valueOf method. This method is automatically called when the object is used in a numeric context, such as in a comparison or arithmetic operation.
//  It returns the value property and increments it by 1 each time it's called.

// As a result, when you check if a is equal to 1, 2, and 3 in the if statement,
// the valueOf method is called three times, and the value property is incremented each time.
// This allows the condition to evaluate to true, and you will see "The condition is true" printed to the console.

// console.log(a==1)
// console.log(a)
// console.log(a)

// console.log(a.valueOf())
// console.log(a.valueOf())
// console.log(a.valueOf())

let s = {
  k: "deepak",
  d: "kumar",
};
console.log(s, s.valueOf());
