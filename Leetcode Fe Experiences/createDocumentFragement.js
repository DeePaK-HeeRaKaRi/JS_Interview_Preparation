/*
document.createDocumentFragment() is a lightweight, minimal container used to hold and manipulate DOM elements before inserting them into the actual DOM. Unlike regular elements,
 a DocumentFragment is not part of the DOM tree itself, meaning it does not create additional nodes like <div> or <span>. Instead, it acts as a virtual wrapper 
 (<>...</>, similar to React fragments) that holds child nodes temporarily.

Key Points for an Interview:
Performance Optimization –
 Since DocumentFragment is not part of the DOM, modifications to it do not trigger reflows or repaints, making it efficient when adding multiple elements.

 No Parent Node –
  When you append a DocumentFragment to the DOM, only its child nodes are inserted, not the fragment itself.

  Use Case – 
    Used for batch DOM manipulations to improve performance when adding multiple elements


    const fragment = document.createDocumentFragment();

for (let i = 0; i < 5; i++) {
    let div = document.createElement('div');
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Appends to fragment, not DOM
}

document.body.appendChild(fragment); // Only child nodes are inserted, not the fragment itself

*/