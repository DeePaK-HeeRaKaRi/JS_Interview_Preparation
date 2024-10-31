function getRow(row) {
    let currCol = 1
    let currRow = [currCol]
    for(let i=1;i<row;i++) {
        currCol = currCol * (row-i)
        currCol = Math.floor(currCol / i)
        currRow.push(currCol)
    }
    return currRow
}

function generate_pascal_triangle(numRows) {
    let triangle = []
    for(let i=1; i<=numRows;i++) {
        triangle.push(getRow(i))
    }
    return triangle
}

// TC = o(n**2)
let n=5
console.log(generate_pascal_triangle(n))