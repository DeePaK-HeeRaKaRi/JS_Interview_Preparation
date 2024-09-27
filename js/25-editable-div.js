console.log('IF we click on any div /para/heading we should able to edit it')
/*
 
You have to create a div and inject it into the page which contains a heading.
whenever someone clicks on the div, it should be converted into an editable item. whenever user clicks away (blur). 
save the note into the local storage.

*/

//  Create a element
let divElement=document.createElement('div')
// Add text to that created element
let val=localStorage.getItem('text')
var text
if (val==null){
    // text=document.createTextNode('This is my element.click to Edit')
    text='click here to edit'
     
}else{
    // text=document.createTextNode(val)
    text=val
}
divElement.innerHTML=text
// divElement.appendChild(text)
 
// Give the element id style class
divElement.setAttribute('id','elem')
divElement.setAttribute('class','elem')
divElement.setAttribute('style','border:2px solid green;margin:34px;width:60%;padding:23px;cursor:pointer')

// Grab the main Container
let container=document.querySelector('.container')
let first=document.getElementById('first')

// insert the divElement before element with id=first
container.insertBefore(divElement,first)
console.log(divElement,container,first)

// add event listener to divElement
divElement.addEventListener('click',function(){
    
    let nuTextArea=document.getElementsByClassName('textarea').length;
    console.log("bhbd")
    console.log("nutarea",nuTextArea)
    console.log('elem',elem)
    if(nuTextArea==0){
        // let html=elem.innerHTML
        let html=text
        divElement.innerHTML=` 
        <textarea class="form-control textarea" placeholder="Leave a comment here" id="textarea">${html}</textarea>
        `
    }
    console.log("nutarea",nuTextArea)
    // listen for blur event on textarea
    let textarea=document.getElementById('textarea')
    // blur -> mouse away
    textarea.addEventListener('blur',function(){
        divElement.innerHTML=textarea.value
        localStorage.setItem('text',textarea.value)
    })
})

t=localStorage.getItem("dps")
console.log("t is",t)
localStorage.clear()