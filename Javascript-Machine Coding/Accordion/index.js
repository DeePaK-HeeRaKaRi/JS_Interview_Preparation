// const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

// accordionItemHeaders.forEach((accordionItemHeader) => {
//   accordionItemHeader.addEventListener("click", (event) => {
//     // in case you only want to allow for the display of only one collapsed item at a time! line 6 to 15
//     const currentlyActiveaccordionItemHeader = document.querySelector(".accordion-item-header.active");
//     if (
//       currentlyActiveaccordionItemHeader &&
//       currentlyActiveaccordionItemHeader !== accordionItemHeader
//     ) {
//       if (currentlyActiveaccordionItemHeader.classList.contains("active")) {
//         currentlyActiveaccordionItemHeader.classList.remove("active");
//         currentlyActiveaccordionItemHeader.nextElementSibling.style.maxHeight = 0;
//       }
//     }

//     accordionItemHeader.classList.toggle("active");
//     const accordionItemBody = accordionItemHeader.nextElementSibling;
//     if (accordionItemHeader.classList.contains("active")) {
//       accordionItemBody.style.maxHeight =1000 + "px";
//     } else {
//       accordionItemBody.style.maxHeight = 0;
//     }
//   });
// });


const MultipleCheckbox = document.getElementById('MultipleCheckbox')
const accordion = document.querySelector('.accordion');
accordion.addEventListener('click',(event) => {
  if(MultipleCheckbox.checked) {
    MultipleCheckbox.checked = false
  }
  const clickedTitle = event.target.closest('.accordion-item-header')

  if(!clickedTitle) {
    return
  }

  // THis line causes an issue when the checkbox is selected and trying to close. close the 3rd ac, but the first will also close
  // const active_header = document.querySelector('.accordion-item-header.active')

  // Fix

  const active_header = clickedTitle.parentElement.querySelector('.accordion-item-header.active')
  if(active_header && active_header != clickedTitle) {
    active_header.classList.remove('active')
    active_header.nextElementSibling.style.maxHeight = null
  }
  
  const accordion_body = clickedTitle.nextElementSibling
  clickedTitle.classList.toggle('active')
  accordion_body.style.maxHeight = clickedTitle.classList.contains('active') ? accordion_body.scrollHeight + 'px' : null
})



MultipleCheckbox.addEventListener('change', (event) => {
  const checked = event.target.checked
  if(checked) {
    document.querySelectorAll('.accordion-item-header').forEach((accordionItemHeader) => {
      const accordionBody = accordionItemHeader.nextElementSibling
      accordionItemHeader.classList.add('active')
      accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px'
    })
  }
  else {
    document.querySelectorAll('.accordion-item-header').forEach((accordionItemHeader) => {
      const accordionBody = accordionItemHeader.nextElementSibling
      accordionItemHeader.classList.remove('active')
      accordionBody.style.maxHeight = null
    })
  }
})