const helper=(arr)=>{
    let index =0
    return{
        next:function(){
            return arr[index] ? arr[index++] :null
        },
        done:function(){
            return index>=arr.length
        }
    }
}
let iterator = helper([1, 2, "hello"]);
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null
console.log(iterator.done()); // true
console.log(iterator.next()); // "null
console.log(iterator.next()); // "null
console.log(iterator.next()); // "null

 

// Function.prototype.helper = function (arr) {
//     let index = 0;
//     return {
//         next: () => {
//             return arr[index] ? arr[index++] : null;
//         },
//         done: () => {
//             return index >= arr.length;
//         },
//     };
// };

// let iterator = (function () {}).helper([1, 2, "hello"]);

// console.log(iterator.next()); // 1
// console.log(iterator.next()); // 2
// console.log(iterator.done()); // false
// console.log(iterator.next()); // "hello"
// console.log(iterator.done()); // true
// console.log(iterator.next()); // null
// console.log(iterator.done()); // true
// console.log(iterator.next()); // null
// console.log(iterator.next()); // null
// console.log(iterator.next()); // null
