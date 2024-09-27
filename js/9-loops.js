
document.body.innerHTML='You are in Loops'
// for(let i=0;i<10;i++){
 
//     console.log(i)
// }
let arr=[56,7,8,4,5,6,"depak",[4,66],{name:'deepak'}]
arr[8].office='mindtree'
arr[8].location='hyderabad'
arr.push({track:'webtech',techstack:'mean'})
console.log("ARRAY",arr)
for(var i in arr[8]){
    console.log("in arr8")
    if(i==='name'){
        break
    }
    console.log("arr8",i,arr[8][i])
}
console.log(arr.length)
arr.forEach((e,ind,arr)=>{
    if(ind==3){
        console.log("e",e +' '+ind+' ')
    }
    
    // console.log("----------------")
})
var t1=9
 
let myobj={
    name:'deepak',
    profession:'engineer',
    isActive:true,
    arr:[1,2,3,4]
}
myobj.headquarters='banglore'
myobj.a=function(){
    return 'hello'
}
myobj.b=()=>{
    return 'hsdbhd'
}
for(let k in myobj){
    console.log(`${k} ->`,myobj[k])
}

let a=[4,5,6,7,-28,9,2]
console.log('min',Math.min(...a))
console.log('max',Math.max(...a))
 
let b=a[0]
for(let i=1;i<a.length;i++)
{
    if (a[i]<b){
        b=a[i]
    }
}
console.log(`The smallest number from ${a} is ${b}`)

for(var j=0;j<=10;j++){
    if(j==5){
        break
    }else{
        console.log(j)
    }
}