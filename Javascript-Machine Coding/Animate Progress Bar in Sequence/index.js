const root = document.getElementById('root')
const remainingBrogressBars = document.getElementById("remainingBrogressBars");
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
function create(n){
    // console.log(new Date().toISOString())
    const ele = document.createElement('div')
    ele.classList.add("ProgressBar")
    ele.style = `transition: width ${n}s ease`;
    ele.style.background=randomRgbColor()
    setTimeout(()=>{
        ele.classList.add("fullWidth");
    },100)
    root.appendChild(ele)
    ele.addEventListener('transitionend',()=>{
        count-=1
        if(count>=1){
            create(3)
        }
    })
    ele.removeEventListener('transitionend',()=>{})
}
// create(5)
// create(10);