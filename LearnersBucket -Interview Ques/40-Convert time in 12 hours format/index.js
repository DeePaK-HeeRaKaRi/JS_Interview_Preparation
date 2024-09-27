
const formatTime=(time)=>{
    let [hrs,mins]=time.split(":")
    let ampm="AM"
    if(Number(hrs)>=12){
        ampm="PM"
    }
    if(Number(hrs)>12){
        hrs=Number(hrs)-12
    }else if(hrs==="00"){
        hrs="12"
    }

    return `${hrs}:${mins} ${ampm}`
}

console.log(formatTime("12:33")); //12:33 PM
console.log(formatTime("00:33")); //12:33 AM
console.log(formatTime("13:03")) //1:03 Pm
console.log(formatTime("23:53")) //11:53 PM