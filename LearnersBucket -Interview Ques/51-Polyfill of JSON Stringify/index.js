class myJSON {
  // helper method handles all types of values and strinigify accordingly
  static value(val) {
    console.log('top-----',val)
    switch (typeof val) {
      case "boolean":
        return `${val}`;
      case "number":
        return isFinite(val) ? `${val}` : `null`;

      case "string":
        return `"${val}"`;

      case "function":
        return "null";
      case "symbol":
        return "null";
      case "undefined":
        return "null";
      // for object determine its value
      // it may be new Date or new Number() new Boolean, new String()
      case "object":
        if (val instanceof Date) {
          return `"${val.toISOString()}"`;
        }
        // if value is a string generated as constructor,
        // new String(value)
        else if (val instanceof String || val instanceof Boolean) {
          return `"${val}"`;
        } else if (val instanceof Number) {
          return isFinite(val) ? `"${val}"` : "null";
        }

        // [{ x: 5, y: 6 }] => [{"x":5,"y":6}] so pass keys to make string
        else if (Array.isArray(val)) {
          // const arr_res = `[${val.map((res) => this.value(res)).join(",")}]`;
          // console.log('------arr res',arr_res)
          return `"[${val.map((res) => this.value(res)).join(",")}]"`;
        }
        // else {
        //   let obStr = Object.keys(val).map((k) => {
        //     return typeof val[k] === "function"
        //       ? null
        //       : `"${k}":${this.value(val[k])}`;
        //   });
        //   return `{${obStr}}`;/
        // }

        // recursively call for nested values -> {a:"deep", b:{c:"kumar",d:"heer"}}
        // console.log('val0---------',val)
        return this.myStringify(val);
    }
  }
  static myStringify(obj) {
    console.log('obj-----------',obj,typeof obj)
    if (typeof obj != "object" || obj === undefined || obj instanceof Array) {
      return this.value(obj);
      // console.log('in if-----------',obj)
      // let res=this.value(obj)
      // // console.log('ress----------',res)
      // return res
    } else if (obj == null) {
      return null;
    }

    //  now check if an object contines a cycle or not
    // generally JSON.stringify will throw an error if object contains cycle

    // so based on interviewer we can throw error or remove cycle

    // this.removeCycle(obj);
    // this.thorowErrorIfHasCycle(obj);
    console.log('----------------------after',obj)
    let objstring = Object.keys(obj).map((k) => {
      return typeof obj[k] === "function"
        ? null
        : `"${k}":${this.value(obj[k])}`;
    });
    console.log('-----------',objstring)
    return `{${objstring}}`;
  }

  static removeCycle(obj) {
    // console.log("object ", obj);
    const store = new WeakSet([obj]);
    //{"val":10,"next":{"val":20,"next":{"val":30,"next":{"val":40,"next":{"val":50,next:"item1Refre"}}}}}
    function iterable(obj) {
      // console.log("hello")
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object") {
            if (store.has(obj[key])) {
              obj[key] = null;
            } else {
              // if item5.next=null than you should not call next alredy it is not an cycle
              //   if (obj[key]) {
              //     iterable(obj[key].next);
              //   } else {
              //     console.log("in else")
              //     return obj;
              //   }
              // console.log("else", obj[key]);
              iterable(obj[key]);
            }
          } else {
            iterable(obj[key].next);
          }
        }
      }
    }
    iterable(obj);
    // console.log(obj);
    return obj;
  }

  static thorowErrorIfHasCycle(obj) {
    // console.log("object ", obj);
    const store = new WeakSet([obj]);
    //{"val":10,"next":{"val":20,"next":{"val":30,"next":{"val":40,"next":{"val":50,next:"item1Refre"}}}}}
   function iterable(obj) {
     for (let key in obj) {
      //  console.log("keys----", key, obj[key]);
       if (obj.hasOwnProperty(key)) {
         if (typeof obj[key] === "object") {
        //    console.log("object----", obj[key], store);
           if (store.has(obj[key])) {
            //  obj[key] = null;
             throw new Error("Object has cycle")
           } else {
           
             //   iterable(obj[key].next);

             // if item5.next=null than you should not call next alredy it is not an cycle
            //  if (obj[key]) {
            //    iterable(obj[key].next);
            //  } else {
            //    console.log("having null in next");
            //    return;
            //  }
            iterable(obj[key]);
           }
         } else {
           iterable(obj[key].next);
          //  console.log("not an object", obj[key]);
         }
       }
     }
   }
    iterable(obj);
    console.log(obj);
    return obj;
  }
}
let obj={
  a:"deep",
  b:{
    c:'kum',
    d:'her'
  }
}
// let obj={
//     a:"deep",
//     b: {
//         c:'kumar',
//         d:'heera',
//         e:{
//             f:"xyz",
//             g:"hyi"
//         }
//     },
//     // b1:[0,1,1],
//     // c1:{c2:[{k:'key'},{v:'value'}]}
// }


let obj1 = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: {
      f: {
        g: -4,
      },
    },
    h: {
      i: 5,
      j: 6,
    },
  },
};

let obj2={
    a:1,
    b:{
        c: 'Hello World',
        d:2,
        e:{
            f:{
                g:-4
            }
        },
        h:'Good Night Moon'
    }
}

const List = function (val) {
  this.val = val;
  this.next = null;
};
const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);
const item4 = new List(40);

item1.next = item2;
item2.next = item3;
item3.next = item4;
item4.next = item1;

obj = [1,2,3,{ x: 5, y: 6 }]
console.log(myJSON.myStringify(obj))

// console.log('item1---',item1 instanceof Object,myJSON.myStringify(item1))
// console.log(JSON.stringify(item1));
// console.log('obj1',myJSON.myStringify(obj1));

// console.log("obj2", myJSON.myStringify(obj2));

// console.log("array",myJSON.myStringify([{ x: 5, y: 6 }]));

// // expected output: "[{"x":5,"y":6}]"

// console.log("constructors",
//   myJSON.myStringify([
//     new Number(3),
//     new String("false"),
//     new Boolean(false),
//     new Number(Infinity),
//   ])
// );

// // expected output: "[3,"false",false]"
// console.log("object",myJSON.myStringify({ x: [10, undefined, function () {}, Symbol("")] }));
// // expected output: "{"x":[10,null,null,null]}"
// console.log(myJSON.myStringify({ a: Infinity }));