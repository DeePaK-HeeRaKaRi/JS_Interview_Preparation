// const merge=(...arguments)=>{
//     let target={}
//     for(let i=0;i<arguments.length;i++){
       
//       let obj=arguments[i]
//       for(let prop in obj){
//         console.log('prop',prop,target)
//         if(obj.hasOwnProperty(prop)){
//           if(typeof obj[prop]=='object' && obj[prop]!=null && !Array.isArray(obj[prop])){
//             target[prop]=merge(target[prop],obj[prop])
//           }else{
//             target[prop]=obj[prop]
//           }
//         }
//       }
//     }
//     return target
    
//   }
//   let obj1 = {
//     name: "prashant",
//     age: 23,
//     nature: {
//       helping: true,
//       shy: false,
//     },
//     attendees: { students: ["deepak", "kumar"] },
//   };
//   let obj2 = {
//     qualification: 'BSC CS',
//     loves: 'Javascript',
//     nature: {
//       "angry": false,
//       "shy": true
//     },
//     attendees:{students:["deepak","kumar"]}
//   }
//   let obj3={
//     office:"mindtree",
//     location:"hyderabad"
//   }
//   console.log(merge(obj1, obj2,obj3));

// let obj1={
//   a:1,
//   b:2,
//   stude:{
//     class1:'eng',
//     class2:'Math'
//   }
// }

// let obj2={
//   c:1,
//   // d:[1,2,3]
// }

// console.log(merge(obj1,obj2))
// function merge(...objects){
//   let mergeObj={}
//   for(let obj of objects){
//     for(let key in obj){
//       const val=obj[key]
//       if(obj.hasOwnProperty(key)){
//         if(typeof val=='object'){
//           if(Array.isArray(val)){
//             mergeObj[key] = mergeObj[key] ? mergeObj[key].concat(val) : val;
//           }else{
//             let currKeyPresent = mergeObj[key] ? mergeObj[key] : null
//             mergeObj[key] = merge(currKeyPresent,val);
//           }
//         }
//         else{
//           // mergeObj[key] = val
//           console.log(key,val)
//           if(mergeObj.hasOwnProperty(key)){
//             console.log('---------------',key,mergeObj[key])
//             mergeObj[key] = Array.isArray(mergeObj[key])?[...mergeObj[key],val] :[mergeObj[key],val]
//             console.log(mergeObj[key],'--------------')
//           }
//           mergeObj[key] =  val
//         }
//       }
//     }
//   }
//   return mergeObj
// }

// function merge(...objects) {
//   console.log('--------objects',objects)
//   let mergedObj = {};

//   for (let obj of objects) {
//     for (let key in obj) {
//       console.log('-----key',key)
//       if (obj.hasOwnProperty(key)) {
//         const val = obj[key];


//         if (typeof val === "object") {
//           // Recursively merge nested objects
//           mergedObj[key] = merge(mergedObj[key]?mergedObj[key]:null, val);
//         } else if (Array.isArray(val)) {
//           // Concatenate arrays
//           mergedObj[key] = mergedObj[key] ? mergedObj[key].concat(val) : val;
//         } else {
//           // Merge overlapping properties into an array
//           if (mergedObj.hasOwnProperty(key)) {
//             mergedObj[key] = Array.isArray(mergedObj[key])
//               ? [...mergedObj[key], val]
//               : [mergedObj[key], val]; //for fistrt time we are keeping in array [mergedObj[key], val]
//           } else {
//             mergedObj[key] = val;
//           }
//         }
//       }
//     }
//   }

//   return mergedObj;
// }

merge = {students: [[1,2,3],[]]}
function merge(...objects) {
  let mergedObj = {};
  for(let obj of objects) {
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        const val = obj[key]
        if(typeof val === 'object') {
          if(Array.isArray(val)) {
            mergedObj[key] = mergedObj[key] ? mergedObj[key].concat(val) : val;
          }else{
            mergedObj[key]=merge(val)
          }
        }
        else{
          // To prevent the overriden values 
          if(mergedObj.hasOwnProperty(key)) {
            mergedObj[key] = Array.isArray(mergedObj[key]) ? 
                [...mergedObj[key],val] : [mergedObj[key],val]
          }
          else{
            mergedObj[key] = val
          }
        }
      }
    }
  }

  return mergedObj
}
// Example usage
let obj1 = {
  name: "prashant",
  age: 23,
  nature: {
    helping: true,
    shy: false,
  },
  attendees: { students: ["deepak", "kumar"] },
};

let obj2 = {
  qualification: "BSC CS",
  loves: "Javascript",
  nature: {
    angry: false,
    shy: true,
  },
  attendees: { students: ["deepak", "kumar","ihuht"] },
};

let obj3 = {
  office: "mindtree",
  location: "hyderabad",
};

console.log(merge(obj1, obj2, obj3));
