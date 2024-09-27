var floodFill = function(image, sr, sc, color) {
    let x_dir = [1,0,-1,0]
    let y_dir = [0,1,0,-1]
    let queue = [[sr,sc]]
    let r,c
    let currColor = image[sr][sc]
    image[sr][sc] = color
    while(queue.length > 0) {
        console.log(queue)
        let [currX,currY] = queue.shift()
        for(let d=0;d<4;d++) {
            r = currX + x_dir[d]
            c = currY + y_dir[d]
            if(r>=0 && r<image.length && c>=0 && c<image[0].length && image[r][c] == currColor && image[r][c] != color) {
                image[r][c] = color
                queue.push([r,c])
            }
        }
    }
    return image
};
let image = [[1,1,1],[1,1,0],[1,0,1]]
let sr = 1
let sc = 1
let color = 2

image = [[0,0,0],[0,0,0],[0,0,0]]
sr = 0
sc = 0
color = 0
console.log(floodFill(image,sr,sc,color))