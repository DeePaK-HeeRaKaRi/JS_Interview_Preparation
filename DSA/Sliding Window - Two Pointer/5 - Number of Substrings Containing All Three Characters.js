var numberOfSubstrings = function(s) {
    let n = s.length;
    let hm = {}
    let ans = 0
    let r = 0
    let l=0
    while(r<n){
        if(s[r] in hm) {
            hm[s[r]] += 1
        }else {
            hm[s[r]] = 1
        }
        if(Object.keys(hm).length==3) {
            ans += n-r
            hm[s[l]] -= 1
            if(hm[s[l]] == 0) {
                delete hm[s[l]]
            }
            l+=1
        }
        r+=1
    }
    return ans
};


var numberOfSubstrings2 = (s) => {
    let n = s.length;
    let a= -1
    let b = -1
    let c = -1
    let r = 0
    let ans = 0
    while(r< n ) {
        if(s[r] == 'a') {
            a = r
        }
        else if(s[r] == 'b') {
            b=r
        }
        else {
            c = r
        }

        if(a!=-1 && b!=-1 && c!=-1) {  //aaabc, abcabc
            ans += 1 + Math.min(a,b,c)
        }
        r++
    }
    return ans
}
let s='aaacb'
console.log(numberOfSubstrings(s))