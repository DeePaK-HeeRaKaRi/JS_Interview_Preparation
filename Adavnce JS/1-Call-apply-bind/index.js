// let name1={
//     firstName:'Deepak',
//     lastName:'Kumar',
//     printFullName:function(){
//         console.log(this.firstName," ",this.lastName)
//     }
// }
// let name2={
//     firstName:'Akshy',
//     lastName:'Saini',
// }
// name1.printFullName()
// // function borrowing
// // name2 referes to this object
// name1.printFullName.call(name2)

let name1={
    firstName:'Deepak',
    lastName:'Kumar',
}
let name2={
    firstName:'Akshy',
    lastName:'Saini',
}

let printFullName=function(homeTown,state,...args){
    console.log(this.firstName,"",this.lastName,"from",homeTown,state,...args)
    return function(...args1){
      console.log('---------',...args1)
      return function(...args2) {
        console.log('--',args2)
      }
    }
}
let printFullName1 = function (...args) {
  console.log(this.firstName, "", this.lastName, "from", args);
  return function(...args1){
    console.log('--------',args1)
  }
};

printFullName.call(name1,"Mumbai","MH")
 

printFullName.call(name2,"Hyd","TS")

printFullName1.apply(name2,["Hyd","TS","APP"])('okokok-------------','deepak1')

var printName = printFullName.bind(name1,"Mumbai","MH","kulu") 
printName('bind1','bind2')('hmmmm1111111111--------','hm2')

// call - used to invoke a function directly by passinhg a refernce which points to this and 
// 2nd argument pases by individually seperated by comma


// apply - same as call but  2nd argument pases by list of arguments

// bind -same as call but doesnot directly invokes the method but give u a copy of exactly same which can be invoked later