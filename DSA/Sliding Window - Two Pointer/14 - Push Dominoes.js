var pushDominoes = function(dominoes) {
    let n = dominoes.length
    let leftForce = new Array(n).fill(-1)
    let rightForce = new Array(n).fill(-1)
    let ans = new Array(n).fill('.')
    
    // check for left
    let currLeftForceIndex = null
    for(let i = n-1 ; i>=0 ;i--){
        if(dominoes[i] == 'L') {
            currLeftForceIndex = i
            leftForce[i] = i
        }else if(dominoes[i] == 'R') {
            currLeftForceIndex = null
        }else if(dominoes[i] == '.' && currLeftForceIndex!=null){
            leftForce[i] = currLeftForceIndex
        }
    }

    let currRightForceIndex = null
    for(let i=0; i<n; i++) {
        if(dominoes[i] == 'R') {
            currRightForceIndex = i
            rightForce[i] = i
        }else if(dominoes[i] == 'L') {
            currRightForceIndex = null
        }else if(dominoes[i] == '.' && currRightForceIndex!=null) {
            rightForce[i] = currRightForceIndex
        }
    }

    for(let i=0; i<n; i++) {
        if(dominoes[i] == '.') {
            let leftForceIndex = leftForce[i]
            let rightForceIndex = rightForce[i]
            let leftForceDist = leftForceIndex == -1 ? Infinity : Math.abs(leftForce[i]-i)
            let rightForceDist = rightForceIndex == -1 ? Infinity : Math.abs(rightForce[i]-i)
            if(leftForceDist == rightForceDist) {  //dominoes falling on it from both sides, it stays still due to the balance of the forces.
                ans[i] = '.'
            }
            else if(leftForceDist < rightForceDist) {
                ans[i] = 'L'
            }else if(leftForceDist > rightForceDist) {
                ans[i] = 'R'
            }
        }
        else{
            ans[i] = dominoes[i]
        }
    }

    return ans.join('')
};

let dominoes = ".L.R...LR..L.."
// dominoes = "RR.L"
console.log(pushDominoes(dominoes))