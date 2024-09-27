import { createElement,createElements } from "./helper.js";

const starCount = 5; // Use multiples of 5
const smileys = ["😢", "😞", "😐", "😀", "😎"];
const starContainer = document.querySelector("#starContainer");
const smileyContainer = document.querySelector("#smileyContainer");
let rating = 0;
let filled = 0; // to reduce the iterations
let unfilled = 0; // to reduce the iterations

starContainer.appendChild(
    createElements(starCount, i => createElement('div', { class: 'star star-empty', 'data-index': i }), 1)
)

const stars =document.querySelectorAll('.star')

starContainer.addEventListener('mouseover',hoverListener)
starContainer.addEventListener("click", clickListener);
starContainer.addEventListener("mouseleave", leaveListener);
 

function hoverListener(event){
    const target = event.target
    if(target.classList.contains('star')){
        const index=target.dataset.index
        console.log('----',index)
        fillStars(+index)
    }
}
function fillStars(count){
    for(let i=filled;i<count;i++){
        stars[i].classList.add('star-filled')
        stars[i].classList.remove('star-empty')
    }

    for (let i = count; i < unfilled; i++) {
      stars[i].classList.remove("star-filled");
      stars[i].classList.add("star-empty");
    }

    filled = count;
    unfilled = count;
}
function leaveListener(){
    fillStars(+rating)
}

function clickListener(event){
    const target=event.target
    if(target.classList.contains('star')){
        rating= +target.dataset.index;
        console.log('rating------',rating)
        setSmiley(rating)
    }
}

function setSmiley(rating) {
  console.log("smileyRating-,", rating);
  smileyContainer.textContent = smileys[rating-1];
}