/*



Key Difference Between useEffect and useLayoutEffect:

useEffect: Runs asynchronously after the browser paints the UI. Use it for non-visual side effects like data fetching, logging, or subscriptions.

Execution Order:

React renders the component.
The browser paints the UI.
useEffect runs.

useLayoutEffect: Runs synchronously after the DOM updates but before the browser paints. Use it when DOM measurements or immediate updates are needed to avoid visual glitches.

Execution Order:

React renders the component.
useLayoutEffect runs.
The browser paints the UI.

Example 1: Avoiding Flicker with DOM Measurements
Use useLayoutEffect to measure and adjust the DOM before the user sees it.
import React, { useState, useLayoutEffect, useRef } from 'react';

function PreventFlicker() {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth); // Measure width before paint
  }, []);

  return <div ref={ref} style={{ width }}>Measured Width: {width}</div>;
}


Example 2: Synchronizing Scroll Position
Ensure the scroll position is updated before rendering to avoid layout shifts.

import React, { useLayoutEffect, useRef } from 'react';

function ScrollToTop({ trigger }) {
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.scrollTop = 0; // Reset scroll position before paint
  }, [trigger]);

  return (
    <div ref={ref} style={{ height: '200px', overflow: 'auto' }}>
      {content}
      </div>
    );
  }
  
*/


/*
The Browser Rendering Pipeline:

1. Parse HTML → DOM Tree
2. Parse CSS → CSSOM (CSS Object Model)
3. Combine DOM + CSSOM → Render Tree
4. Layout (Calculate positions/sizes)
5. Paint (Rasterize pixels)
6. Composite (Layer composition)
7. Display on screen

Where useLayoutEffect fits:
"Before the browser paints pixels to screen" means after steps 1-4 but before step 5 (Paint).

At that point:

✅ DOM is updated
✅ CSSOM is applied
✅ Layout is calculated (positions, dimensions known)
❌ Pixels NOT yet rasterized/drawn
❌ Nothing visible on screen yet
What "Paint" means:
Paint = Converting the render tree into actual pixels on your screen.

It involves:

Rasterizing (converting vector shapes to pixels)
Applying colors, shadows, borders, backgrounds
Creating the visual representation


useLayoutEffect(() => {
  // At this point:
  // ✅ DOM exists with styles applied
  // ✅ You can read element.offsetWidth (layout is done)
  // ❌ User hasn't seen anything yet
  
  const width = element.offsetWidth;  // Safe! Layout already calculated
  setTimer(value);
}, [])

// After useLayoutEffect completes:
// → React re-renders with new state
// → Browser runs Paint step
// → Pixels appear on screen
// → THEN useEffect runs
*/