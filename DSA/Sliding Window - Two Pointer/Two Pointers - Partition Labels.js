var partitionLabels = function(s) {
    let hm = {}
    for(let i in s) {
        hm[s[i]] = parseInt(i)
    }
    let l = 0
    let r = 0
    let ans = []
    let curMax = 0
    while(r < s.length) {
        curMax = Math.max(curMax, hm[s[r]])
        if(r == curMax) {
            ans.push(r - l + 1)
            l = r + 1
        }
        r++
    }
    return ans
};

let s = "ababcbacadefegdehijhklij"
s = "eccbbbbdec"
console.log(partitionLabels(s))