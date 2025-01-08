const progressBarContainer = document.querySelector('.progressBarContainer')
const addBtn = document.querySelector('.addButton')
let btnCount = 0
let flag = false
addBtn.addEventListener('click', (e)=>{
    btnCount++
    let ele = document.createElement('div')
    ele.classList.add(`progress-bar-container`,`progress-bar-container-${btnCount}`)
    progressBarContainer.appendChild(ele)  
    if(btnCount == 1 || flag) { //Intially start the progress bar or if we stopped clicking on add button and if we clicked on add button after sometime
        flag = false
        createProgressBar(btnCount)
    }
    
})

function createProgressBar(n) {
    let getCurrProgressBarContainer = document.querySelector(`.progress-bar-container-${n}`)
    let progressBarDiv =  document.createElement('div');
    progressBarDiv.classList.add('progressBar')
    // setTimeout(() => progressBarDiv.style= 'width:100%',0 )
    getCurrProgressBarContainer.appendChild(progressBarDiv);
    requestAnimationFrame(()=>{
        requestAnimationFrame(() => progressBarDiv.style= 'width:100%')
     })
    // progressBarDiv.style= 'width:100%'
    progressBarDiv.addEventListener('transitionend',()=>{
        if(n+1 <= btnCount && !flag){
            createProgressBar(n+1)
        }
        else{ 
            flag = true
        }
    })
    // getCurrProgressBarContainer.appendChild(progressBarDiv);
}

// btnCount = 3 , n = 3 next > n = 4 