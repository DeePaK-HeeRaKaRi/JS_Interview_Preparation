var longestKSubstr=(s, k) => {
    //code here
    // Same as fruit into the baskets, but here k has given
    let hm = {}
    let l = 0
    let r = 0
    let maxi = -1
    while(r<s.length) {
        if(hm.hasOwnProperty(s[r])){
            hm[s[r]]+=1
        }
        else{
            hm[s[r]] = 1
        }
        if(Object.keys(hm).length > k) {  //If while ( o(n) + o(n))
            hm[s[l]]--
            if(hm[s[l]] == 0){
                delete hm[s[l]]
            }
            l++
        }
        if(Object.keys(hm).length == k) {  // If it is atmostK <=k and if exactly k unique characters == k
            maxi = Math.max(maxi,r-l+1)
        }
        r++
    }
    return maxi
}


let  s = "aabacbebebe"
let k = 3
s= 'aabacbebebe'
k=5
console.log(longestKSubstr(s,k))