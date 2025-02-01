function isSubsequence(s,t) {
    if(s.length == 0) return true

    if(t.length < s.length) return false
    let i=0
    let j=0
    let cnt = 0
    while(i<s.length && j<t.length) {
        if(s[i] == t[j]) {
            cnt+=1
            if(cnt == s.length){
                return true
            }

            i++
        }
        j++
    }
    return false
}


let s = "abc"
let t = "ahbgdc"
s = "axc", t = "ahbgdc"
s=""
t="gfgfhjdgh"
console.log(isSubsequence(s,t))