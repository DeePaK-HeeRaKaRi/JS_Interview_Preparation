function celebrity(mat) {
    // your code here
    let n = mat.length
    let m = mat[0].length
    let celebrityList = new Array(n).fill(0)
    let non_celebrity_list = new Array(m).fill(0)

    for(let i=0;i<n;i++) {
        for(let j=0;j<m;j++) {
           
            if(i!=j && mat[i][j] == 1) {
                non_celebrity_list[i]+=1
                celebrityList[j]+=1
            }
        }
    }
    // console.log({celebrityList, non_celebrity_list})

    for(let i=0;i<n;i++) {
        if(celebrityList[i] == n-1 && non_celebrity_list[i] === 0) {
            return i
        }
    }
    return -1
}

function celebrity_optimal(mat) {
    let n = mat.length;
    let top = 0;
    let down = n - 1;  

    // Step 1: Find a potential celebrity
    while (top < down) {
        if (mat[top][down] === 1) {
            // If top knows down, top is not a celebrity
            top++;
        } else {
            // If down knows top, down is not a celebrity
            down--;
        }
    }

    let candidate = top;

    // Step 2: Verify if candidate is a celebrity
    for (let i = 0; i < n; i++) {
        if (i == candidate || (mat[candidate][i] === 0 && mat[i][candidate] === 1)) {
            continue
        }
        else {
            return -1; // Candidate is not a celebrity
        }
    }

    return candidate; // Found the celebrity
}
let mat = [[0,1,1,0],[0,0,0,0],[0,1,0,0],[1,1,0,0]]
console.log(celebrity(mat))