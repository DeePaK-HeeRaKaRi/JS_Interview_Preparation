const container = document.getElementById('container');
const postsContainer = document.getElementById('posts');
const loadingText = document.getElementById('loadingText');

let isLoading = false;

function loadPosts() {
    if (isLoading) return;  // Prevent multiple loads
    isLoading = true;
    loadingText.textContent = "Loading...";

    // Simulate post loading with a delay
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            const post = document.createElement('div');
            post.classList.add('post');
            post.textContent = `Post #${postsContainer.children.length + 1}`;
            postsContainer.appendChild(post);
        }

        loadingText.textContent = "Scroll down for more...";
        isLoading = false; // Reset loading flag
    }, 1000);
}

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading) {
            console.log("Loading new posts...");
            loadPosts();
        }
    });
};

const options = {
    root: container,
    rootMargin: '50px',
    threshold: 0.5 // Trigger when 50% of the loading text is visible
};

const observer = new IntersectionObserver(observerCallback, options);
observer.observe(loadingText);  // Start observing loadingText

// Load initial posts
loadPosts();

// The observer parameter allows you to interact with the IntersectionObserver instance inside the callback function. It provides several methods that can be useful in certain situations, such as:

// observer.observe(target):

// Re-observes a target element for intersection changes.
// Useful if you want to reattach the observer to new elements dynamically.
// observer.unobserve(target):

// Stops observing a specific target element.
// For example, once you've loaded posts, you might want to stop observing the "loading" indicator until the next scroll.
// observer.disconnect():

// Stops observing all target elements.
// Useful if you want to clean up and stop observing once you no longer need infinite scrolling (e.g., when you've loaded all the posts).
// observer.takeRecords():

// Retrieves a list of intersection entries that have not yet been processed.
// Rarely used in simple cases but can be helpful in advanced scenarios.