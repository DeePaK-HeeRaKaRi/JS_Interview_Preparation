function cherryPick(grid) {
    let row = grid.length
    let col = grid[0].length
    let dp = Array.from({length : row}, 
        () => Array.from({length : col}, () => Array(col).fill(-1)))

    function memo(i,j1,j2) {

        if(j1<0 || j2<0 || j1>=col || j2>=col){ 
            return -Infinity
        }
        if(i == row - 1) {
            if(j1 == j2) { //alice and bob in the same cell
                return grid[i][j1]
            }
            else { //alice and bob in different cells
                return grid[i][j1] + grid[i][j2]
            }
        }

        if(dp[i][j1][j2] != -1) return dp[i][j1][j2]
        //  if alice goes down or left or right  than bob can have a chance to go to down, left, right. So 9 ways
        // i+1,j+1[right] i+1,j[down], i+1,j-1[left]
        let maxi = 0
        for(let dj1= -1; dj1<=1 ;dj1++) { //Alice
            for(let dj2 = -1; dj2 <= 1; dj2++) { //Bob
                let value = 0
                if(j1 == j2) {
                    value = grid[i][j1]
                }else {
                    value = grid[i][j1] + grid[i][j2]
                }
                value += memo(i+1,j1+dj1,j2+dj2)
                maxi = Math.max(maxi, value)
            }
        }

        dp[i][j1][j2] = maxi

        return maxi

    }


    function Tab() {
        for(let j1=0;j1<col;j1++) {
            for(j2=0; j2< col; j2++) {
                if(j1 == j2) {
                    dp[row-1][j1][j2] = grid[row-1][j1]
                }else {
                    dp[row-1][j1][j2] = grid[row-1][j1] + grid[row-1][j2]
                }
            }
        }

        for(let i=row-2;i>=0;i--) {
            for(let j1=col-1;j1>=0;j1--) {
                for(let j2=0;j2<col;j2++) {
                    let maxi = 0
                    for(let dj1= -1; dj1<=1 ;dj1++) { //Alice
                        for(let dj2 = -1; dj2 <= 1; dj2++) { //Bob
                            let value = 0
                            if(j1 == j2) {
                                value = grid[i][j1]
                            }else {
                                value = grid[i][j1] + grid[i][j2]
                            }
                            value += (j1+dj1 <0 || j1+dj1 >=col || j2+dj2<0 || j2+dj2>=col)? -Infinity
                                : dp[i+1][j1+dj1][j2+dj2]
                            maxi = Math.max(maxi, value)
                        }
                    }
                    dp[i][j1][j2] = maxi
                }
            }
        }
        return dp[0][0][col-1]
    }
    // return memo(0,0,col-1)
    return Tab()
}

let grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
console.log(cherryPick(grid))