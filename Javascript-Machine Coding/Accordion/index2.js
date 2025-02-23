
    // const accordionContainer = document.querySelector('.accordion')
    // const getCheckbox = document.querySelector('#MultipleCheckbox')
    // let checkBoxClicked = null

    // getCheckbox.addEventListener('click',(event) => {
    //     checkBoxClicked = event.target.checked
    // })

    // accordionContainer.addEventListener('click',(event) => {
    //     const clickedTitle = event.target.closest('.accordion-item-header')
    //     console.log({clickedTitle})

    //     if(!clickedTitle) return
         
    //     // Remove the prev opened acordions
    //     const openedAccordion = accordionContainer.querySelector('.accordion-item-header.active')

        
    //     console.log({openedAccordion,checkBoxClicked})  
    //     if(!checkBoxClicked && (openedAccordion && openedAccordion != clickedTitle)){
    //         console.log("==========")
    //         openedAccordion.classList.remove('active')
    //         openedAccordion.nextElementSibling.style.maxHeight = '0px'
    //     }

    //     clickedTitle.classList.toggle('active')

   
    //     const getContent = clickedTitle.nextElementSibling
    //     if(clickedTitle.classList.contains('active')) {
    //         getContent.style.maxHeight = getContent.scrollHeight + 'px'
    //     }
    //     else {
    //         getContent.style.maxHeight = '0px'
    //     }
    // })


const accordionContainer = document.querySelector('.accordion');
const getCheckbox = document.querySelector('#MultipleCheckbox');
let checkBoxClicked = false; // Default: Single selection mode
let lastOpenedAccordion = null; // Track the last opened accordion in single mode

getCheckbox.addEventListener('click', (event) => {
    checkBoxClicked = event.target.checked;
});

accordionContainer.addEventListener('click', (event) => {
    const clickedTitle = event.target.closest('.accordion-item-header');
    if (!clickedTitle) return;

    console.log({ clickedTitle,checkBoxClicked });

    // If in single-selection mode
    if (!checkBoxClicked) {
        
        if (lastOpenedAccordion && lastOpenedAccordion != clickedTitle) {
            console.log({lastOpenedAccordion,clickedTitle})
            lastOpenedAccordion.classList.remove('active');
            lastOpenedAccordion.nextElementSibling.style.maxHeight = '0px';
        }
        lastOpenedAccordion = clickedTitle.classList.contains('active') ? null : clickedTitle;
    }

    // Toggle the clicked accordion
    const isCurrentlyActive = clickedTitle.classList.contains('active');
    clickedTitle.classList.toggle('active');

    const getContent = clickedTitle.nextElementSibling;
    getContent.style.maxHeight = clickedTitle.classList.contains('active') ? getContent.scrollHeight + 'px' : '0px';
});
