function undefinedToNull(arg) {
  // your code here
  if (typeof arg == "string" || typeof arg == "number") {
    return arg
  }
  else if(arg == undefined || arg == null) {
    return null
  }
  else {
    if(typeof arg == 'object') {
        if(Array.isArray(arg)) {
            // return arg.map(item => undefinedToNull(item))
            let temp =[]
            for(let i of arg) {
                temp.push(undefinedToNull(i))
            }
            return temp
        }else{
            for(key in arg){
                let value = arg[key]
                arg[key] = undefinedToNull(value)
            }
        }
    }
  }
  return arg
}

// console.log(undefinedToNull({a: undefined, b: 'BFE.dev'}))
console.log(
  undefinedToNull({ a: ["BFE.dev", undefined, null, "bigfrontend.dev"] })
);
console.log(undefinedToNull(["BFE.dev", undefined, null, { a: ["BFE.dev", undefined] }]));
// let s = {a: undefined, b: 'BFE.dev'}
// for(let i in s) {
//     console.log(i)
// }
