
/*Components of the Box Model
The CSS box model is a framework that defines how elements are displayed on a web page. It consists of:

Content: The area where text or images are displayed.
Padding: The space between the content and the border.
Border: The edge around the padding (or content, if no padding is applied).
Margin: The outermost space between the element and neighboring elements.   
==================================
Default: box-sizing: content-box
Width and height include only the content.
Padding, border, and margin are added outside the specified width and height, increasing the total size of the element.
Example:

div {
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 5px solid black;
}

Actual size:
Width = 200px (content) + 20px (padding) + 10px (border) = 230px
Height = 100px (content) + 20px (padding) + 10px (border) = 130px


========================================


Commonly Used: box-sizing: border-box
Width and height include content, padding, and border.
This keeps the total size constant, simplifying layout calculations.
Example:


div {
  width: 200px;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  border: 5px solid black;
}


Actual size:
Width = 200px (content + padding + border)
Height = 100px (content + padding + border)
==========================================================

Why Use border-box?
It avoids unexpected layout shifts when adding padding or borders.
It's often set globally using:
css
Copy code
* {
  box-sizing: border-box;
}

===================================================

Key Takeaway
Margins are external spacing and are not part of the box model. This is why they are not influenced by box-sizing.
*/


