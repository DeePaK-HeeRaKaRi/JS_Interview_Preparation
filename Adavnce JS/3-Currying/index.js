// using bind
/*
let multiply=function(x,y){
    console.log(x*y)
}

let multiplyByTwo=multiply.bind(this,2,2)
multiplyByTwo()

let multiplyByFive=multiply.bind(this,2)
multiplyByFive(5)

let values={
    f:2,l:10
}

let multiply_=function(){
    console.log(typeof(this.f))
    console.log(this.f*this.l)
}
let multiplyByTen=multiply_.bind(values)
multiplyByTen()

*/

// using Clousers

let multiply = function(x){
    return function(y){
        console.log(x*y)
    }
}

let multiplyByFive=multiply(2)
multiplyByFive(10)