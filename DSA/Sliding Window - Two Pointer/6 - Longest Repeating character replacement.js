var characterReplacement = function(s, k) {
    let hm = {}
    let l= 0
    let r= 0
    let n= s.length
    let maxCharacters = -1
    let ans = 0
    while(r < n) {
        if(hm.hasOwnProperty(s[r])) {
            hm[s[r]]+=1
        }
        else {
            hm[s[r]] = 1
        }

        maxCharacters = Math.max(maxCharacters,hm[s[r]])
        let curr_len = r-l+1

        if((curr_len - maxCharacters) > k) {
            hm[s[l]]-=1
            if(hm[s[l]] == 0) delete hm[s[l]]
            l+=1
        }
        console.log({curr_len,maxCharacters,hm})
        if((curr_len - maxCharacters) <= k) {  //This is optional
            ans = Math.max(ans,r-l+1)
        }   
        
        r++
    }
    return ans
};

let s= 'aacdeaee'
let k=2
s = "AABABBA", k = 1
console.log(characterReplacement(s,k))