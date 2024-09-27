const My_Timer={
    timeoutIds:[],
    setTimeOut:function(fn,delay){
        let id=setTimeout(fn,delay);
        console.log({id})
        this.timeoutIds.push(id)
        return id
    },
    clearAllTimeOut:function(){
        while(this.timeoutIds.length){
            console.log('clearing all timeouts',this.timeoutIds)
            clearTimeout(this.timeoutIds.shift())
        }
    }
}

const id=My_Timer.setTimeOut(()=>{
    console.log('hello')
},1000)
const id1=My_Timer.setTimeOut(()=>{
    console.log('hello')
},2000)
const id2=My_Timer.setTimeOut(()=>{
    console.log('hello')
},3000)
const id3=My_Timer.setTimeOut(()=>{
    console.log('hello')
},4000)
const id4=My_Timer.setTimeOut(()=>{
    console.log('hello')
},5000)
console.log({id,id1,id2,id3,id4})
My_Timer.clearAllTimeOut()
const id5 = My_Timer.setTimeOut(() => {
  console.log("helloiuiuu");
}, 1);

