const timer=(init=0,step=1)=>{
    let intervalId
    let count=init

    const startTimer=()=>{
        if(!intervalId){
            console.log('Timer started')
            intervalId=setInterval(()=>{
                console.log(count)
                count+=step
            },1000)
        }
    }

    const clearTimer=()=>{
        clearInterval(intervalId)
        intervalId=null
        // count=init
        console.log('Timer has been paused')
    }
    return {startTimer,clearTimer}
}
function onClickStart(){
    const timerObj=timer(10,10)
    console.log('------------',timerObj)
    // timerObj.startTimer()

    // setTimeout(()=>{
    //     timerObj.clearTimer()
    // },3200)
    const pauseAndResume = () => {
        timerObj.startTimer();
        
        setTimeout(() => {
            timerObj.clearTimer();
            setTimeout(pauseAndResume, 2000);
        }, 3200);
    };

    pauseAndResume();
}


const btn1=document.querySelector('.btn')
btn1.addEventListener('click',onClickStart)