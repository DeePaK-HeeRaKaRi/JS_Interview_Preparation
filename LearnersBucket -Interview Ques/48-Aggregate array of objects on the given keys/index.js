// const aggregate=(arr,on,who)=>{
//     const res=arr.reduce((prev,curr)=>{
//          const onValue=curr[on]
//          const whoValue=curr[who]
//          if(prev[onValue]){
//             prev[onValue]={
//                 "skill":onValue,
//                 "user":[...prev[onValue].user,whoValue]
//             }
//          }else{
//             prev[onValue]={
//                 "skill":onValue,
//                 "user":[whoValue]
//             }
//          }
//         //  console.log(prev)
//          return prev
//     },{})
//     console.log(res)
//     // return res
//     let ans=[]
//     for(let key in res){
//         ans.push(res[key])
//     }

//     return ans
// }
const aggregate = (endorsements, on, who) => {
  const result = endorsements.reduce((prev, curr) => {
    const currSkill = curr[on];
    const currUser = curr[who];
    if (!prev[currSkill]) {
      prev[currSkill] = { skill: currSkill, user: [currUser] };
    } else {
      prev[currSkill].user.push(currUser);
      //  prev[currSkill].user = [...prev[currSkill].user,currUser];
    }
    return prev;
  }, {});
  console.log(result)
  // let output = [];
  // for (let obj in result) {
  //   output.push(result[obj]);
  // }
  // return output;
  return Object.values(result);
};
const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];
console.log(aggregate(endorsements, "skill", "user"));

// Output: [
//   {
//     skill: "css",
//     user: ["Bill", "Sue"],
//   },
//   {
//     skill: "javascript",
//     user: ["Chad", "Bill", "Sue"],
//   },
//   {
//     skill: "html",
//     user: ["Sue"],
//   },
// ];
