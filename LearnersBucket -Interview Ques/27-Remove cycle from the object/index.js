const replacer=()=>{
    const store=new WeakSet()
    return (key,value)=>{
        console.log('------',key,value);
        if(typeof value==='object' && value!=null){
            if(store.has(value)){
                console.log('in vis',value)
                return 
            }
            store.add(value)
            // console.log('store---',store)
        }
        return value
    }
 
}


// {"val":10,"next":{"val":20,"next":{"val":30,"next":{"val":40,"next":{"val":50,next:"item1Refre"}}}}}
// {"val":10,next:{list}}
// const removeCycle=(obj)=>{
//     const store=new WeakSet([obj])
//     console.log('store',store)
    
//     function iterable(obj){
//         console.log('object Input-----------',obj)
//        for(let key in obj){
//         console.log("keys----", key, obj[key]);
//         if(obj.hasOwnProperty(key)){
//             if(typeof obj[key]==='object'){
//                 console.log('object----',obj[key],store)
//                 if(store.has(obj[key])){
//                     console.log('IN weakset',obj[key])
//                     obj[key]=null
//                 }else{
//                   console.log("else", obj[key],obj[key].next);
//                 //   iterable(obj[key].next);

//                   // if item5.next=null than you should not call next alredy it is not an cycle
//                   if (obj[key].next) {
//                     iterable(obj[key].next);
//                   } else {
//                     console.log("having null in next");
//                     return;
//                   }
//                 }
//             }
//         }
//        }
//     }
//     return iterable(obj)
// }
 // {"val":10,"next":{"val":20,"next":{"val":30,"next":{"val":40,"next":{"val":50,next:"item1Refre"}}}}}
const removeCycle=(obj)=>{
    console.log(obj)
    let visited =new Set([obj])
    console.log('--visited--',visited,JSON.stringify(visited))
    function iterate(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(typeof obj[key]==='object'){
                    console.log(obj[key]);
                    if (visited.has(obj[key])) {
                        console.log('In visited',obj[key])
                      delete obj[key];
                    } else {
                      if (obj[key].next) {
                        iterate(obj[key].next);
                      }
                    }
                }
                
            }
        }
    }
    iterate(obj)
}

const List=function(val){
    this.val=val
    this.next=null
}
const item1=new List(10)
const item2=new List(20)
const item3=new List(30)
const item4=new List(40)
const item5=new List(50)

item1.next=item2
item2.next=item3
item3.next=item4
item4.next=item5
item5.next=item1

console.log('item',item1)
// removeCycle(item1)
// console.log(JSON.stringify(item1));

// console.log(JSON.stringify(item1))
// get error because it is a cycle
// console.log(JSON.stringify(item1))

// {"val":10,"next":{"val":20,"next":{"val":30,"next":{"val":40,"next":{"val":50,"next":{"val":10,next:20....}}}}}}
// console.log(JSON.stringify(item1,replacer()))
console.log(JSON.stringify(item1,replacer()))

let user = {name: "Prashant Yadav", age: 23}; 
let user2 = [{name: "Prashant Yadav", age: 23}]; 
let user3 = {name: "Prashant Yadav", age: 23}; 

const users = new WeakSet(); //WeakSet is not iterable
users.add(user);
users.add(user2);
users.add(user3); 

// console.log(users.has(user2)); // true 

// users.delete(user2); 

// console.log(users.has(user2)); // false
// users.add([1,2,3,4])
// console.log(users)
// users.add('duhuhug')  this will not acceptable
// as we are using weakset and the value should be object or function only