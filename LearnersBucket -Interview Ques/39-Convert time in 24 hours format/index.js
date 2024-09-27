// convert to 24hrs format
const formatTime=(time)=>{
    // const timeLowerCased = time.toLowerCase();
    let [hrs,mins]=time.split(":")
    // console.log(hrs,mins)
    if(time.endsWith("AM")){
        if(Number(hrs) < 12){
            hrs = Number(hrs)
        }
        else{ 
            hrs= hrs==="12" ? "00" : Number(hrs)+12
        }
        
    }else if(time.endsWith("PM")){
        if(Number(hrs) < 12) {
            hrs= hrs==="12" ? hrs : Number(hrs)+12
        }
        else{
            hrs = Number(hrs)
        }
        
    }
    return `${hrs}:${mins.slice(0,2)}`
}

console.log(formatTime("10:10AM"));
console.log(formatTime("12:10AM"));  // 00:10
console.log(formatTime("12:33PM"));  //12:33

console.log(formatTime("1:20PM")) //13:20
console.log(formatTime("11:20PM"))
console.log(formatTime("11:20AM"))
console.log(formatTime("23:20PM"))