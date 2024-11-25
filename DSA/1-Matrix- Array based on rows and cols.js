// https://www.frontendinterviewhandbook.com/companies/google-front-end-interview-questions

// this works only for same row and same cols
function printMatrix(rows,cols){
    let matrix = new Array(rows).fill(null).map(() => new Array(cols).fill(0));
    console.log(matrix)
    // let matrix = new Array(cols).fill(-1)
    let count  = 1
    for(let i=0;i<rows; i++) {
        if(i%2 == 0) {
            for(let j=0;j<cols;j++) {
                console.log({i,j})
                matrix[j][i] = count
                count++
            }
        }
        else{ 
            for(let j=cols-1;j>=0;j--) {
                console.log({i,j})
                matrix[j][i] = count
                count++
            }
        }
    }

    return matrix
}


// 1	8	9	16	17
// 2	7	10	15	18
// 3	6	11	14	19
// 4	5	12	13	20

// for diff rows and diff cols
function printMatrix_1(row,col) {
    let matrix = new Array(row).fill(0).map(() => new Array(col).fill(0))
    let count = 1
    for(let j=0;j<cols;j++) {
        if(j%2 == 0) {
            for(let i=0;i<row;i++) {
                matrix[i][j] = count++
            }
        }
        else{
            for(let i=row-1;i>=0;i--) {
                matrix[i][j] = count++
            }
        }
    }
    return matrix
}

let rows = 4
let cols = 5
// console.log(printMatrix(rows,cols))
console.log(printMatrix_1(rows,cols))

// [
//     [ 1, 8, 9, 16, 17 ],
//     [ 2, 7, 10, 15, 18 ],
//     [ 3, 6, 11, 14, 19 ],
//     [ 4, 5, 12, 13, 20 ]
// ]