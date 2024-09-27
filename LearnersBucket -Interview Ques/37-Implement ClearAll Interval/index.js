const My_Timer={
    intervalIds:[],
    set_Interval:function(fn,delay){
        let id=setInterval(fn,delay)
        this.intervalIds.push(id)
        return id
    },
    clear_Interval:function(){
        while(this.intervalIds.length){
            clearInterval(this.intervalIds.shift())
        }
    }
}
const set=document.querySelector('#timer')
My_Timer.set_Interval(()=>{
    console.log('hello-1')
},1000)
My_Timer.set_Interval(()=>{
    console.log('hello-2')
},2000)

My_Timer.clear_Interval()
My_Timer.set_Interval(()=>{
    // console.log('hello-1')
    const date=new Date()
    // set.innerHTML=date.toISOString()
    set.innerHTML=date.toLocaleTimeString()
    // console.log(date.toISOString())
},1000)

// My_Timer.clear_Interval();
// setInterval(() => {
//     console.log("Hello");
//     }, 2000);
// setInterval(() => {
//     console.log("Hello2");
// }, 500);
// clearAllInterval(); // clears first two intervals
// setInterval(() => {
//     console.log("Hello3");
// }, 1000)
// Output:
// ".clear_Interval