
function numIslands(grid) {
    let row_Dir = [-1,-1,0,1,1,1,0,-1];
    let col_Dir = [0,-1,-1,-1,0,1,1,1];
    let cnt = 0;
    let n = grid.length;
    let m = grid[0].length;
    let visited = new Set();
    let queue = [];
    let head = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] == 1 && !visited.has(`${i},${j}`)) {
                cnt++;
                queue.push([i, j]);
                visited.add(`${i},${j}`);

                while (head < queue.length) {
                    let [currRow, currCol] = queue[head++];

                    for (let dir = 0; dir < 8; dir++) {
                        let dRow = row_Dir[dir] + currRow;
                        let dCol = col_Dir[dir] + currCol;

                        if (
                            dRow >= 0 && dRow < n &&
                            dCol >= 0 && dCol < m &&
                            grid[dRow][dCol] == 1 &&
                            !visited.has(`${dRow},${dCol}`)
                        ) {
                            queue.push([dRow, dCol]);
                            visited.add(`${dRow},${dCol}`);
                        }
                    }
                }
            }
        }
    }

    return cnt;
}


// Example usage:
let grid = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1]
];

console.log(numIslands(grid)); // Output: 3
