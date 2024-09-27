console.log('Callback -> function inside function')

function abc(a,b,callback){
   
  callback()
}
function multiple(a,b){
  return a*b
}
function add(a,b){
  return a+b
}
console.log(abc(5,2,multiple))
console.log(abc(5,7,add))


const students = [
  { name: "harry", subject: "JS" },
  { name: "rohan", subject: "ML" },
  { name: "ram", subject: "TS" },
];
function enrollStudents(student,callback) {
  setTimeout(() => {
    student.forEach((element) => {
      students.push(element);
    })
    console.log("Students has been enrolled");
    // callback -> if once all the students are enrolled then it will call the getstudents()
    callback()
  }, 1000);
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
enrollStudents(
  [
    { name: "Deepak", subject: "Angular" },
    { name: "Madhu", subject: "NodeJS" },
  ],
  getStudents
);
// getStudents(students);
