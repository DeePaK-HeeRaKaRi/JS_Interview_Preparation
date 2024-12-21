

const convertRGB_To_HEX=(color)=>{
  // color=Number(color)
  const hex=color.toString(16)
  return hex.length == 1 ? "0"+hex : hex
}
console.log('------------------',convertRGB_To_HEX(244), convertRGB_To_HEX(22), convertRGB_To_HEX(185));

const getHexColor = (color) => {
  const div = document.createElement("div");
  div.style.color = color;
  let colors = window.getComputedStyle(document.body.appendChild(div)); //any type of color converts into  rgb()
  console.log("colors---------", colors.color);
  colors = colors.color;
  const colorsString = JSON.stringify(colors);
  console.log("colorsString-----", colorsString);
  let rgbPattern = colorsString
    .substring(5, colorsString.length - 2)
    .split(", ");
    console.log('----rbgpattern--------',rgbPattern)
  const hexaColor =
    "#" +
    convertRGB_To_HEX(rgbPattern[0]) +
    convertRGB_To_HEX(rgbPattern[1]) +
    convertRGB_To_HEX(rgbPattern[2]);
  document.body.removeChild(div);
  console.log('---------------hexaColor=-----------',hexaColor);
  return hexaColor;
  // return colorsString
};

// colors.match(/\d+/g) , will return array with digits [255,255,255]
// .padStrart(2,"0") if value comes 0 than it will add two zeros

const findElementByColor = (element,colorValue) =>{
    const hexaColor = getHexColor(colorValue)
    let result=[]
    let queue = [element];
    while(queue.length){
        const currElement = queue.shift()
        const currColor = currElement.style.color
        const currColorHexValue = getHexColor(currColor)
        console.log('-------currCOLOR',currColorHexValue, hexaColor)
        if(currColorHexValue == hexaColor){
            result.push(currElement)
        }
        // console.log(currElement.children)
        if(currElement.children.length){
            queue.push(...currElement.children);
        } 
    }
    return result
}
 
const body=document.body
console.log('---------Result--------',findElementByColor(body, "#fff"));