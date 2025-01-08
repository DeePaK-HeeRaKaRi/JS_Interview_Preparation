// https://saideepesh.hashnode.dev/frontend-engineer-interview-experience-at-zestmoney

class GenerateCircles {
    constructor(count,circleContainer) {
        this.count = count
        this.circleContainer  = circleContainer
        this.buildCircles(0,this.circleContainer)
    }

    getRandomColor() {
        const randomColor = () => Math.floor(Math.random()*255) //MAx upto 255 rgb
        return `rgb(${randomColor()},${randomColor()},${randomColor()})`
    }

    buildCircles(count,parentElement) {
        console.log({count, parentElement})
        if(count == this.count) return
        const createElement = document.createElement('div')
        createElement.className = `circle circle-${count}`
        createElement.style.border = `2px solid ${this.getRandomColor()}`
        parentElement.appendChild(createElement)
       this.buildCircles(count+1,createElement)
    }
}

const circleContainer = document.querySelector('.circle-container')
const circles = 10
const getCircle = new GenerateCircles(circles, circleContainer)
