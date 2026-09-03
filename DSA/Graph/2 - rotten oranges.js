/**
 * @param {number[][]} grid
 * @return {number}
 */
class Queue1 {
    constructor() {
        this.elements = {}
        this.head = 0
        this.tail = 0
    }

    enqueue(val) {
        this.elements[this.tail] = val
        this.tail++
    }

    dequeue() {
        if(this.size() == 0) return null
        const first_element = this.elements[this.head]
        delete this.elements[this.head]
        this.head++
        return first_element
    }

    size() {
        return this.tail - this.head
    }
}
var orangesRotting = function(grid) {
    let row_len = grid.length
    let col_len = grid[0].length
    let x_dir = [1,0,-1,0]
    let y_dir = [0,1,0,-1]

    let non_empty_cells = 0
    let queue = new Queue1()
    for(let i = 0; i<row_len; i++) {
        for(let j = 0; j< col_len; j++) {
            if(grid[i][j] != 0) {
                non_empty_cells++
            }

            if(grid[i][j] == 2) {
                queue.enqueue([i,j])
            }
        }
    }

    let count_cells = 0
    let minutes = 0
    let row
    let col
    while(queue.size() > 0) {
        let curr_queue_size = queue.size()
        count_cells += curr_queue_size
        let flag = false
        for(let i=0; i<curr_queue_size; i++) {
            const [curr_row,curr_col] = queue.dequeue()
            for(let d = 0;d<4;d++) {
                const row = curr_row + x_dir[d]
                const col = curr_col + y_dir[d]
                if(row >=0 && row < row_len && col >=0 && col < col_len && grid[row][col] == 1) {
                    grid[row][col] = 2 // mark it as visited
                    flag = true
                    queue.enqueue([row,col])
                }
            }
        }
        if(flag) {
            minutes++
        }
    }
     
    return count_cells == non_empty_cells ? minutes : -1

};
// TC - O(m × n × 4), SC - m*n