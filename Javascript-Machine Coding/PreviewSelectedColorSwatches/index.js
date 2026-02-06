class PreviewColors {
    constructor(parent_container,colors) {
        this.parent_container = parent_container
        this.colors= colors
        this.display_area = null
        this.createPreviewArea()
        this.createColorSwatches()
    }

    createPreviewArea(){
        const display_area = document.createElement('div')
        display_area.classList.add('display-area')
        display_area.id = 'test'
        this.display_area = display_area
        this.parent_container.appendChild(display_area)
    }

    createColorSwatches() {
        const color_swatches = document.createElement('div')
        color_swatches.classList.add('color-swatches')
        const fragment = document.createDocumentFragment()
        for(let color of this.colors) {
            const color_box = document.createElement('div')
            color_box.classList.add(`color-box`, color)
            color_box.style.backgroundColor = color
            fragment.appendChild(color_box)
        }
        color_swatches.appendChild(fragment)
        // color_swatches.addEventListener('click',(e) => this.clickHandler(e))

        color_swatches.addEventListener('click',this.sampler((e) => this.clickHandler(e),4))
        
        this.parent_container.appendChild(color_swatches)
    }

    clickHandler(e) {
        e.stopPropagation()
        const {target} = e
        if(target.classList.contains('color-box')) {
            /*
            const compStyle = getComputedStyle(target)
            const bgColor = compStyle['background-color']
            this.display_area.style.backgroundColor = bgColor
            */
            this.display_area.style.backgroundColor = target.style.backgroundColor
        }
    }

    sampler(fn,count) {
        let counter = 0
        return function(...args) {
            let context = this
            counter ++
            if(count == counter) {
                fn.apply(context,args)
                counter = 0
            }
        }
    }
}

const parent_container = document.querySelector('.container')
const colors = ['red','blue','green','purple','pink','yellow','white']
new PreviewColors(parent_container,colors)