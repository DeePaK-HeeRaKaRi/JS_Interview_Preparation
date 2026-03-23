/*
SSR + CSR Hydration in React (like Airbnb, Amazon, etc.)

Hydration - Hydration is the process where React attaches event listeners and state to already rendered HTML from the server instead of rendering again.

Server → Generates HTML
Client → Adds JS logic to that HTML

React does NOT recreate DOM.
It reuses existing DOM and attaches events.

Without SSR
Browser loads empty HTML
JS loads
React renders
DOM created
Page visible

Slow first paint.
---------------------------------
With SSR
Server renders HTML
Browser receives HTML
Browser paints UI immediately
JS loads
React hydrates
App becomes interactive
--------------------------------------

Detailed SSR + Hydration Flow
Browser → Request page
           ↓
Node Server
           ↓
React renderToString()
           ↓
Fetch API data
           ↓
Generate HTML
           ↓
Send HTML to browser
           ↓
Browser shows UI
           ↓
Browser downloads JS bundle
           ↓
ReactDOM.hydrateRoot()
           ↓
Attach events
           ↓
SPA navigation starts

------------------------------------

During hydration React compares:

Server HTML
vs
Client Virtual DOM

If mismatch → React re-renders.

So we must ensure:

Same data
Same markup
No random values
No Date.now()
No Math.random()

Otherwise hydration error.

-----------------------------------------

On initial request, the server renders the React components into HTML using renderToString and sends HTML along with initial data. 
The browser displays the HTML immediately for fast first paint and SEO. Then the React bundle loads on the client and React hydrates the existing DOM using hydrateRoot by attaching event listeners and state. 
After hydration, the app behaves like a normal CSR SPA for further navigation.

----------------

Where does renderToString run?

import { renderToString } from "react-dom/server";

This can only run in Node.js, because:

It executes React on the server
Generates HTML string
Sends HTML to browser

So this code runs in:

Node.js SSR server (Express / Next.js server)

User → opens /hotels/goa
        ↓
Request → Node SSR server
        ↓
Node calls → Java API → /api/hotels?location=goa
        ↓
Java returns hotel data
        ↓
Node renders React using renderToString()
        ↓
Node sends HTML + initial data
        ↓
Browser loads page
        ↓
Hydration
        ↓
CSR navigation

app.get("/hotels", async (req, res) => {
    const hotelData = await fetch("http://java-api/hotels").then(r => r.json());

    const html = renderToString(<App data={hotelData} />);

    res.send(`
      <html>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__INITIAL_DATA__ = ${JSON.stringify(hotelData)}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `);
});

renderToString runs on a Node.js SSR server. The Node server fetches data from backend services like Java APIs,
 renders React components into HTML on the server, sends the HTML along with initial data to the browser, and then the browser hydrates the app to make it interactive.

 ==============================

 How client hydrates after receiving SSR HTML and how hydration errors happen

1. After SSR, browser receives something like:

<html>
  <body>
    <div id="root">
      <div>
        <h1>Hotels in Goa</h1>
        <button>Book</button>
      </div>
    </div>

    <script>
      window.__INITIAL_DATA__ = { location: "Goa" }
    </script>

    <script src="/bundle.js"></script>
  </body>
</html>

At this point:

Page is already visible
But button click won’t work yet
No React state yet
No event listeners yet

So page is static HTML right now.
---------
2. Hydration Starts When JS Loads

Inside your client bundle:

import { hydrateRoot } from "react-dom/client";
import App from "./App";

const data = window.__INITIAL_DATA__;

hydrateRoot(
  document.getElementById("root"),
  <App data={data} />
);

This is where hydration starts.

---------------------------

3. What React Does During Hydration (Very Important)

Hydration is NOT rendering from scratch.

Instead React does:

1. Find existing DOM inside #root
2. Create Virtual DOM from <App />
3. Compare Virtual DOM with existing DOM
4. Attach event listeners
5. Attach state
6. Mark DOM as controlled by React

So flow:

Server HTML → Browser DOM
                      ↑
              React Virtual DOM
                      ↑
                hydrateRoot()

React basically connects Virtual DOM to existing DOM.

----------------
5. Example of Event Attachment During Hydration

Server HTML:

<button>Book</button>

Client React code:

<button onClick={handleBooking}>Book</button>

------------------

7. Common Causes of Hydration Errors

Very important list for interviews.

Causes:
Math.random()
Date.now()
new Date()
window.innerWidth
Conditional rendering based on window
API called again on client
Different locale formatting
Different timezone
Non-deterministic sorting
Using localStorage during render
Example Problem
const id = Math.random();
return <div>{id}</div>;

Server random ≠ Client random → Hydration error.

---------------------------------

8. How React Detects Hydration Errors Internally

Internally React hydration algorithm:

hydrateRoot()
   ↓
create fiber tree
   ↓
walk existing DOM
   ↓
compare node types
   ↓
compare text content
   ↓
compare props
   ↓
if mismatch → throw hydration warning
   ↓
React may re-render that subtree

Important:

React tries to reuse DOM, but if mismatch is big, it throws away server DOM and re-renders on client.

---------------------------------------------------

When using SSR + Hydration:

The HTML is already injected into the DOM and visible before hydrateRoot runs.
hydrateRoot does NOT inject HTML again — it only attaches React (events, state) to the existing DOM.

Request page
   ↓
Server renders HTML
   ↓
HTML arrives in browser
   ↓
Browser builds DOM
   ↓
Browser paints UI  ← USER SEES PAGE HERE
   ↓
JS bundle downloads
   ↓
hydrateRoot()
   ↓
React attaches events
   ↓
App interactive

-----------------
When does DOM get created in SSR + hydration?

Answer:

In SSR, the server sends fully rendered HTML which the browser immediately parses into DOM and paints on the screen. After that, the JavaScript bundle loads and React calls hydrateRoot, 
which builds the virtual DOM and fiber tree and attaches event listeners by matching the virtual DOM with the existing server-rendered DOM instead of creating new DOM nodes.

------------------------------

SSR:
Server → HTML → Browser → DOM → Paint UI

Hydration:
JS loads → hydrateRoot → VDOM → Fiber → Attach to DOM

After hydration:
React controls DOM normally

===================================================

Let’s do a small concrete example that produces a hydration error and then step-by-step see how React detects it by comparing VDOM and real DOM.

1. Small SSR Example That Causes Hydration Error
React Component
function App() {
  return (
    <div>
      <h1>Time:</h1>
      <p>{Date.now()}</p>
    </div>
  );
}

This is a classic hydration error example.

2. What Happens on Server (SSR)

Server runs React:

renderToString(<App />)

Suppose server time:

1710000000000

Server sends HTML:

<div id="root">
  <div>
    <h1>Time:</h1>
    <p>1710000000000</p>
  </div>
</div>

Browser builds DOM from this.

So Real DOM now contains:

div
 ├── h1 "Time:"
 └── p "1710000000000"

UI already visible.

3. Now Hydration Starts on Client

Client runs:

hydrateRoot(document.getElementById("root"), <App />);

React runs <App /> again on client.

But now Date.now() is different:

1710000005000

So Virtual DOM becomes:

div
 ├── h1 "Time:"
 └── p "1710000005000"
4. Now React Compares DOM vs Virtual DOM

This is the important part.

React walks both trees in order:

Fiber (VDOM)	Real DOM
div	div
h1	h1
"Time:"	"Time:"
p	p
"1710000005000"	"1710000000000" ❌

Mismatch detected.

So React prints:

Warning: Text content did not match.
Server: "1710000000000"
Client: "1710000005000"

This is hydration error detection.


hydrateRoot()
    ↓
render App → Virtual DOM
    ↓
build Fiber tree
    ↓
get existing DOM
    ↓
walk both trees together
    ↓
compare:
   - element type
   - text
   - attributes
   - children count
    ↓
if match → attach events
if mismatch → warning / re-render

=============================================

9. Final Summary (Remember This)
SSR:
Server → HTML → Browser → DOM → Paint UI

Hydration:
JS loads → hydrateRoot → VDOM → Fiber → Attach to DOM

After hydration:
React controls DOM normally
*/