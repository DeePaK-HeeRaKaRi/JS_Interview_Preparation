var t1=[]
function greet(name,company='Mindtree-Minds'){
    var msg=`Happy Birthday ${name} From ${company}`
    t1.push(msg)
    return msg
}

let obj=[
    {name:'Deepak',dob:'Feb 08'},
    {name:"Kumar",dob:'Feb 09'},
    {name:"Ramu",dob:'Feb 08'},
    {name:"Vijay",dob:'Feb 10'},
    {name:"Madhu",dob:'Feb 08'},
]
 
for(let i=0;i<obj.length;i++){
    
    console.log(obj[i].dob)
    console.log(greet(obj[i].name,'Mindtree'))
}
console.log("t1 is",t1)
var e1=document.getElementById('list')
t1.forEach(i=>{
    if(i.toLowerCase().includes('deepak') || i.toLowerCase().includes('kumar')){
        var li=document.createElement('li')
        li.innerHTML=i
        e1.appendChild(li)
    }
    
})
 
const myobj={
    name:'skillf',
    game:function(hobby){
        return `GTA ${hobby}`;
    }
}
console.log('nammm',myobj['name'])
console.log(myobj.game('Played'))

const mygreet=function(name){
    return `Happy Birtday ${name}`
}
console.log(mygreet('Jones'))

const arr=['f','v','g']
arr.forEach(function(element,index,array){
    console.log(element,index,array)
})

function printall(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i])
    }
}
printall('a','b','c')

// rest parameters
// here it will add a,b and rest params not c
function add(a,b,c,...numbers){

    var sum=a+b
    console.log(sum)
    for(var i=0;i<numbers.length;i++){
        sum+=numbers[i]
        console.log(sum)
    }
    return sum
}
console.log('add',add(10,20,30,40,50))


// hoisting

console.log('variable hoisting deepak ->'+deepak)
var deepak='hello' //prints undefined

console.log('function hoisting cube -> '+cube(3))

function cube(n){
    return n*n*n
} //27

console.log(kumar)
var kumar=function(){
    return a+a
}
var p=2
function pqr(){
    p+=4
    return p
}
console.log(pqr())
// console.log(p)

var fact=function f(n){
    console.log(n*2)
}
fact(10)
function deepak(){
    var deep=10
}
deepak()
console.log("function",deep)