class Chainer {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  // Method 1: Takes an input, updates the state, and returns 'this'
  test(num) {
    this.value += num;
    return this; // <--- The magic line for method chaining!
  }

  // Method 2: Performs another operation and returns 'this'
  method2() {
    this.value *= 2; 
    return this; // <--- Allows the chain to continue
  }

  // Terminal Method: Outputs the result. 
  // It doesn't need to return 'this' unless you want to chain after printing.
  print() {
    console.log(`Current Value: ${this.value}`);
    return this; 
  }
}

// --- How it works in action ---
const obj = new Chainer(5);

// Calling: obj.test(2).method2().print()
// 1. obj.test(2) adds 2 to 5 (value becomes 7) and returns the obj instance.
// 2. .method2() multiplies 7 by 2 (value becomes 14) and returns the obj instance.
// 3. .print() logs "Current Value: 14"
obj.test(2).method2().print();


class ImmutableChainer {
  constructor(value = 0) {
    // Read-only design: freeze the object to guarantee immutability (optional but robust)
    this.value = value;
    Object.freeze(this); 
  }

  // Instead of modifying this.value, we return a NEW instance with the new calculation
  test(num) {
    return new ImmutableChainer(this.value + num);
  }

  method2() {
    return new ImmutableChainer(this.value * 2);
  }

  // Print is a side-effect, but we still return 'this' (the current instance) 
  // so you can continue chaining if you want to.
  print() {
    console.log(`Current Value: ${this.value}`);
    return this;
  }
}

const originalObj = new ImmutableChainer(5);

// Run 1: Starting at 5 -> test(2) makes a new object with 7 -> method2() makes a new object with 14 -> prints 14
originalObj.test(2).method2().print(); // Output: Current Value: 14

// Run 2: Starting at 5 again! Because originalObj was NEVER mutated.
// 5 -> test(3) makes a new object with 8 -> prints 8
originalObj.test(3).print();           // Output: Current Value: 8

// Proof of Immutability: The original object's value is still exactly 5
console.log(originalObj.value);        // Output: 5