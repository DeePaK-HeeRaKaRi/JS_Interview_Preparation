document.getElementById("heading").innerHTML = "Events";
// addEventListener('mouseover')
document.getElementById("heading").addEventListener("click", function (e) {
  console.log("You HAve clicked on heading",e);
  let variable
  variable=e.target.innerHTML
  // variable=e.target.className
  // variable=e.offsetX
  // variable=e.offsetY
  console.log('variable',variable);
//   location.href='//youtube.com'
  alert('clicked an event')
});
document.querySelector(".list1").addEventListener("click", function (e) {
  console.log("helo");
});
