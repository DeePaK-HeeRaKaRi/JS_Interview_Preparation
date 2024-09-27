console.log('Promises')

// function func1(){
//     return new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             let error=true
//             if(error){
//                 console.log('Function : Your Promise has been resolved')
//                 resolve('Yup resolved')
//             }
//             else{
//                 console.log('Function : Your Promise has been resolved')
//                 reject('very bad bro')
//             }
//         },2000)
//     })
// }
// func1().then(function(e){
//     console.log('Deepak : Your Promise has been Fulfilled',e)
// }).catch(function(err){
//     console.log('Deepak : Your Promise has not been Fulfilled',err)
// })

 

const students = [
  { name: "harry", subject: "JS" },
  { name: "rohan", subject: "ML" },
  { name: "ram", subject: "TS" },
];

function enrollStudents(student) {

    return new Promise(function(resolve,reject){
        setTimeout(() => {
            student.forEach((element) => {
              students.push(element);
            })
            console.log("Students has been enrolled");
            let error=false
            if(!error){
                resolve()
            }else{
                reject()
            }
          }, 4000);
    })  
}

function getStudents() {
  var studentList = document.getElementById("studentsList");
  // students.forEach(element => {
  // //    console.log(element)
  //      let p=document.createElement('p')
  //      p.innerHTML=element.name+" "+element.subject
  //      studentList.appendChild(p)
  // });
  setTimeout(() => {
    let str = "";
    students.forEach((element) => {
      str += `<p>${element.name} ${element.subject}</p>`;
      // console.log(str);
    });
    studentList.innerHTML = str;
    console.log("Students has been Fetched",students);
  }, 1000);
  // here seconds should be keep more
}
let newStudents= [
    { name: "Deepak", subject: "Angular" },
    { name: "Madhu", subject: "NodeJS" },
  ]
enrollStudents(newStudents).then(function(){
    getStudents()
}).catch(function(){
    console.log('The error occured')
})
// getStudents(students);
