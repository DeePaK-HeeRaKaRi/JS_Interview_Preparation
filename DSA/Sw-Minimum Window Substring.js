var minWindow = function(str, target) {
    if(str.length < target.length) return ''
    let hm_str = new Map()
    let hm_target = new Map()
    let match_count = 0
    let l = 0
    let r = 0
    let prev = Infinity
    let curr = Infinity
    let ans =''
    for(let i of target) {
        if(hm_target.has(i)) {
            hm_target.set(i,hm_target.get(i)+1);
        }
        else{
            hm_target.set(i,1)
        }
    }
    // console.log(target_length)
    // console.log(hm_target.get('A'),target_length)
    while (r < str.length) {
        if(hm_str.has(str[r])) {
            hm_str.set(str[r], hm_str.get(str[r]) + 1)
        }
        else {
            hm_str.set(str[r], 1)
        }

        if(hm_target.has(str[r]) && hm_str.get(str[r]) <= hm_target.get(str[r])) {
            match_count += 1
        }
        // console.log(match_count,target_length)

        while(match_count >= target.length) {
            if(hm_target.has(str[l]) && hm_str.get(str[l]) <= hm_target.get(str[l])) {
                match_count -= 1
            }
            curr = Math.min(curr,r-l+1)
            if(curr < prev) {
                // console.log(str.substring(1,r-l+1))
                ans = str.substring(l, r + 1)
            }
            prev = curr
            hm_str.set(str[l],hm_str.get(str[l])-1)
            if(hm_str.get(str[l]) == 0) {
                delete hm_str.get(str[l])
            }
            l += 1

        }
        r += 1
    }

    return ans
};

let s = "ADOBECODEBANC"
let t = "ABC"
s = 'A'
t ='AA'
console.log(minWindow(s,t))