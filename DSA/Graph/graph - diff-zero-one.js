var onesMinusZeros = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let onesRow = new Array(m).fill(0) 
    let onesCol = new Array(n).fill(0)
    let dist = []
    for(let i=0;i<m;i++) {
        let d = []
        for(let j=0;j<n;j++) {
            d.push(0)
            onesRow[i] += grid[i][j]
            onesCol[j] += grid[i][j]
        }
        dist.push(d)
    }
    
    let zerosRow
    let zerosCol
    for(let i = 0;i<m;i++) {
        for(let j = 0;j<n;j++) {
            zerosRow = m - onesRow[i]
            zerosCol = n - onesCol[j]
            dist[i][j] += onesRow[i] + onesCol[j] - zerosRow - zerosCol
        }
    }
    console.log(dist)
    return dist
};

let grid = [
    [0,1,1],
    [1,0,1],
    [0,0,1]]
console.log(onesMinusZeros(grid))