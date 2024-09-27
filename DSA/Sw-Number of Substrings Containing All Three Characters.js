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
        while(Object.keys(hm).length==3) {
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
let s='aaacb'
console.log(numberOfSubstrings(s))