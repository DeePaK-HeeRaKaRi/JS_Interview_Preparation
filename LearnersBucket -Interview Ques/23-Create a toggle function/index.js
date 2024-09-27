// in clock wise direction
const toggleClockwise=(...list)=>{
    let current=-1
    let length=list.length
    return function(){
        // moves to the next elem and reset to 0 when it has exceed the length
        current=(current+1)%length
        return list[current]
    }
}

const toggleAntiClockWise=(...list)=>{
    let length=list.length
    let current=length
    return function(){
        if(current-1<0){
            current=length
        }
        current=(current-1)
        return list[current]
    }
}
// const res=toggleClockwise('on','off')
const res=toggleAntiClockWise('on','off','auto')
console.log(res())
console.log(res())
console.log(res())
console.log(res())
console.log(res());
console.log(res());
console.log(res());
console.log(res());