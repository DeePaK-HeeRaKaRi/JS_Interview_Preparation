class MemoryGame {
    constructor(size,container) {
        this.size = size
        this.parentContainer = container
        this.scoreElement = this.createScoreContainer()
        this.memoryGameContainer = null
        this.memoryGameItems = this.constructElements()
        this.createStartButton()
        this.currentScore = 0
        this.maxScore = 0
        this.currentClickedID = null
        this.currentElement = null

        this.timeOutId = null
        this.intervalId = null 

        this.totalEventCount = 10
        this.currentEventCount = 0
    }

    constructElements() {
        const memoryGameElements = document.createElement('div')
        memoryGameElements.classList.add('memory-game-elements-container')
        this.memoryGameContainer = memoryGameElements
        // memoryGameElements.id ='deepak'
        // memoryGameElements.className = 'deepak2'
        for(let i=0;i<this.size;i++) {
            const element = document.createElement('div')
            element.classList.add('memory-game-element')
            element.id = i
            element.addEventListener('click',(e) => this.clickHandler(e) )
            memoryGameElements.appendChild(element)

        }
        this.parentContainer.appendChild(memoryGameElements)
        return memoryGameElements
    }


    createScoreContainer() {
        const scoreContainer = document.createElement('div')
        scoreContainer.classList.add('score-container')

        const scoreElement = document.createElement('span')
        scoreElement.classList.add('score')
        scoreElement.innerHTML = 'Score - 0'
        scoreContainer.appendChild(scoreElement)

        const maxScoreElement = document.createElement('span')
        maxScoreElement.classList.add('max-score')
        maxScoreElement.innerHTML = 'Max Score - 0'
        scoreContainer.appendChild(maxScoreElement)

        this.parentContainer.appendChild(scoreContainer)

        return [scoreElement,maxScoreElement]
    }

    createStartButton() {
        const startButton = document.createElement('button')
        startButton.classList.add('start-button')
        startButton.innerHTML = 'Start'
        startButton.addEventListener('click',(e) => this.startHandler(e))
        this.parentContainer.appendChild(startButton)
    }
    clickHandler(e) {
        e.stopPropagation()
        this.currentEventCount++
        if(this.currentEventCount > this.totalEventCount) {
            this.resetGame()
            return
        }
        
        console.log('---------e',e,e.target.id)
        this.currentClickedID = e.target.id
        this.currentElement = e.target
    }

    
    startHandler(e) {
        e.stopPropagation()
        // Get some random Number
        // automatic CLick handlers on each game elements
        // And now you start click on each game element
        // Now check the random number has same as clicked element than change color to blue else red
        console.log('-----------score',this.scoreElement)
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random(0)*this.size)
            console.log(randomNumber,Number(this.currentClickedID),this.currentElement)
            if(this.currentClickedID!=null) {
                // Test by keeping some constant number in plce of random NUmber and check 
                if(randomNumber == Number(this.currentClickedID)) {

                    this.currentElement.style.backgroundColor = 'blue'

                    this.currentScore++
                    this.scoreElement[0].innerHTML = `Score - ${this.currentScore}`

                    this.maxScore = Math.max(this.maxScore,this.currentScore)
                    this.scoreElement[1].innerHTML = `Max Score - ${this.maxScore}`
                }
                else {
                    this.memoryGameContainer.classList.add('shake')

                    this.scoreElement[0].innerHTML = `Score - 0`
                    this.currentElement.style.backgroundColor = 'red'
                    this.currentScore = 0
                }

                if(this.timeOutId) {
                    clearTimeout(this.timeOutId)
                }
                
                this.timeOutId = setTimeout(() => {
                    this.currentElement.style.removeProperty('background-color');
                    this.memoryGameContainer.classList.remove('shake')
                    this.currentClickedID = null;
                    this.currentElement = null;
                },500)
            }
        },1500)

    }

    resetGame() {
        alert(`Your Game has completed & your max score is ${this.maxScore}`)
        this.currentScore = 0
        this.maxScore = 0
        this.currentClickedID = null
        this.currentElement = null
        this.scoreElement[0].innerHTML = `Score - 0`
        this.scoreElement[1].innerHTML = `Max Score - 0`
        if(this.timeOutId) {
            clearTimeout(this.timeOutId)
        }

        if(this.intervalId) {
            clearInterval(this.intervalId)
        }
    }
}


const parent_container = document.querySelector('.memory-game-container')
const memory_size = 6
const memory_game = new MemoryGame(memory_size,parent_container)