var checkboxes = document.querySelectorAll("input[type = 'checkbox']");
var optionAll = document.getElementById("option-all");
var optionA = document.getElementById("option-a");
var optionB = document.getElementById("option-b");
var optionC = document.getElementById("option-c");
console.log('checkBoxes--------',checkboxes)
function checkAll() {
  if (checkboxes[0].checked == true) {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = true;
    });
  } else {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  }
}
function checkHandler(){
    if (optionA.checked && optionB.checked && optionC.checked) {
      optionAll.checked = true;
    }
    else{
        optionAll.checked = false
    }
}
optionA.addEventListener("click", (e) => {
    checkHandler()
});
optionB.addEventListener("change", (e) => {
  checkHandler();
});
optionC.addEventListener("change", (e) => {
  checkHandler();
});
