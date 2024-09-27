// function outest() {
//     var c = 20;
//     function outer(str) {
//     // let a = 10;
//     function inner() {
//     console.log(a, c, str);
//     }
//     return inner;
//     }
//     return outer;
//    }
//    let a = 100;
//    outest()("Hello There")();
//    console.log(c)
let flag=false
function counter(){
    var count=0
    
    function increment(){
        flag=true
        count++
        console.log(count)
    }
    return increment
}
var counter1=counter()()
console.log(flag)
 