const arr=[1,2,3,4]
const sum=arr.reduce((prevValue,curValue) => {
    const nextValue=prevValue+curValue
    return nextValue
},0)
const multiply=arr.reduce((prevValue,curValue) => {
    const nextValue=prevValue*curValue
    return nextValue
},arr[0])
console.log(sum)
console.log(multiply)

const arr1 = [1.1, 1.2,3.1,3, 1.3, 2.2, 2.3, 2.4,1.7];

const arrObj=arr1.reduce((prevValue,curValue) => {
    // console.log(prevValue)
    const f=Math.floor(curValue)
    if(!prevValue[f]){
        prevValue[f]=[]
        prevValue[f].push(curValue)
    }else{
        prevValue[f].push(curValue)
    }
    return prevValue
},{})

console.log(arrObj)

// let arrObj={}
// arrObj[1]=[]
// arrObj[1].push("deepak")
// arrObj[1].push("kumar")
// console.log(arrObj)

// console.log(Math.floor(1.0))
// console.log(Math.ceil(1.5))


const upperCase=(str) => {
    return str.toUpperCase()
}
const split1=(str) => {
    return str.split('')
}
const rev=(arr2) => {
    return arr2.reverse()
}
const join=(str) => {
    return str.join('')
}
const append=(str) =>{
    return `Hello ${str}`
}

const sarr=[upperCase,split1,rev,join,append]
const initialValue='deepak'

const reverseInitialValue=sarr.reduce((prevValue,curValue) => {
    prevValue=curValue(prevValue)
    console.log('next Value',prevValue)
    return prevValue
},initialValue)
console.log("reverseInitialValue", reverseInitialValue);

let v=["deepak","kumar"]
console.log(v.reverse())
let s1="deepak"
console.log(s1.toUpperCase().split('').reverse().join(''))

//  if we want to run a promise in a sequence we can do the same with this.
const asyncTank=(time) => {
    return new Promise((resolve,reject) => {
        setTimeout(() =>{
            resolve(`completed in ${time}`)
        },100*time)
    })
}
const promises=[
    asyncTank(3),
    asyncTank(1),
    asyncTank(4),
    asyncTank(2),
    asyncTank(10)
]
const result=function(promises){
    promises.reduce((prevValue,curValue) => {
        // console.log('prev',prevValue)
        return prevValue.then(() => {
            return curValue.then((val) => {
                console.log(val)
            })
        })
      
    },Promise.resolve())
}
   
result(promises)


const arr2=[10,20,30,40,50]
const res1=arr2.reduce((prev,cur,ind)=>{
    console.log(prev,cur)
    if(prev.length>0){
        prev=[...prev,cur+prev[prev.length-1]]
    }
    else{
        prev=[...prev,cur]
    }
   return prev
},[])

console.log(res1)