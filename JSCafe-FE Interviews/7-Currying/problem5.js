const sum=(...args)=>{
  const calculate=(arr)=>arr.reduce((prev,curr) =>prev+curr,0)
  let result = calculate(args)
  const inner=(...args2)=>{
   result+=calculate(args2)
   return inner
  }
  inner.getResult = ()=>{
    console.log('------',result)
    return result
  }
  return inner
}
const res = sum(90,100)(2)(3)(4)(10, 10);
console.log(res.getResult());

 
// const res2 = sum(1)(2)(3)(4)(10)(20)(30);
// const res3 = sum(1)(2)(3)(4)(10);
// const res4 = sum(1)(2)(3)(40)(4)(10)(20)(30);
// const res5 = sum(1)(2)(3)(4)(4)(10)(20)(30);
// console.log(res, res2, res3, res4, res5);
// res should be 18
// res2 should be 70
// res3 should be 20
// res4 should be 110
// res5 should be 74

 
// To print the whole calculated result
// res.getResult();

const test =()=>{
  console.log('hello')
  const result = 10
}
// In JavaScript, you can add properties and methods to functions just like you can with objects because functions are objects in JavaScript. 
// This allows you to add custom properties and methods to a function.
test.getTest = ()=>{
  return 'get TEst'
}

console.log('-------------res',test.getTest())