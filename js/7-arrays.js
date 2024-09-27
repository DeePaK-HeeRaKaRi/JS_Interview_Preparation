let arr=[1,2,'hii',7,10,4,'orange',['abcd',5,6],'kumr']
// arr[3]='deepak'
console.log(typeof arr,arr)
console.log(arr.length)

console.log(Array.isArray(arr))
console.log(arr[5])
// arr.indexOf('deepak',6) -> 6 means the index should starts with
// console.log('reverse',arr.reverse())
console.log('sort',arr.sort())
let v=arr.indexOf('deepak')
console.log('index',v)

// Mutating or modifying arrays
arr.push([100,2000])
console.log('push',arr)

// unshift -> at start it will push (single or multiple)
arr.unshift('starting','begining',["hel"],90)
console.log('starting',arr)

arr.pop()
console.log('pop',arr)

// shift() -> removes the starting element
arr.shift()
console.log('shift',arr)
// it will remove 2 elements from 4th index 
arr.splice(4,2)
console.log('splice',arr)

let b=[4,5,6,7,8,9]
console.log('reverse',b.reverse())
var arr1=b.concat(arr)
console.log('concat',arr1)

let myobj={
    name:'deepak',
    profession:'engineer',
    isActive:true,
    arr:[1,2,3,4],
    b1:function(){
         
        return 'hello'
    }
}
myobj.location='hyderabad'
console.log(myobj)
myobj.a1=function(){
    return 'a1'
}
myobj.rr='movi'
 
console.log('function',myobj.a1())
console.log('oooo',myobj['profession'])
arr.push(myobj)
console.log('deleted',delete myobj['name'])
console.log('myobj',myobj)
console.log('toString',JSON.stringify(arr))

// to access all the keys
var keys=Object.keys(myobj)

// or
var keys1=Object.getOwnPropertyNames(myobj)
console.log("keys",keys)
console.log("keys1",keys1)
console.log(keys.length)
console.log('--------------')
for(i in myobj){
    console.log(i,myobj[i])
}

var t1=[1,150,4,100,200,3,2,5,4,7,8]
console.log(t1.sort((a,b)=>{
    if(a>b) return 1;
    if(a<b) return -1
    return 0
}))
var c1=[90,57,29,33,00,4]
console.log(c1.sort((a,b)=>{return a-b}))
e1=c1.slice(2,5)
console.log('slice',e1)