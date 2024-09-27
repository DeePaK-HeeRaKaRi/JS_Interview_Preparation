const replacer=(key,value)=>{
    console.log('----------',key,value)
    if(typeof value === 'string'){
        return null
    }
    return value
}
const foo = {
    foundation: "Mozilla",
    model: "box",
    week: 45,
    transport: "car",
    month: 7,
};
// Using the replacer - accepts function and array
console.log(JSON.stringify(foo, replacer))

// returns only the keys mentioned
console.log(JSON.stringify(foo,["model","foundation"]))

// Using the space parameter //5->space
console.log(JSON.stringify({ a: 2,b:56 }, null, 5));
console.log(JSON.stringify({ a: 2,b:56 }, null, '\t'));