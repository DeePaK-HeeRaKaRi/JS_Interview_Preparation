function Employee(name,salary){
    this.name=name
    this.salary=salary
}

Employee.prototype={
    getSalary:function(){
        return this.salary
    },
    setSalary:function(sal){
        this.salary=sal
    },
    accept:function(visitorFunction){
        visitorFunction(this)
    }
}
const employee=new Employee("Deepak",5000)
console.log(employee.getSalary())

function ExtraSalary(emp){
    emp.setSalary(emp.getSalary() * 2)
}
employee.accept(ExtraSalary)
console.log(employee.getSalary())