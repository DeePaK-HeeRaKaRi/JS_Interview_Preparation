class TicTacToe{
    constructor(ticTacToeContainer,rows,cols,startingPlayer){
        this.ticTacToeContainer = ticTacToeContainer;
        this.currentPlayer = startingPlayer
        this.rows = rows;
        this.cols = cols;
        this.counter = 0;
        this.createVisitedCellsArray();
        this.createCells();
        this.createResetButton();
    }

    createCells(){
        for(let i=0;i<this.rows;i++){
            const rowDiv = document.createElement('div')
            rowDiv.className = `row_cell row_${i}`
            rowDiv.id = `row_${i}`
            for(let j=0; j<this.cols ; j++) {
                const colDiv = document.createElement('div');
                colDiv.className = `column_cell col_${i}_${j}`;
                colDiv.id = `col_${i}_${j}`;
                colDiv.setAttribute('row_deepak',i)
                colDiv.setAttribute('col_deepak',j)
                rowDiv.appendChild(colDiv)
                // Here Iam attaching eventListeners to each cell so I dont want that, So Iam using Event Delegation.
                // colDiv.addEventListener("click",() => {
                //     this.onClickHandler(i,j)
                // })
            }
            this.ticTacToeContainer.appendChild(rowDiv)
        }
        // Attaching single event listener to the Parent
        this.ticTacToeContainer_ClickListener();
    }

    ticTacToeContainer_ClickListener() {
        this.ticTacToeContainer.addEventListener('click',(event) => {
            // here event.stopPropogation() is optional
            event.stopPropagation(); //It will not goes to its ancestor  elements (parent/grand-parent etc.)
            const clickedElement = event.target;
            console.log('--------clickedElement',clickedElement)
            console.log(clickedElement.tagName,clickedElement.className);
            if(clickedElement.tagName == 'DIV' && clickedElement.className.includes('column_cell')){
                const [i,j] = clickedElement.id.split('_').slice(1).map(i => Number(i));
                console.log('--------Id',i,j)
                console.log('clickedElement Data Row',clickedElement.getAttribute('row_deepak'),clickedElement.dataset)
                console.log('clickedElement Data Col',clickedElement.getAttribute('col_deepak'))
                this.onClickHandler(i,j)
            }
        })
    }

    createResetButton(){
        const resetButtonCOntainer = document.createElement('div');
        resetButtonCOntainer.className = 'resetButtonCOntainer';
        const resetButton = document.createElement('button');
        resetButton.className = 'resetbutton';
        resetButton.innerHTML = 'Reset';
        resetButton.type = 'button';
        resetButton.style.cursor = 'pointer'
        resetButtonCOntainer.appendChild(resetButton);
        this.ticTacToeContainer.appendChild(resetButtonCOntainer);
        resetButton.addEventListener('click',() => {
            this.resetHandler(); //reset Everything
        })
    }

    resetHandler() {
        this.counter = 0;
        this.currentPlayer = 'O';
        for(let i=0 ; i<this.rows; i++) {
            const currRow = this.ticTacToeContainer.children[i]
            for(let j=0; j < this.cols; j++) {
                if(currRow.children[j].innerHTML !== ''){
                    currRow.children[j].innerHTML = ''
                }
                if(currRow.children[j].style.pointerEvents == 'none') {
                    currRow.children[j].style.pointerEvents = ''
                }
                if(this.visitesCells[i][j] !== null) {
                    this.visitesCells[i][j] = null
                }
            }
        }
    }

    onClickHandler(i,j){
        const currentCell = document.getElementById(`col_${i}_${j}`)
        const isInnerTextPresent = currentCell.innerText
        console.log(currentCell , isInnerTextPresent)
        if(isInnerTextPresent){
            window.alert('Please select another cell');
            currentCell.style.pointerEvents = 'none';
        }else{
            currentCell.innerText = this.currentPlayer
            this.visitesCells[i][j] = this.currentPlayer
            this.changePlayer();
            this.counter += 1;
            if(this.counter >= (this.rows + this.cols) - 1) {
                const [isValid, playerName] = this.checkWinCase(i,j);
        
                if(isValid) {
                    setTimeout(() => {
                        alert(`${playerName} wons the match`)
                        return
                    },0)
                }
                else if(!isValid && this.counter >= (this.rows * this.cols)) {
                    setTimeout(() => {
                        alert(`Match draws`)
                        return
                    },0)
                }
            }
        }
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer == 'O' ? 'X' : 'O';
    }

    createVisitedCellsArray() {
        // Creating the DOM Data is heavy  operation so we are doing it once and storing in memory
        this.visitesCells = []
        for(let i=0; i<this.rows;i++){
            let temp = []
            for(let j=0; j<this.cols; j++){
                temp.push(null)
            }
            this.visitesCells.push(temp)
        }
    }

    checkWinCase(i,j) {
        const getCurrentPlayer = document.querySelector(`.col_${i}_${j}`)?.innerText;

         // Check row
         if(this.checkRow(i,j,getCurrentPlayer)){
            return [true,getCurrentPlayer]
        }
        // Check col
        else if(this.checkCol(i,j,getCurrentPlayer)){
            return [true,getCurrentPlayer]
        }
        // Check diagonal from left to right
        else if(this.checkLeftDiagonal(getCurrentPlayer)){
            return [true,getCurrentPlayer]
        }
        // check diagonal from right to left
        else if(this.checkRightDiagonal(getCurrentPlayer)){
            return [true,getCurrentPlayer]
        }
        else{
            return [false,'']
        }
    }

    checkCondition(i,j,currentPlayer) {
        console.log('Exeuted')
        if(!this.visitesCells[i][j]) {
            return false
        }else{
            if(this.visitesCells[i][j] !== currentPlayer) {
                return false
            }
        }
        return true
    }

    checkRow(currRow, currCol, currentPlayer) {
        for(let i=0; i<this.cols; i++) {
            if(!this.checkCondition(currRow,i,currentPlayer)) {
                return false
            }
        }
        return true
    }

    checkCol(currRow, currCol, currentPlayer) {
        for(let i=0; i<this.rows; i++) {
            if(!this.checkCondition(i,currCol,currentPlayer)) {
                return false
            }
        }
        return true
    }

    checkLeftDiagonal(currentPlayer) {
        for(let i=0; i<this.rows; i++) {
            // 0,0; 1,1; 2,2
            if(!this.checkCondition(i,i,currentPlayer)) {
                return false
            }
        }
        return true
    }

    checkRightDiagonal(currentPlayer) {
        let i = 0
        for(let j=this.cols-1; j>=0; j--) {
            // 0,2;  1,1; 2,0
            if(!this.checkCondition(i,j,currentPlayer)) {
                return false
            }
            i+=1;
        }
        return true
    }
}
const ticTacToeContainer = document.querySelector('.TicTacToe-Container')
const rows = 4
const cols = 4
// rows and cols should have same value
const startingPlayer = 'O'
new TicTacToe(ticTacToeContainer,rows,cols,startingPlayer)
