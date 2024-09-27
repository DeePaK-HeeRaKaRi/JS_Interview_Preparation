console.log('ES6 Classes & Inheritance')

class Employee{
    constructor(givenName,givenExperience,givenDivision){
        this.name=givenName,
        this.experience=givenExperience,
        this.division=givenDivision
    }
    slogan(){
        return `Iam ${this.name} & this company is the best`
    }
    experienceYears(){
        return 2022 - this.experience 
    }
    static add(a,b){
        return a+b
    }
}
let harry=new Employee('Deepak',2021,"Developer")
console.log(harry)
console.log(harry.slogan())
console.log(harry.experienceYears())
console.log(Employee.add(4,5))

// class Programmer extends Employee{
//     constructor(givenName,givenExperience,givenDivision,language,github){
//         super(givenName,givenExperience,givenDivision);
//         this.language=language
//         this.github=github
//     }
//     favouriteLanguage(){
//         if (this.language=='python'){
//             return 'Python'
//         }else{
//             return 'Javascript'
//         }
//     }
//     // static can call to outside
//     static multiply(a,b){
//         return a*b
//     }
// }

// a=new Programmer('Deepak',3,'Developer','C#','deepak1999')
// console.log(a)
// console.log(a.favouriteLanguage())
// console.log(Programmer.multiply(4,5))
// console.log(a.slogan())
// console.log(a.experienceYears())