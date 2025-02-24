/*

display: none
✅ Removed from the document flow (not rendered, no layout space occupied)
✅ Not interactable (no clicks, focus, etc.)
✅ Still exists in the DOM (can be accessed via JavaScript)
🔹 Use Case: Completely hiding an element without affecting the layout, such as for toggling visibility in JavaScript.

visibility: hidden
✅ Not visible but still occupies space in the layout
✅ Not interactable (no clicks, focus, etc.)
✅ Still exists in the DOM
🔹 Use Case: Useful when you want to hide an element while maintaining its space, such as for tooltips or modals that might reappear.

opacity: 0
✅ Not visible, but still occupies space in the layout
❌ Still interactable (elements remain clickable, focusable, etc.)
✅ Still exists in the DOM
🔹 Use Case: Used for fade-out animations where you want to make an element visually disappear while keeping it functional.

*/