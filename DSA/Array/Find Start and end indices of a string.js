//https://dev.to/dhilipkmr/software-engineer-2-ui-interview-at-microsoft-1i0b

function getRepeated(s) {
    let n = s.length
    let ans = []
    let prev = 0
    for(let i=1;i<s.length;i++) {
        // console.log({prev,i})
        if(s[i] == s[prev]) {
            continue
        }else {
            if(s[prev] != s[i] && s[prev] == s[i-1] && prev != i-1){
                // console.log([prev,i-1])
                ans.push([prev,i])
            }
            prev = i
        }
    }
     

    if(s[prev] == s[n-1] && prev != n-1){
        // console.log([prev,i-1])
        ans.push([prev,n-1])
    }
    return ans
}

const input ='hellooooloo';
const op = getRepeated(input);
console.log(op) // [(2,3), (4,7), (9,10)]
