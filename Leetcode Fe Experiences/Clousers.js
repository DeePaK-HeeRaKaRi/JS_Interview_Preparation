/*

In clouser How does javascript remember variables after function finishes?

Key Concepts
Scope and Lexical Environment:

When a function is created, it gets a lexical environment, which is essentially a record of all variables available to it at the time of its creation.
This lexical environment includes variables from its own scope and all outer (parent) scopes.

Closure:

A closure is formed when a function retains access to its lexical environment even after the function that created it has executed and returned.

Memory Retention:

JavaScript's Garbage Collector does not remove variables that are still referenced by a function. 
So, as long as the inner function exists (e.g., via a reference), its outer scope variables are preserved.

function outerFunction() {
    let counter = 0; // Variable in the outer function's scope

    function innerFunction() {
        counter++; // Inner function "remembers" `counter`
        return counter;
    }

    return innerFunction;
}

const increment = outerFunction(); // `outerFunction` is executed
console.log(increment()); // Output: 1
console.log(increment()); // Output: 2


What happens here?

When outerFunction is called, it creates a new execution context with counter initialized to 0.
It returns innerFunction, but innerFunction retains access to counter via the closure.
Even though outerFunction has finished executing, the innerFunction still has access to counter because of the closure.


Closures are often used for data encapsulation, like creating private variables, and for state management, like in the example above.



Why are closures useful?

Data encapsulation.
Maintaining state in functional programming.
Implementing currying and memoization.
What are potential issues with closures?

Memory leaks: If a closure is unintentionally retained, it can cause memory issues.
Overuse: Using closures where not needed can make the code harder to understand.

Conceptual Questions
How are closures different from a regular function scope?

Highlight that closures persist variables even after the outer function has finished, while regular function scopes are destroyed after execution.

Can you explain real-world use cases for closures?

Examples:
Data encapsulation (private variables).
Event handlers: Retaining state for an event listener.
Debouncing/throttling.
Currying: Breaking a function into smaller reusable parts.

What happens to variables in a closure if they’re not used anymore?

Explain that JavaScript’s garbage collector cleans up variables if no references exist to the closure or its variables.

What is the difference between closures and global variables?

Closures allow encapsulation and avoid polluting the global scope, unlike global variables.

How would you create a private variable in JavaScript?

javascript
Copy
Edit
function secretMessage() {
    let secret = "I am a secret!";
    return {
        getSecret: function() {
            return secret;
        },
        setSecret: function(newSecret) {
            secret = newSecret;
        },
    };
}
const secret = secretMessage();
console.log(secret.getSecret()); // "I am a secret!"
secret.setSecret("New secret");
console.log(secret.getSecret()); // "New secret"


Async Example with clousere


function fetchDataWithRetries(apiUrl, retries) {
    return function() {
        let attempt = 0; // Retained by the closure

        function tryFetch() {
            console.log(`Attempt ${attempt + 1}`);
            return fetch(apiUrl)
                .then(response => {
                    if (!response.ok && attempt < retries) {
                        attempt++;
                        return tryFetch(); // Retry on failure
                    }
                    return response.json();
                })
                .catch(error => {
                    if (attempt < retries) {
                        attempt++;
                        return tryFetch(); // Retry on error
                    }
                    throw error; // Exhausted retries
                });
        }

        return tryFetch();
    };
}

const fetchWith3Retries = fetchDataWithRetries("https://jsonplaceholder.typicode.com/posts/1", 3);

fetchWith3Retries()
    .then(data => console.log("Data fetched:", data))
    .catch(error => console.error("Failed after retries:", error));



xplanation:
Closure Formation:

fetchDataWithRetries creates a closure that retains access to:
apiUrl: The API endpoint.
retries: The maximum number of retry attempts.
attempt: The current attempt count.
Async Code:

The tryFetch function uses fetch to make an asynchronous call.
On failure, it retries the API call by recursively calling itself, maintaining access to the attempt variable through the closure.
Use Case:

The closure ensures attempt retains its value across multiple asynchronous operations, allowing retries to track the number of attempts.


Output (if the API is reachable):
 
Attempt 1
Data fetched: { id: 1, title: '...', ... }

Output (if the API is unreachable):
 
Attempt 1
Attempt 2
Attempt 3
Failed after retries: [Error object]


Why This Works:
The closure allows tryFetch to "remember" the attempt variable and increment it across asynchronous calls, even though fetchDataWithRetries has already returned. 
This demonstrates the power of closures in managing state across async tasks.
*/