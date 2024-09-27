var a=35
console.log(a,(typeof a))
var b=String(90)
console.log(b,(typeof b))
console.log(a+parseInt(b))
let date=new Date()
console.log(date,(typeof date))
var p=parseFloat('33.0589')
console.log(p.toFixed(0),typeof p)
console.log(parseFloat(256.9827).toFixed(2))
var v1=parseInt('10')
console.log(v1,typeof v1)

// parseint will return the first integer
var v2=parseInt('920 30 40')
console.log(v2)
console.log(parseInt("40 years"))
console.log(parseInt("He was 40"))

console.log(Number('456'))
console.log(navigator.connection)

if(!navigator.geolocation){
    console.log("Geo Location is not supported by browser")
}else{
    console.log("Fetching users loaction")
    navigator.geolocation.getCurrentPosition(success,error)
}
function success(position){
    console.log(position)
}
function error(){
    console.log('GeoLocation Error')
}
navigator.geolocation.watchPosition(success)