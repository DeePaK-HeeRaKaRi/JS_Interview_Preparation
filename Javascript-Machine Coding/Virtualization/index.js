
/*
Using Intersection observer

in ins=tersection observer , it will obserevr an element , ifthat is in the view post, it will return that leement is intersectiong ad returns true

virtualization - we hav large amount of data and view port is a limited space at any given time we need to show minimum amount of data

total ht of vp / each ht =  elements

400 / 40 = 10 show 10 elements on view port

I can add a buffer 5 + 10 + 5 = > 20 elemnts [5 is buffer]

if we scroll down > 10[becomes 5] >5 + 10 + 5

sentinal [ two paceholders we will place before & after the rendered chunk]

sentinal

visible items
visible items
visible items
visible items
visible items

sentinal

if the sentinal is intersecting, which means we will render some buffre elements before this


We use chunk techinquq

*/
class VirtualList{
    constructor(container, options = {}) {
        this.container = container
        this.itemHeight = options.itemHeight || 40
        this.chunkSize = options.chunkSize || 30
        this.items = options.items || []
        this.renderItem = options.renderItem || ((item,index) => `<div>${item}</div>`)
        this.chunks = new Map()
        this.observer = null

        this.init() // calls when the class is mounted
    }

    init() {
        /* Make the container relative, items should be placed absolute within that */
        this.container.style.position = 'relative';
        this.container.style.overflow = 'auto'
        this.container.style.height = this.container.style.height || '400px'

        //inner element
        this.content = document.createElement('div')
        this.content.style.position = 'relative'
        this.content.style.height = `${this.items.length * this.itemHeight}px`
        this.container.appendChild(this.content)
        this.setupObserver()
        this.createChunks()
        
    }

    totalChunks() {
        return Math.ceil(this.items.length / this.chunkSize)
    }

    getChunkHeight() {
        return this.chunkSize * this.itemHeight
    }

    createChunks() {
        const fragment = document.createDocumentFragment()

        for(let i=0;i<this.totalChunks(); i++) {
            const start_index = i * this.chunkSize
            const chunk_height = this.chunkSize * this.itemHeight

            const chunk_element = document.createElement('div')
            chunk_element.className = 'virtual-chunk'
            chunk_element.dataset.chunk = i // set the chunk index
            chunk_element.style.cssText =  `
            position: absolute;
            top: ${start_index * this.itemHeight}px;
            left: 0;
            right: 0;
            height: ${chunk_height}px;
            `
            this.chunks.set(i, {element: chunk_element, mounted: false})
            this.observer.observe(chunk_element)

            fragment.appendChild(chunk_element)
            console.log({chunk_element})
        }

        this.content.appendChild(fragment)
        console.log('chunks map', this.chunks)
    }

    setupObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const chunk_index = parseInt(entry.target.dataset.chunk);

                    if(entry.isIntersecting) {
                        this.mountChunk(chunk_index)
                    }
                    else {
                       this.unmountChunk(chunk_index)
                    }
                })
            },
            {
                root: this.container,
                rootMargin: '200px 0px',
                threshold: 0
            }
        )
    }

    // render items in chunk
    mountChunk(chunkIndex) {
        const chunk = this.chunks.get(chunkIndex)
        if(!chunk || chunk.mounted) return

        const start_index = chunkIndex * this.chunkSize;
        const end_index = Math.min(start_index + this.chunkSize, this.items.length)

        let html = ''
        for(let i= start_index; i< end_index; i++) {
            html+=`
                <div class='virtual-list-item' style="height: ${this.itemHeight}px;">
                    ${this.renderItem(this.items[i],i)}
                </div>
            `
        }

        chunk.element.innerHTML = html;
        chunk.mounted = true
    }

    unmountChunk(chunkIndex) {
        const chunk = this.chunks.get(chunkIndex)
        if(!chunk || !chunk.mounted) return

        chunk.element.innerHTML = '';
        chunk.mounted = false
    }
}
// Generate 10,000 items
const items = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

 
// Initialize virtual list
const virtualList = new VirtualList(
  document.getElementById("list-container"),
  {
    items,
    itemHeight: 60,
    buffer: 10,
    chunkSize: 30,
    renderItem: (item, index) => `
    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;height: 100%; padding: 0 10px;">
      <strong>${item.name}</strong>
      <span style="color: #666;">${item.description}</span>
    </div>
  `,
  }
);

// setTimeout(() => {
//   virtualList.scrollToIndex(555);
// }, 2000);

/*
IntersectionObserver – Quick Notes (Virtualization Context)
✅ What is IntersectionObserver?

A browser API that:

Detects when a target element enters or leaves a viewport (or custom container).

It works asynchronously and is optimized by the browser.

🧠 Core Options
new IntersectionObserver(callback, {
  root,
  rootMargin,
  threshold
})
1️⃣ root

Defines which element acts as the viewport.

null → browser window.

Custom element → that element must have overflow: auto/scroll.

Example:

root: container

Means:

Detect visibility inside this scrollable container.

2️⃣ rootMargin

Expands or shrinks the root's bounding box.

Syntax: "top right bottom left"

Example:

rootMargin: "200px 0px"

Means:

200px extra detection area above and below.

Used as a buffer for smooth rendering.

Effective viewport height becomes:

actual height + top margin + bottom margin
3️⃣ threshold

Defines how much of the target must be visible.

0 → 1px visible is enough.

1 → 100% must be visible.

Can be array: [0, 0.5, 1]

For virtualization:

threshold: 0

Best because large items may never be fully visible.

🔄 How It Works Internally

On scroll / resize:

Browser calculates rootRect

Applies rootMargin

Calculates targetRect

Checks rectangle overlap

If overlap crosses threshold → triggers callback

📦 Virtualization Use Case

Observe chunk placeholders.

When isIntersecting = true → mount items.

When false → unmount items.

Keep container height fixed.

Reduce DOM nodes for performance.

🚀 Why Use rootMargin in Virtualization?

Without it:

Items mount only when visible.

Causes flicker.

With buffer:

Items mount before entering viewport.

Smooth scrolling.

⚠️ Important Interview Insight

IntersectionObserver:

Good for lazy loading.

Good for medium-sized virtualization.

Not ideal for extremely large lists (scroll math is faster).

🧠 One-Line Mental Model

"Call me when this element overlaps my viewport."


*/