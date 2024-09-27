const componentToHex = (c) => {
    const hex = c.toString(16);
    // if oit has length 1 append 0 to it
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
console.log(rgbToHex(255, 51, 255));
//"#ff33ff"