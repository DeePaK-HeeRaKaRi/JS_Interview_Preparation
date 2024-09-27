 
function sum(){
    var a=10
    function add(b){
        return a+b
    }
    return add
}
// let fn=sum()
// let total=fn(10)
// console.log(fn)
// console.log(total)

// let fn=sum()(10)
// console.log(fn)

function x(a){
    let temp=100
    function y(b){
        console.log(temp)
        function z(c){
            return a+c
        }
        return z
    }
    return y
}
// let fn=x(10)(20)(30)
// console.log(fn)


let fn=x(10)
let fn1=fn(20)
let fn2=fn1(30)
console.log('fn',fn)
console.log('fn1',fn1)
console.log('fn2',fn2)