// const input1 = { a: 1, b: 2, c: 3, d: 10, e: 12 };
// const input2 = { a: 2, e: 12, f: 6, d: 10 };

// let input1_keys = Object.keys(input1)
// let input2_keys = Object.keys(input2)

// let output = {}
// if(input1_keys.length < input2_keys.length) {
//     input1_keys.forEach((key) => {
//          if(input2.hasOwnProperty(key) && input1[key] == input2[key]) {
//            output[key] = input1[key];
//          }
//     })
// }else{
//      input2_keys.forEach((key) => {
//        if(input1.hasOwnProperty(key) && input1[key] == input2[key]) {
//             output[key] = input1[key]
//        }
//      });
// }
// console.log(output)

const input1 = { a: 1, b: 2, c: 3, d: 10, e: 12 };
const input2 = { e: 12 , e:12, c:'3'};

const input1Keys = Object.keys(input1);
const input2Keys = Object.keys(input2);

const [smallerInput, largerInput] = input1Keys.length < input2Keys.length ? [input1, input2] : [input2, input1];

const output = {};

for (const key of Object.keys(smallerInput)) {
  if (largerInput.hasOwnProperty(key) && largerInput[key] === smallerInput[key]) {
    output[key] = smallerInput[key];
  }
}

console.log(output);


