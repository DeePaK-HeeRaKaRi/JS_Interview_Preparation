/*
For our trading application, going with CSR is a very reasonable choice because the important pages are authenticated, highly interactive, and realtime. SEO isn't the primary concern.

But in an interview, don't say simply "No SEO, therefore CSR." There are a couple of other reasons.

Rendering Strategy

We have three common approaches:

CSR
SSR
Hybrid
1. CSR — Client-Side Rendering ⭐ Our Choice

Browser receives a minimal HTML shell:

Browser
   │
   │ HTML
   ▼
App Shell
   │
   │ Download JS
   ▼
React Application
   │
   ├── REST API
   ├── WebSocket
   └── State Store

Example:

/login
/dashboard
/trading
/portfolio
/orders

After JS loads, React renders the UI and fetches the required data.

Why CSR fits our trading app
• Mostly authenticated pages
• SEO is not important
• Highly interactive UI
• Heavy client-side state
• WebSocket-based realtime updates
• Frequent UI updates
• User-specific data

For example:

Trading Page
      │
      ├── Fetch instruments
      ├── Fetch portfolio
      ├── Fetch orders
      └── Connect WebSocket
               │
               ├── Price updates
               ├── Order updates
               └── Order-book updates

CSR is a natural fit.

2. SSR

With SSR, the server generates HTML for the initial request.

Browser
   │
   │ Request
   ▼
Server
   │
   ├── Fetch data
   ├── Render React
   └── Generate HTML
          │
          ▼
       Browser
          │
          ▼
      Hydration

SSR is useful when:

• SEO is important
• Fast initial content matters
• Public pages need to be crawlable
• Server can efficiently fetch initial data

For example, if our company has:

example.com/stocks/tcs
example.com/stocks/infosys

and we want those pages indexed by Google, SSR could make sense.

But the actual authenticated trading dashboard doesn't gain much from SSR.

3. Hybrid Rendering ⭐

In a real application, we don't necessarily have to choose CSR everywhere or SSR everywhere.

We can use both.

                    Application
                         │
             ┌───────────┴───────────┐
             │                       │
         Public Pages          Authenticated App
             │                       │
            SSR                     CSR
             │                       │
        SEO important          Highly interactive

Example:

Public
├── /
├── /stocks/tcs
├── /about
└── /pricing
       ↓
      SSR


Authenticated
├── /dashboard
├── /trading
├── /portfolio
└── /orders
       ↓
      CSR

This is actually what I'd recommend if the product has both public and authenticated areas.

What would I choose for our trading app?
If we're designing only the authenticated trading platform:

CSR

Trading Platform
        │
        ▼
       CSR
        │
   ┌────┴─────┐
   ▼          ▼
 REST      WebSocket
   │          │
   └────┬─────┘
        ▼
   Client State
        ▼
       React
If we're designing the entire product:

Hybrid

                 Trading Platform
                        │
             ┌──────────┴──────────┐
             │                     │
        Public Pages         Authenticated App
             │                     │
            SSR                   CSR
             │                     │
            SEO              Interactivity
Important interview nuance

Don't say:

❌ "There is no SEO, so I'll use CSR."

Better:

"For the authenticated trading experience, 
I'd prefer CSR because the application is highly interactive, user-specific, and heavily dependent on client-side state and WebSocket updates. 
SEO isn't a primary requirement there. If the product also has public, SEO-sensitive pages such as stock discovery or marketing pages, 
I'd use a hybrid approach with SSR for those pages and CSR for the authenticated trading experience."

That's a much stronger senior-level answer.

Final notes
CSR
→ Best for authenticated, interactive applications
→ Our trading dashboard


SSR
→ Best for SEO + fast initial content
→ Public stock/marketing pages


Hybrid
→ Use SSR + CSR based on page requirements
→ Best choice for a complete trading product

For our current system design: choose CSR for the authenticated trading application.


*/