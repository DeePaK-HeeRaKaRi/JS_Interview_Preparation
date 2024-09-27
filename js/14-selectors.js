console.log("Selectors");
/*
1.Single Element Selectors
2.Multi Element Selectors
*/

// 1.Single Element Selectors
let element = document.getElementById("first");

element=element.className

// element=element.childNodes
// element=element.parentNode
// element.style.color = "red";
// document.getElementById('first').innerHTML='Deepak'
console.log(element);

let sel = document.querySelector("#first");
console.log("ds", document.querySelectorAll(".child")[0].childNodes[1]);
sel = document.querySelectorAll(".child")[1].nextElementSibling.innerHTML;
console.log("sel", sel);
let childs =
  document.querySelectorAll(".child")[0].childNodes[1].children[3].innerHTML;

console.log("childs", childs);

// 2.Multi Element Selectors

let elems = document.getElementsByClassName("container");
elems = document.getElementsByTagName("div");
console.log("elems", typeof elems);
// console.log(elems)
console.log("-----------------");
Array.from(elems).forEach((w) => {
  console.log("w", w);
  w.style.color = "green";
});
// console.log(elems[0].getElementsByClassName('child'))

// console.log(document.getElementsByTagName('form')[0].getElementsByTagName('input'))
