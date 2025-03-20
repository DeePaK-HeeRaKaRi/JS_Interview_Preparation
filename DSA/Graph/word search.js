
function bfs(board,i,j,word) {
    let row_len = board.length
    let col_len = board[0].length

    let visited = new Set()
    let queue = [[i,j,0]]
    visited.add(`${i}_${j}`)
    let index = 0
    let dx = [-1,0,1,0]
    let dy = [0,-1,0,1]
    while(index < queue.length) {
        let [x,y,count] = queue[index++]
        if(count === word.length - 1) return true

        for(let d=0;d<4;d++) {
            let curr_row = x + dx[d]
            let curr_col = y + dy[d]
            if(curr_row >=0 && curr_col>=0 && curr_row < row_len && curr_col < col_len 
                && !visited.has(`${curr_row}_${curr_col}`) && board[curr_row][curr_col] == word[count+1]) {
                    queue.push([curr_row,curr_col,count+1])
                    visited.add(`${curr_row}_${curr_col}`)
                }
        }
    }
    return false
}


var exist = function(board, word) {

    let n = board.length
    let m = board[0].length
    let dx = [-1,0,1,0]
    let dy = [0,-1,0,1]

    function dfs(i,j,word,index) {
        if(index == word.length) return true

        if(i<0 || j<0 || i>=n || j>=m || board[i][j] != word[index] || board[i][j] == '#') return false

        let temp = board[i][j]

        board[i][j] = '#'
        for(let d=0;d<4; d++) {
            let curr_row = i + dx[d]
            let curr_col = j + dy[d]
            if(dfs(curr_row,curr_col,word,index+1)){
                return true
            }
        }
        board[i][j] = temp
        return false
    }


    for(let i=0;i<n;i++) {
        for(let j=0;j<m;j++) {
            // if(board[i][j] === word[0] && bfs(board, i, j, word)) {
            //     return true
            // }
            if(board[i][j] === word[0] && dfs(i, j, word,0)) {
                return true
            }
        }
    }
    return false
};

let board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
let word = "ABCCED"
 board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
 word = "ABCB"

 board =[["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]]  // This case will fail if you use bfs
 word = "ABCESEEEFS"
console.log(exist(board, word)) //true