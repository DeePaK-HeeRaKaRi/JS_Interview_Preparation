// convert to 24hrs format
// const formatTime=(time)=>{
//     // const timeLowerCased = time.toLowerCase();
//     let [hrs,mins]=time.split(":")
//     // console.log(hrs,mins)
//     if(time.endsWith("AM")){
//         if(Number(hrs) < 12){
//             hrs = Number(hrs)
//         }
//         else{ 
//             hrs= hrs==="12" ? "00" : Number(hrs)+12
//         }
        
//     }else if(time.endsWith("PM")){
//         if(Number(hrs) < 12) {
//             hrs= hrs==="12" ? hrs : Number(hrs)+12
//         }
//         else{
//             hrs = Number(hrs)
//         }
        
//     }
//     return `${hrs}:${mins.slice(0,2)}`
// }


const formatTime = (time) => {
    // Validate input format
    if (!/^\d{1,2}:\d{2}(AM|PM)$/.test(time)) {
        throw new Error("Invalid time format. Use hh:mmAM/PM.");
    }

    let [hrs, mins] = time.slice(0, -2).split(":");
    const period = time.slice(-2); // "AM" or "PM"

    hrs = parseInt(hrs, 10); // Convert to number
    mins = mins.padStart(2, "0"); // Ensure minutes are two digits

    if (period === "AM") {
        hrs = hrs === 12 ? 0 : hrs; // 12AM -> 00, other AM times stay the same
    } else {
        hrs = hrs === 12 ? 12 : hrs + 12; // 12PM stays 12, other PM times add 12
    }

    return `${hrs.toString().padStart(2, "0")}:${mins}`;
};

// Test cases
console.log(formatTime("10:10AM")); // 10:10
console.log(formatTime("12:10AM")); // 00:10
console.log(formatTime("12:33PM")); // 12:33
console.log(formatTime("1:20PM"));  // 13:20
console.log(formatTime("11:20PM")); // 23:20
console.log(formatTime("11:20AM")); // 11:20

// Invalid input test case
try {
    console.log(formatTime("23:20PM")); // Should throw an error
} catch (err) {
    console.error(err.message);
}

console.log(formatTime("10:10AM"));
console.log(formatTime("12:10AM"));  // 00:10
console.log(formatTime("12:33PM"));  //12:33

console.log(formatTime("1:20PM")) //13:20
console.log(formatTime("11:20PM"))
console.log(formatTime("11:20AM"))
console.log(formatTime("23:20PM"))