
var uniquePathsIII_bfs = function(grid) {
    let rows = grid.length
    let cols = grid[0].length

    let empty_squares = 0
    let starting_square
    let ending_square
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if(grid[i][j] == 0) {
                empty_squares += 1
            }
            else if(grid[i][j] == 1) {
                starting_square = [i,j]
            }
            else if(grid[i][j] == 2) {
                ending_square = [i,j]
            }
        }
    }

    let dir_x = [-1,0,1,0]
    let dir_y = [0,-1,0,1]
    let ans = 0

    let curr_visited = new Set()
    curr_visited.add(`${starting_square[0]},${starting_square[1]}`)

    let queue = [[starting_square[0], starting_square[1], 0, curr_visited]]
    console.log('--------empty_squares',empty_squares,ending_square)

    while(queue.length > 0 ) {
        let [curr_i, curr_j, curr_count, curr_vis] = queue.shift()
        // if(empty_squares == curr_count) {
        //     console.log(curr_i, curr_j, curr_count);
        // }
        // console.log(curr_i, curr_j, curr_count);
        // console.log(queue.shift());
        

        if(ending_square[0] == curr_i && ending_square[1] == curr_j) {
            if(curr_count === empty_squares + 1) { //+1 for ending square
                ans++
            }
            continue
        }

        for(let d=0;d<4; d++) {
            let curr_row = curr_i + dir_x[d]
            let curr_col = curr_j + dir_y[d]
            if(curr_row >=0 && curr_col>=0 

                && curr_row < rows && curr_col < cols && 
                !curr_vis.has(`${curr_row},${curr_col}`) 

                && (grid[curr_row][curr_col] == 0 || grid[curr_row][curr_col] == 2)) 

                {
                    let new_visited = new Set([...curr_vis,`${curr_row},${curr_col}`])
                    // curr_vis.add(`${curr_row},${curr_col}`)
                    queue.push([curr_row, curr_col, curr_count+1, new_visited])
                }
        }
    }

    return ans
};


var uniquePathsIII_dfs = function(grid) {
    let rows = grid.length
    let cols = grid[0].length

    let empty_squares = 0
    let starting_square
    let ending_square
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if(grid[i][j] == 0) {
                empty_squares += 1
            }
            else if(grid[i][j] == 1) {
                starting_square = [i,j]
            }
            else if(grid[i][j] == 2) {
                ending_square = [i,j]
            }
        }
    }

    let dir_x = [-1,0,1,0]
    let dir_y = [0,-1,0,1]
    let ans = 0

    function dfshelper(curr_i,curr_j,count) {

        if(ending_square[0] == curr_i && ending_square[1] == curr_j) {
            if(count == empty_squares+1) {
                ans++
            }
            return
        }

         // replace grid to -1 , so assuming that node has visited
        //  and when going back revert the -1 to 0

        let temp = grid[curr_i][curr_j]
        grid[curr_i][curr_j] = -1

        for(let d=0;d<4; d++) {
            let curr_row = curr_i + dir_x[d]
            let curr_col = curr_j + dir_y[d]
            if(curr_row >=0 && curr_col>=0 
                && curr_row < rows && curr_col < cols 
                && (grid[curr_row][curr_col] == 0 || grid[curr_row][curr_col] == 2)) 
                {
                    dfshelper(curr_row,curr_col,count+1)
                }
        }

        grid[curr_i][curr_j] = temp
        return
    }

    dfshelper(starting_square[0],starting_square[1],0)

    return ans
   
}
let grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
// grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
// console.log(uniquePathsIII_bfs(grid))

console.log(uniquePathsIII_dfs(grid))