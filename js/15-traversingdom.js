let cont = document.querySelector(".no");
// cont=document.getElementsByClassName('no')
cont = document.querySelector(".container");
// console.log(cont.innerHTML)
// console.log(cont.childNodes)
// console.log(cont.children)

let container = document.querySelector("div.container");
// console.log(container.children)
// console.log(container.children[1].children[0].children)
// container=container.children[1].children[0].children
// Array.from(container).forEach((e)=>{
//     console.log(e.outerText)
// })
console.log('firstchild',container.firstChild);
console.log('firstElementChild',container.firstElementChild.innerHTML);

console.log(container.lastChild);
console.log(container.lastElementChild);

console.log(container.childElementCount);

// console.log(container.firstElementChild.parentElement.outerText.split(' '))
console.log(container.firstElementChild.parentNode);
console.log(container.firstElementChild.nextElementSibling.innerHTML);
