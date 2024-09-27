// based on time works as leading
function throttle(fn, delay,option={leading:true,trailing:true}) {
  let lastTimerId;
  let lastRan;
  return function (...args) {
    const context = this; //when we invoke the input fn , we can pass the context to that along with the args

    if (!lastRan) {
      fn.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastTimerId); //we have control here
      lastTimerId = setTimeout(() => {
        if (Date.now() - lastRan >= delay) {
          //additional check
          fn.apply(context, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}
// first call will happen immediately and second will happen based on time
const onClick = () => {
  console.log("clicked");
};

const throttleClick = throttle(onClick, 4000);
const btn = document.getElementById("btn");
btn.addEventListener("click", throttleClick);
