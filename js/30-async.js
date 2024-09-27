console.log("Async Programming");
/* 
Async -> Allows multiple things to happen at the same time

Sync -> things happen one at a time 

When you call a function that performs a long action it
returns only when the action has finished so that it can return the result

This stops your program for the time the action takes

*/

setTimeout(()=>{
    for(let i=0;i<40049;i++){
        console.log('This is the index number '+i)
    }
},2000)

console.log("Done Printing")