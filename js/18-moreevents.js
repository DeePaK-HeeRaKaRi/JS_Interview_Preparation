document.getElementById("heading").innerHTML = 'More JS Events'
let btn=document.getElementById('btn')
btn.addEventListener('click',func1)
btn.addEventListener('dblclick',func2)
btn.addEventListener('mousedown',func3)
function func1(e){
   
    console.log('ThankYou',e)
    e.preventDefault()
    
}
function func2(e){
    console.log('ThankYou Double Clicked',e)
    e.preventDefault()
}
function func3(e){
    // do right click
    console.log('ThankYou MouseDown',e)
    e.preventDefault()
}
// document.querySelector('.no').addEventListener('mouseenter',function(){
//     console.log('You enterd into class-no')

// })
document.querySelector('.no').addEventListener('mouseleave',function(e){
    console.log('You exited no')
    document.querySelector('.no').style.backgroundColor=`rgb(${e.offsetX},${e.offsetX},${e.offsetX+e.offsetY})`
})

// document.querySelector('.container-ul').addEventListener('mousemove',function(e){
//     console.log('Mouse Triggered in Container')
//     document.querySelector('.container-ul').style.backgroundColor=`rgb(${e.offsetY},${e.offsetX},134)`
// })