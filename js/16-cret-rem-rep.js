
console.log('Remove & Replacing elements')
document.getElementById('heading').innerHTML='Creating Removing & Replacing Elements'
let ele=document.createElement('li')
ele.className='newClass'
ele.setAttribute('title','mytitle')
ele.setAttribute('style','color:red;background-color:yellow')
ele.innerHTML='Dynamically Created Li'
let ul=document.querySelector('.container-ul')
ul.appendChild(ele)
// console.log(ele.outerHTML
let elem3=document.createElement('h3')
elem3.id='elem3'
elem3.className='elem3'
elem3.innerHTML='Replaced Text/element'
elem3.setAttribute('style','color:pink')
ele.replaceWith(elem3)
// console.log(ele)
// console.log(elem3)

let a=document.getElementById('container-ul')
a.replaceChild(ele,document.getElementById('fui'))
// console.log(a)
a.removeChild(document.getElementById('lui'))
// console.log(a)
console.log(document.querySelectorAll('.container-ul'))

let b=document.getElementById('heading')
b.replaceWith(elem3)
console.log(elem3)