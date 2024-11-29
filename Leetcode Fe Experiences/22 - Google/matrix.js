
class buildMatrix {
    constructor(row,col,matrix_container) {
        this.row = row;
        this.col = col;
        this.matrix_container = matrix_container
        this.count = 1
        this.createMatrix()
    }

    createMatrix() {
        // Create Rows
        const matrix_rows = this.createRows()

        // create Cells
        console.log('-matrix rows',matrix_rows)

        const matrix_cols = this.createCols(matrix_rows)
        
        // this.constructMatrix()

        this.constructMatrix_1()

    }

    createRows() {
        for(let i=0;i < this.row;i++) {
            const div = document.createElement('div')
            div.className = `row row_${i}`
            this.matrix_container.appendChild(div)
        }
        return this.matrix_container.children
    }

    createCols(matrix_rows) {
        for(let i=0; i<this.row; i++) {
            for(let j=0; j<this.col; j++) {
                const cell = document.createElement('div')
                if(i%2 == 0) {
                    cell.className = `even_col col col_${i}_${j}`
                }
                else{
                    cell.className = `odd_col col col_${i}_${j}`
                }
                
                matrix_rows[i].appendChild(cell)
            }
        }
    }

    constructMatrix() {
        for(let i=0;i<this.row; i++) {
            if(i%2 == 0) {
                // start form first row
                for(let j=0; j<this.col; j++) {
                    const curr_col_className = document.querySelector(`.col_${i}_${j}`)
                    curr_col_className.textContent = this.count
                    this.count ++
                }
            }
            else{
                // Start from last row
                for(let j=this.col - 1; j>=0 ; j--) {
                    const curr_col_className = document.querySelector(`.col_${j}_${i}`)
                    curr_col_className.textContent = this.count
                    this.count++
                }
            }
        }
    }


    constructMatrix_1() {
        // for(let j=0;j<this.col; j++) {
        //     if(j%2 == 0) {
        //         // start form first col
        //         for(let i=0; i<this.row; i++) {
        //             const curr_col_className = document.querySelector(`.col_${i}_${j}`)
        //             curr_col_className.textContent = this.count
        //             curr_col_className.addEventListener('click',(e) => alert(`you clicked on ${curr_col_className.textContent}`))
        //             this.count++
        //         }
        //     }
        //     else{
        //         // Start from last col
        //         for(let i=this.row - 1; i>=0 ; i--) {
        //             const curr_col_className = document.querySelector(`.col_${i}_${j}`)
        //             curr_col_className.textContent = this.count
        //             curr_col_className.addEventListener('click',(e) => alert(`you clicked on ${curr_col_className.textContent}`))
        //             this.count++
        //         }
        //     }
        // }

        const fillMatrix = (isRowBased) => {
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.col; j++) {
                    const targetRow = isRowBased ? i : j;
                    const targetCol = isRowBased ? j : i;
                    const curr_col_className = document.querySelector(`.col_${targetRow}_${targetCol}`);
                    curr_col_className.textContent = this.count;
                    this.count++;

                    if (isRowBased) {
                        curr_col_className.addEventListener('click', () => {
                            alert(`You clicked on ${curr_col_className.textContent}`);
                        });
                    }
                }
            }   
        }

        // Determine which fill direction to use based on row or column direction.
        fillMatrix(true); // Start filling by row
    }
}

const matrix_container =document.querySelector('.matrix_container')
document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(event.target); // event.target is the form
    console.log('-formData', formData.entries()); // Debugging
    let formValues = {}
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
        formValues[key] = value
    }

    // const formValues = Object.fromEntries(formData.entries());
    const {row,col} = formValues
    const constructMatrix = new buildMatrix(row, col, matrix_container)
});
