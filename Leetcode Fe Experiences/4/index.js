function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = myGenerator();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }


// for (const value of myGenerator()) {
//   console.log(value);
// }
// Output:
// 1
// 2
// 3
