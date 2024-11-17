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


// xplanation: for...of automatically handles next() until done: true.
// for (const value of myGenerator()) {
//   console.log(value);
// }
// Output:
// 1
// 2
// 3


function* counter() {
  let count = 0;
  while (true) {
      const increment = yield count;
      count += increment || 1; // Use provided increment or default to 1
  }
}

const countGen = counter();

console.log(countGen.next());        // { value: 0, done: false }
console.log(countGen.next(5));       // { value: 5, done: false }
console.log(countGen.next());        // { value: 6, done: false }
console.log(countGen.next(10));      // { value: 16, done: false }



function* calcGen(x) {
  const y = yield x + 2;
  return y * 2;
}

const gen = calcGen(5);
console.log(gen.next());        // { value: 7, done: false } // First `yield` returns 5 + 2 = 7
console.log(gen.next(10));      // { value: 20, done: true } // `y` is set to 10; returns 10 * 2 = 20



function* infiniteNumbers() {
  let num = 1;
  while (true) {
      yield num++;
  }
}

const infiniteGen = infiniteNumbers();
console.log(infiniteGen.next().value); // 1
console.log(infiniteGen.next().value); // 2
console.log(infiniteGen.next().value); // 3
