const renderTime=document.querySelector('#time')
const clock=()=>{
    const date=new Date()
    let hrs=date.getHours()
    let mins=date.getMinutes()
    let secs=date.getSeconds()
    console.log({hrs,mins,secs})
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
}

// if inp length is 0 append 0 before to it
const pad=(inp)=>{
    console.log('---------',{inp},inp.length)
    return String(inp).length === 1 ? '0'+String(inp) :String(inp)
}
setInterval(()=>{
    const date=new Date()
    // renderTime.innerHTML=date.toLocaleString()
    // renderTime.innerHTML=date.toLocaleTimeString()

     // renderTime.innerHTML=date.toLocaleDateString()

    // const options = { year: 'numeric', month: 'short', day: '2-digit' };
    // const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', '');
    // renderTime.innerHTML = formattedDate +' > ' +date.toLocaleTimeString();
   
    console.log(clock())
    // renderTime.innerHTML = Date.now() + ' ' + new Date().now()

},1000)

