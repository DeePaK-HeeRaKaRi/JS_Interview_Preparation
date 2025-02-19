function rottenOranges(grid) {
    let row_len = grid.length
    let col_len = grid[0].length
    let x_dir = [1,0,-1,0]
    let y_dir = [0,1,0,-1]

    let count_non_empty_cells = 0
    let queue = []
    for(let i= 0 ;i< row_len;i++) {
        for(let j=0;j<col_len;j++) {
            if(grid[i][j] !=0) {
                count_non_empty_cells += 1
            }

            if(grid[i][j] == 2) {
                queue.push([i,j])
            }
        }
    }

    let curr_level_size = 0
    let row,col
    let count_cells = 0
    let head = 0

    let minutes = 0
    while(head < queue.length) {
        curr_level_size = queue.length-head
        count_cells += curr_level_size
        let flag = false
        for(let i=0;i<curr_level_size;i++) {
            let [curr_row,curr_col] = queue[head++]
            for(let d=0;d<4;d++) {
                row = curr_row + x_dir[d]
                col = curr_col + y_dir[d]
                if(row >=0 && row < row_len && col >=0 && col < col_len && grid[row][col] == 1) {
                    grid[row][col] = 2
                    flag = true
                    queue.push([row,col])
                }
            }
        }

        if(flag) {
            minutes++
        }
    }

    return count_cells == count_non_empty_cells ? minutes : -1

}

let grid = [[2,1,1],[1,1,0],[0,1,1]]

console.log(rottenOranges(grid))