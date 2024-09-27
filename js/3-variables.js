var name1='deepak'
name1='kumar'
var profile='software'
var experience
console.log([name1,profile,experience])

const p=10
console.log(p)
const arr=[1,2,3,4]
arr.push('last')

console.log(arr)
arr.pop()
console.log(arr)

{   
    let name2='ram'
    console.log(name2)
}
// console.log(name2) uncaught reference error
name3='heerak'
{
    var name3='heer'
    console.log("inside name3",name3)
}
console.log("outide name3",name3)
{
    const name4='jaa'
    console.log('inside name4',name4)
}
// console.log('outside name4',name4) refernce error
let v=[
    {name:'deepak'},
    {age:25}
]
v.push({company:'mindtree'})
v.push([1,2,3])
 
console.log(v)
console.log('typ',typeof v,v[v.length-1])
console.log(v[2].company)
localStorage.setItem('empData',JSON.stringify(v))
console.log(typeof JSON.parse(localStorage.getItem('empData')))
console.log(JSON.parse(localStorage.getItem('empData')))
var v1={
    name:'deepak',
    class:'ece',
}
 
console.log(v1.name)

var c=[1,2,3,'hfhfh']
console.log(typeof c[3],typeof c[0],typeof c)