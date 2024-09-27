function assignCookies(g,s) {
    let child = g.sort((a,b) => a - b); //Children
    let cookies = s.sort((a,b) => a - b); //Cookies
    let count = 0;
    let l = 0
    let r = 0;
    while(l<child.length && r<cookies.length) {
        if(cookies[r] >= child[l]) {
            l++
            r++
            count++
        }
        else{
            r++
        }
    }
    return count
}

let s = [4,2,1,2,1,3]
let g = [1,5,3,3,4]
console.log(assignCookies(g,s))