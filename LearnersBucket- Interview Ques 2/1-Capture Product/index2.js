const visibleProducts = new Set(); // Store visible product names

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {  //like target,isInterseting,getBoundinigClientRect
            visibleProducts.add(entry.target.textContent); // Add visible product
        } else {
            visibleProducts.delete(entry.target.textContent); // Remove if out of view
        }
    });
}, {
    root: null, // Uses viewport as the root
    threshold: 0.5 // At least 50% of the element must be visible
    // rootMargin: "0px 0px 10px 0px", // Extends detection 10px beyond the bottom
    // threshold: 0 // Detects when **any part** of the element enters this area
});

// Select all product elements and observe them
document.querySelectorAll('.blocks').forEach(element => observer.observe(element));

// Stop observing (if needed)
const stopObserving = () => {
    document.querySelectorAll('.blocks').forEach(element => observer.unobserve(element));
};

// Log visible elements when scrolling stops
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        console.log([...visibleProducts]); // Log visible product names
    }, 1000); // 1s debounce effect
});
