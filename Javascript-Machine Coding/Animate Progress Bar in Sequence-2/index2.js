class ProgressBars {
    constructor(container,button) {
        this.container = container
        this.button = button
        this.count = 0
        this.queue = []
        this.isAnimating = false
        this.addEventListeners()
    }

    addEventListeners() {
        this.button.addEventListener('click', () => this.buildSyncProgressBar())

        // this.button.addEventListener('click', () =>  this.buildAsyncProgressBar())
    }

    buildAsyncProgressBar() {
        const outer = document.createElement('div')
        outer.classList.add('progress-bar-container',`progress-bar-container-${this.count++}`)

        const inner = document.createElement('div')
        inner.classList.add('progressBar',`progressBar-${this.count}`)

        this.queue.push(inner)

        outer.appendChild(inner)
        this.container.appendChild(outer)

        if(!this.isAnimating) {
            this.startAsyncProgressBars()
        }
    }

    startAsyncProgressBars() {

        if(this.queue.length == 0) {
            this.isAnimating = false
            return
        }

        this.isAnimating = true
        const inner = this.queue.shift()  // Here we can use indexed based queue

        inner.addEventListener('transitionend',(event) => {
            console.log(event)
            if(this.queue.length > 0) {
                this.startAsyncProgressBars()
            }
        },{once:true}) // removes the event listener

        requestAnimationFrame(() => inner.style.transform = 'translateX(0%)')
    }

    buildSyncProgressBar() {
        // Synchronous Progress bar
        const outer = document.createElement('div')
        outer.classList.add('progress-bar-container',`progress-bar-container-${this.count++}`)

        const inner = document.createElement('div')
        inner.classList.add('progressBar',`progressBar-${this.count}`)
        
        // outer.appendChild(inner)

        // this.container.appendChild(outer)
        
       

        const percentageText = document.createElement('span');
        percentageText.classList.add('progress-text');
        percentageText.innerText = '0%';

        outer.appendChild(inner);
        outer.appendChild(percentageText); // Place text above progress bar
        this.container.appendChild(outer);

         // let animationId = requestAnimationFrame(() => {
        //     inner.style.transform = 'translateX(0%)'; // Move from -100% to 0%
        // });

        this.animateProgressBar(inner, percentageText, 0);
        
    }


    animateProgressBar(inner, percentageText, progress) {
        if (progress > 100) return; // Stop when it reaches 100%

        inner.style.transform = `translateX(${progress - 100}%)`;
        percentageText.innerText = `${progress}%`;

        setTimeout(() => {
            requestAnimationFrame(() => this.animateProgressBar(inner, percentageText, progress + 1));
        }, 200); // Adjust speed of increment (30ms per step)
    }
}

const progressBarContainer = document.querySelector('.progressBarContainer')
const addBtn = document.querySelector('.addButton')

new ProgressBars(progressBarContainer, addBtn)

/*

requestAnimationFrame executes the callback right before the next repaint, 
ensuring smooth animations and efficient updates

requestAnimationFrame helps avoid unnecessary reflows 
and repaints by batching DOM updates before the next frame render. It ensures smooth animations and better performance.

*/

// In interview ask, requirement,
//  If stop start,resume is required than go with setInterval approach,
// if not go head with requestAnimation farme for queable progressbars