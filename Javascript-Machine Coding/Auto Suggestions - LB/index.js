// self invoking function , so that your script doesnot conflict with any other script running in your browser

import { Debounce } from "./debounce.js";
import { getSearchResults } from "./util.js";

// // Mock Server
// const FAILURE_COUNT = 10;
// const LATENCY = 200;

// function getRandomBool(n) {
//   const threshold = 1000;
//   if (n > threshold) n = threshold;
//   return Math.floor(Math.random() * threshold) % n === 0;
// }

// function getSuggestions(text) {
//   var pre = "pre";
//   var post = "post";
//   var results = [];
//   if (getRandomBool(2)) {
//     results.push(pre + text);
//   }
//   if (getRandomBool(2)) {
//     results.push(text);
//   }
//   if (getRandomBool(2)) {
//     results.push(text + post);
//   }
//   if (getRandomBool(2)) {
//     results.push(pre + text + post);
//   }
//   return new Promise((resolve, reject) => {
//     const randomTimeout = Math.random() * LATENCY;
//     setTimeout(() => {
//       if (getRandomBool(FAILURE_COUNT)) {
//         reject();
//       } else {
//         resolve(results);
//       }
//     }, randomTimeout);
//   });
// }
// const Debounce = (fn, delay) => {
//   let timerID;
//   return function () {
//     let context = this;
//     let args = arguments;
//     console.log("args--------", args);
//     clearTimeout(timerID);
//     timerID = setTimeout(() => {
//       fn.apply(context, args);
//     }, delay);
//   };
// };

(function () {
  const input = document.getElementById("search");
  const suggestionArea = document.getElementById("suggestion-area");
  let activeIndex = -1;

  const onFocus = () => {
    suggestionArea.style.display = "block";
  };

  const onBlur = (e) => {
    if (e.target === input || e.target === suggestionArea) {
      return;
    }
    suggestionArea.style.display = "none";
  };

  const processData = async (value) => {
    console.log("value====", value);
    suggestionArea.innerHTML = "";
    if (!value) {
      return;
    }
    try {
      // const resp = await getSuggestions(value);
      const resp = await getSearchResults(value);
      console.log(resp);
      if (resp.length > 0) {
        const list = document.createElement("ul");
        resp.forEach((val, index) => {
          const listItems = document.createElement("li");
          listItems.setAttribute("class", "listItems");
          listItems.style.cursor = "pointer";
          listItems.innerText = val;
          list.appendChild(listItems);
        });
        suggestionArea.innerHTML = "";
        suggestionArea.appendChild(list);
      }
    } catch (e) {
      console.log("Error while making network call", e);
    }
  };

  const debounceProcess = Debounce(processData, 1500);

  const onChange = (e) => {
    const value = e.target.value;
    console.log("event code", e.keyCode, e);
    debounceProcess(value);
  };

  const onClick = (e) => {
    // console.log('-----',e.target)
    
      if (e.target == suggestionArea) return; //should get value when we click on li
      input.value = e.target.innerText;
      input.focus();
    
  };

  const onKeyDown = (e) => {
   
      const listItems = suggestionArea.querySelectorAll(".listItems");
      const maxIndex = listItems.length - 1;
      const minIndex = 0;
      if (e.keyCode === 13) {
        console.log("pressed Enter");
        // if(activeIndex === -1) return
        onBlur(e);
        return;
      } else if (e.keyCode === 40) {
        // Down arrow key
        activeIndex = activeIndex == maxIndex ? minIndex : activeIndex + 1;
      } else if (e.keyCode === 38) {
        // Up arrow key
        activeIndex = activeIndex == minIndex ? maxIndex : activeIndex - 1;
      } else {
        return;
      }

      listItems.forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add("listItemactive");
          input.value = item.innerText;
        } else {
          item.classList.remove("listItemactive");
        }
      });
    
  };

  input.addEventListener("focus", onFocus);
  // window.addEventListener("click", onBlur);
  // keyup is formation of two events
  //  - keyup &  -keydown
  // input.addEventListener("change", onChange);
  input.addEventListener("keyup", onChange);
  input.addEventListener("keydown", onKeyDown);
  suggestionArea.addEventListener("click", onClick, true);
})();
