const root = document.getElementById('root')
const button=document.getElementById('button')
const randomRgbColor = () => {
  let r = Math.floor(Math.random() * 256); // Random between 0-255
  let g = Math.floor(Math.random() * 256); // Random between 0-255
  let b = Math.floor(Math.random() * 256); // Random between 0-255
//   return "rgb(" + r + "," + g + "," + b + ")";
    return `rgb(${r},${g},${b})`
};
let count = 0
function add(){
    // intially on buton click we need to call create()
    if(count==0){
        create(3)
    }
    count+=1
    button.innerHTML = `Total Progress Bars > ${count}`;

}
// function create(n){
//     // console.log(new Date().toISOString())
//     const ele = document.createElement('div')
//     ele.classList.add("ProgressBar")
//     ele.style = `transition: width ${n}s ease`;
//     ele.style.background=randomRgbColor()
//     setTimeout(()=>{
//         ele.classList.add("fullWidth");
//     },100)
//     root.appendChild(ele)
//     ele.addEventListener('transitionend',()=>{
//         count-=1
//         if(count>=1){
//             create(3)
//         }
//     })
//     ele.removeEventListener('transitionend',()=>{})
// }

function create(n) {
    const ele = document.createElement('div');
    ele.classList.add("ProgressBar");
    ele.style.transition = `width ${n}s ease`;
    ele.style.background = randomRgbColor();

    root.appendChild(ele);

    // Using requestAnimationFrame to ensure smooth animation
    /*
    When you create a new element and add it to the DOM, the browser needs time to update its layout. 
    Using a single requestAnimationFrame might sometimes not be enough, as the DOM change might not have been fully registered. 
    Nesting ensures the browser has applied the layout changes before starting the animation.
    */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            ele.classList.add("fullWidth");
        });
    });

    // ele.addEventListener('transitionend', () => {
    //     count -= 1;
    //     if (count >= 1) {
    //         create(3);
    //     }
    // });

    // Define the event listener as a named function
    const onTransitionEnd = () => {
        count -= 1;
        if (count >= 1) {
            create(3);
        }
        // Remove the event listener after it is triggered
        ele.removeEventListener('transitionend', onTransitionEnd);
    };

    // Add the named event listener
    ele.addEventListener('transitionend', onTransitionEnd);
}

// create(5)
// create(10);

/*
requestAnimationFrame: Executes callbacks just before the browser's next repaint, ensuring smooth animations synchronized with the display's refresh rate (typically 60fps).

setTimeout: Executes callbacks after a specified delay, regardless of the rendering cycle, which can lead to janky or out-of-sync animations.

*/