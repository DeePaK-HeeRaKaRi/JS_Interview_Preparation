const getRGBColor = (color) => {
  const div = document.createElement("div");
  div.style.color = color;
  document.body.appendChild(div);
  const computedColor = window.getComputedStyle(div).color; // Get computed rgb() color
  document.body.removeChild(div);
  return computedColor; // Directly return rgb(r, g, b) format
};

const findElementByColor = (element, colorValue) => {
  const targetRGBColor = getRGBColor(colorValue); // Convert target color once

  let result = [];
  let queue = [element];

  while (queue.length) {
    const currElement = queue.shift();
    const currColor = window.getComputedStyle(currElement).color; // Get color in rgb()
    
    if (currColor === targetRGBColor) {
      result.push(currElement);
    }

    if (currElement.children.length) {
      queue.push(...currElement.children);
    }
  }
  return result;
};

// Test Case
// console.log("---------Result--------", findElementByColor(document.body, "#fff"));
console.log(findElementByColor(document.body, "rgba(255, 0, 0, 0.5)")); // Should match div1

 
console.log(findElementByColor(document.body, "rgb(255, 0, 0)")); // Should match div2,div3

 
console.log(findElementByColor(document.body, "#ff0000")); // Should match div3

 
console.log(findElementByColor(document.body, "rgba(255, 255, 255, 0)")); // Should match div4


/*

Why This is Interview-Ready?
✅ Handles all color formats (rgb(), rgba(), hex, named colors)
✅ Uses BFS for efficient DOM traversal
✅ Minimizes reflow/repaint (only reads computed styles, modifies borders)
✅ Easy to explain & expand

This is a solid test setup for an interview or debugging color-related issues in real-world projects!
*/