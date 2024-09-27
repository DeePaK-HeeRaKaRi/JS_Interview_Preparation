function Developer(name){
    this.name=name
    this.type="Developer"
}
function Tester(name){
    this.name=name
    this.type="Tester"
}
function IT_Team(name){
    this.name=name
    this.type="IT_Team Member"
}
function EmployeeFactory(){
    this.create=(name,type)=>{
        switch(type){
            case 1:
                return new Developer(name)
                break
            case 2:
                return new Tester(name)
                break
            default:
                return new IT_Team(name)
                break
        }
        
        
    }
}
function say(){
    console.log("Hi, I am "+this.name+" and I am a "+ this.type)
}
const employeeFactory=new EmployeeFactory()
const employees=[]
employees.push(employeeFactory.create("Deepak",1))
employees.push(employeeFactory.create("Madhu",2))
employees.push(employeeFactory.create("Tim",1))
employees.push(employeeFactory.create("Cook",1))
employees.push(employeeFactory.create("John",2))
employees.push(employeeFactory.create("Swick",3))
employees.push(employeeFactory.create("Marti",5))
console.log(employees)
for(let source of employees){
    say.call(source)
}