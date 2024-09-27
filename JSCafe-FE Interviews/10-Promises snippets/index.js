// var p=new Promise((resolve,reject) => {
//     reject(Error('The fails'))
// })
// p.catch(error => console.log(error))
// p.catch(error => console.log(error))
// we can catch 2 times
// the fails
// the fails


// var p=new Promise((resolve,reject) => {
//     reject(Error('The fails'))
// })
// .catch(error =>{ 
//     console.log(error)
//     return 'deepak'
// })
// .then(error => console.log(error))


// new Promise((resolve,reject) => {
//     resolve('Success !!')
// })
// .then((res) => {
//     console.log(res)
//     throw Error('Ooh No')
// })
// .catch(error => {
//     console.log('catched')
//     return 'Actually that worked'
// })
// .then(message => {
//     console.log(message)
// })


// new Promise((resolve,reject) => {
//     resolve('Success!!')
// })
// .then((data) => {
//    return data.toUpperCase()
// })
// .then(data => console.log(data))



// new Promise((resolve,reject) => {
//     resolve('Success!!')
// })
// .then(() => {
//     throw Error('Oh No')
// })
// .catch(error => {
//     return 'actually that worked'
// })
// .then(data => {
//     // console.log(data)
//     throw Error('The fails')
// })
// .catch(error => console.log(error.message))



new Promise(res => res(2))
.then(v=>{
    console.log(v)
    return v*2
})
.then(v => {
    console.log(v)
    return v*10
})

.finally(v =>{
    console.log(v,'finally')
    return v*3
})
.catch(()=>{
    return 'Its Fine!!'
    throw new Error('Hey Its ok')
})
.then(v =>{
    console.log(v)
})

// finally does not support any parameters and if we return anything, in next chain it will not acceptable