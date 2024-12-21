const convertRGBToHex = (color) => {
    const hex = Number(color).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const getHexColor = (color) => {
    console.log({color})
    const canvas = document.createElement("canvas");
    console.log({canvas})
    const ctx = canvas.getContext("2d");
    console.log({ctx})
    ctx.fillStyle = color;
    const normalizedColor = ctx.fillStyle;
    console.log({normalizedColor})

    // If you set ctx.fillStyle = "red";, ctx.fillStyle will return "rgb(255, 0, 0)".
    // If you set ctx.fillStyle = "#f0f";, ctx.fillStyle will return "#ff00ff".
    //With the 2d context, you can draw shapes, manipulate images, set styles, and more.

//    This is the edge case.
    if (normalizedColor.startsWith("rgb")) {
        const rgbMatch = normalizedColor.match(/\d+/g);
        // console.log({rgbMatch})
        console.log({rgbMatch})
        if (!rgbMatch) return null;
        const [r, g, b] = rgbMatch.map(Number);
        return `#${convertRGBToHex(r)}${convertRGBToHex(g)}${convertRGBToHex(b)}`;
    }
    return normalizedColor;
};

const findElementsByColor = (rootElement, colorValue) => {
    const targetHexColor = getHexColor(colorValue);
    if (!targetHexColor) return [];

    const result = [];
    const queue = [rootElement];

    while (queue.length) {
        const currentElement = queue.shift();
        const computedStyle = window.getComputedStyle(currentElement);  
        console.log('-----------------',currentElement,computedStyle.color)
        const elementColorHex = getHexColor(computedStyle.color);
        console.log({elementColorHex, targetHexColor})
        if (elementColorHex === targetHexColor) {
            result.push(currentElement);
        }

        if (currentElement.children.length) {
            queue.push(...currentElement.children);
        }
    }

    return result;
};

// Example usage:
console.log(findElementsByColor(document.getElementById('root'), "#fff"));

/*
Why Is This Better?
Avoids DOM Manipulation:

No need to create, append, or remove elements from the DOM, which eliminates reflow and repaint.
Operations are entirely in memory, making them faster.
Reusable:

The Canvas element is a versatile and efficient way to normalize and manipulate color formats.

What to Do in an Interview?
In an interview, you should:

Explain Your Approach:

Mention that appending a div to the DOM works but can trigger reflow/repaint, which isn't optimal.
Highlight that Canvas is a better alternative for converting and normalizing colors without DOM impact.
Code the Optimized Solution:

If time permits, implement the canvas-based approach during the interview.

Property	.style.color	window.getComputedStyle().color
Inline styles	Works	                Works
Inherited styles	Doesn't work	    Works
Styles from CSS rules	Doesn't work	Works
Default browser styles	Doesn't work	Works
*/