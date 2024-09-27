console.log('Async Await')

async function deepak(){
    console.log('Inside deepak function')
    const response=await fetch('https://api.github.com/users')
    console.log('before response')
    const users =await response.json()
    console.log('users resolved')
    return users
}
console.log('Before calling deepak')
let a=deepak()
console.log('After calling deepak')
console.log(a)
a.then(data =>{
    console.log(data)
})
console.log('last line of js file')