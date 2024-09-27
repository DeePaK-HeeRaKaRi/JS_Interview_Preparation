const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    // in case you only want to allow for the display of only one collapsed item at a time! line 6 to 15
    const currentlyActiveaccordionItemHeader = document.querySelector(".accordion-item-header.active");
    if (
      currentlyActiveaccordionItemHeader &&
      currentlyActiveaccordionItemHeader !== accordionItemHeader
    ) {
      if (currentlyActiveaccordionItemHeader.classList.contains("active")) {
        currentlyActiveaccordionItemHeader.classList.remove("active");
        currentlyActiveaccordionItemHeader.nextElementSibling.style.maxHeight = 0;
      }
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight =1000 + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});
