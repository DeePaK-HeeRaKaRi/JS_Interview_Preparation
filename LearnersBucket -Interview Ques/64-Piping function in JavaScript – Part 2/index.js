const pipe_1=(...funs)=>{
    console.log(funs)
    let ans=0
    return function(...val){
        console.log(val)
        for(let i in funs){
            // console.log(funs[i],val[i])
            // console.log(funs[i].apply(this,[val[i]]))
            ans+=(funs[i].apply(this,[val[i]]))
          
            // console.log(ans)
        }
        return ans
    }
}
const pipe=(...funs)=>{
    return function(val){
        for(let i of funs){
            console.log(i,val)
            val=i.apply(this,[val])
        }
        console.log(val)
        return val
    }
}
const getSalary = (person) => person.salary;
const addBonus = (netSalary) => netSalary + 1000;
const deductTax = (grossSalary) => grossSalary * 2;

const result = pipe(getSalary, addBonus, deductTax)({ salary: 10000 });
// const result1 = pipe_1(getSalary, addBonus, deductTax)({ salary: 10000 },1000,1000);
console.log(result)
// console.log(result1);
