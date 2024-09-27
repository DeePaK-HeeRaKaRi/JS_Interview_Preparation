const groupBy=(arr,func)=>{
  // console.log(arr,func)
  const res=arr.reduce((prev,curr)=>{
    const key=func(curr)
    // console.log('key---',key,prev,curr)
    if(!prev[key]){
      prev[key]=[curr]
    }else{
      // prev[key].push(curr)
      prev[key]=[...prev[key],curr]
    }
    return prev
  },{})
  return res
}


const getFloor=(i)=>{
  return Math.floor(i)
}
  // console.log(groupBy([6.1,6.5,4.1,4.2,3.4,3.5],(i)=>Math.floor(i)))
// console.log(groupBy(["one", "two", "three"], (i)=>i.length));
// console.log(groupBy([6.1, 6.5, 4.1, 4.2, 3.4, 3.5], (i)=>getFloor(i)));


const countries = [
  { name: "Canada", continent: "AMER" },
  { name: "United States of America", continent: "AMER" },
  { name: "India", continent: "ASIA" },
  { name: "Switzerland", continent: "EUROPE" },
  { name: "Germany", continent: "EUROPE" },
  { name: "Mumbai", continent: "ASIA" },
];
Array.prototype.groupBy=function(func){
  let arr=this
  const result=arr.reduce((prev,curr)=>{
    let key=func(curr)
    if(!prev[key]){
      prev[key]=[curr.name]
    }else{
      prev[key] =[...prev[key],curr.name];
    }
    return prev
  },{})
  return result
}
const groupByContinent = countries.groupBy((country) => country.continent);

console.log(groupByContinent)