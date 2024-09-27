const arr=[5,1,6,3,8]

const double=[]
const triple=[]
const binary=[]
arr.map(x=>{
    double.push(x*3)
    triple.push(x*3)
    binary.push(Number(x.toString(2)))
})
console.log(double)
console.log(triple)
console.log(binary)

// FILTER
const even=arr.filter(i => {
    return i%2 == 1
})
// if their is only one line their is no need for  {}
const greater =arr.filter(i => i > 4)
console.log(even)
console.log('Greater',greater)

// REDUCE

function findSum(arr){
    let sum=0
    for(let i=0;i<arr.length;i++){
        sum+=arr[i]
    }
    return sum
}

console.log('sum',findSum(arr))

// now using reduce
// it takes the 2 arguments 1-> function(acc,curr),acc is like sum=0 curr is like arr[i] 2-> acc initial value here acc=0
const output=arr.reduce((acc,curr)=>{
    acc += curr
    return acc
},0)
console.log('reduce sum',output)

const maximum=arr.reduce((acc,curr)=> {
    if (curr > acc) {
        acc = curr
    }
    return acc
},0)
console.log('maximum',maximum)

const users=[
    {firstname:'deepak',lastname:'h',age:26},
    {firstname:'akshay',lastname:'s',age:75},
    {firstname:'madhu',lastname:'a',age:26},
    {firstname:'ashish',lastname:'t',age:20},
]

const usersMap=users.map( i => i.firstname + " "+i.lastname)
console.log(usersMap)

// {22:2,20:1,32:1} 

const usersReduce=users.reduce((acc,curr)=>{
    if(acc[curr.age]){
        acc[curr.age] +=1
    }else{
        acc[curr.age] =1
    }
    return acc
},{})

console.log(usersReduce)

// findout the first name of all the people whose age is lessthan 30
// chaining the map and filter
const usersFilter=
        users.filter( i => i.age < 30)
        .map( x => x.firstname)
console.log(usersFilter)

// now using reduce findout the first name of all the people whose age is lessthan 30
const u=users.reduce((acc,curr)=>{
    if(curr.age<30){
        acc.push(curr.firstname)
    }
    return acc
},[])
console.log(u)

// Study about pollyfills map  & pollyfills reduce