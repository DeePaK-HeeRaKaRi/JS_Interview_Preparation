var age='19'
// === value and type
if(age===String(19)){
    console.log("Age is 19")
    window.alert("Age is 19")
}
else if(age>=18){
    console.log("Age is >= 18")
}
else{
    console.log("Age is not 19")
}
let vari=90
console.log(typeof vari)
if(typeof vari!=='undefined'){
    console.log("Present")
}else{
    console.log("Not Present")
}
const dive=true
if(dive && vari!=90){
    console.log('Drive')
}else{
    console.log('Not Drive')
}
var sal=25
console.log(sal <= 27?'YEs 25' :'No 25')

switch (sal) {
    case 28:
        console.log('you are 28')
        break;
    case 25:
        console.log('You are 25')
        break;
    default:
        console.log('You are Unfit')
        break;
}