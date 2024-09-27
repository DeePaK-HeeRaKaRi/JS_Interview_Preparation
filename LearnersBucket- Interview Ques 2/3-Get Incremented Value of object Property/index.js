let obj={
    i:0
}

obj = new Proxy(obj,{
    get:(target,property) => {
        if(property =='i') {
            target[property] = target[property] +1
            return target[property]
        }
    },
    set:(target,property,value) => {
        if(property === 'j' ) {
            if(value >10){
                target[property] = value
            }else{
                throw new TypeError('value should be greater than 10')
            }
        }
        return target[property]
    }
})
console.log(obj.i)
console.log(obj.i)
console.log(obj.i)
console.log(obj.i)

obj.j=18

console.log(obj)
 