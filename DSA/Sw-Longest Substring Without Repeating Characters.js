var lengthOfLongestSubstring = function(s) {
    let hm = {}
    let l = 0
    let r = 0
    let maxi = 0
    while(r<s.length){
        if(s[r] in hm){
            l=Math.max(l,hm[s[r]]+1)
        }
        hm[s[r]]=r
        maxi=Math.max(maxi,r-l+1)
        r+=1
    }
    console.log(s[1])
    return maxi
};
s = "pwwkew"
console.log(lengthOfLongestSubstring(s))