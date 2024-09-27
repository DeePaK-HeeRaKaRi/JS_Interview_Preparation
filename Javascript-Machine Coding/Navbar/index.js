 
const navigationLists = document.querySelector(".navigation-lists");

Array.from(navigationLists.children).forEach((list) => {
  
  list.addEventListener("mouseover", () => {
    list.style.backgroundColor = "rgb(106, 141, 141)";
    if (list.children.length > 0) {
      list.children[0].classList.add("show-sublist");
      const subList = Array.from(list.children[0].children);
      subList.forEach((child) => {
        child.addEventListener("click", () => {
          console.log(`${child.innerText} was clicked`);
        });
      });
    }
  });

  list.addEventListener("mouseout", () => {
    list.style.backgroundColor = "";
    if (list.children.length > 0) {
      list.children[0].classList.remove("show-sublist");
    }
  });
});


