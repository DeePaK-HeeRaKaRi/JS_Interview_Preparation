// even before started executing the code the var and functions are allocated to the memory space

var x=1
a()
b()
// console.log(x)
function a(){
    // var x=10
    console.log("a is",x)
}
// console.log(x)
function b(){
    var x=100
    console.log("b is",x)
}