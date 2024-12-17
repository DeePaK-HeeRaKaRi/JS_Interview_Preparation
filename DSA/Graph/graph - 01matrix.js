/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
    let x_dir = [1,0,-1,0]
    let y_dir = [0,1,0,-1]
    let visited = new Set()
    let dist = []
    let queue = []
    for(let i=0;i<mat.length;i++) {
        let di = []
        for(let j=0;j<mat[0].length;j++) {
            di.push(0)
            if(mat[i][j] == 0) {
                queue.push([i,j,0])
                visited.add(`${i},${j}`)
            }
        }
        console.log(di)
        dist.push(di)
    }
    console.log(dist)
    let r,c
    while(queue.length > 0) {
        let [curr_x,curr_y,count] = queue.shift()
        dist[curr_x][curr_y] = count
        for(let d=0;d<4;d++) {
            r = curr_x + x_dir[d]
            c = curr_y + y_dir[d]
            if(r>=0 && r<mat.length && c>=0 && c<mat[0].length && !visited.has(`${r},${c}`)) {
                 queue.push([r,c,count+1])
                 visited.add(`${r},${c}`)
            }
        }
    }
    return dist
};

let mat = [[0,0,0],[0,1,0],[1,1,1]]
console.log(updateMatrix(mat))