/*

Detailed Explanation of useEffect
1. Purpose of useEffect:
useEffect is a React Hook used to perform side effects in functional components, such as fetching data, setting up subscriptions, or updating the DOM.
It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.

2. Dependency Array
What is the Dependency Array?
The dependency array determines when the useEffect callback is executed.
It tells React to re-run the effect only if one or more dependencies have changed since the last render.
How Does it Work?
No Dependency Array: The effect runs after every render.
Empty Dependency Array ([]): The effect runs only once, after the initial render (like componentDidMount).
With Dependencies: The effect runs whenever any value in the dependency array changes.
3. Why useEffect Executes Only Once with []?
When the dependency array is empty, React knows the effect doesn't rely on any changing values, so it only runs the effect during the component's initial render.
This mimics the behavior of componentDidMount in class components.
4. Objects or Arrays in the Dependency Array
What Happens?
React uses referential equality to determine changes.
For objects or arrays, even if their contents are the same, a new reference will trigger the effect unless the reference remains unchanged (e.g., via useMemo or useCallback).
Problem: Unintended re-renders or infinite loops if objects/arrays are created inline.
jsx
Copy code
useEffect(() => {
  console.log("Effect runs");
}, [{ key: "value" }]); // New object created on every render
Solution:
Use useMemo or move the object/array creation outside the component or effect to ensure the reference remains stable.
5. Passing a Ref in the Dependency Array
What Happens?
React refs are mutable and do not trigger re-renders.
If a ref is passed in the dependency array, the effect will not re-run unless the ref itself (not its .current value) changes.
jsx
Copy code
const myRef = useRef(null);
useEffect(() => {
  console.log(myRef.current); // Runs only if `myRef` changes
}, [myRef]); 
Key Note:
React does not track .current changes of a ref, so these changes won't trigger the effect.
Summary for Interview:
useEffect is for side effects in React.
The dependency array controls when the effect is executed.
An empty dependency array ([]) runs the effect only once, on mount.
Passing objects/arrays in the dependency array can cause re-renders due to referential equality issues; use useMemo or avoid inline creation.
Passing refs in the dependency array won’t trigger re-runs unless the ref itself changes, as .current is not tracked.
This concise understanding should suffice for most interview scenarios.


*/

