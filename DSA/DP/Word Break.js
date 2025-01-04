var wordBreak = function(s, wordDict) {
    let hm = new Map()
    for(let i of wordDict) {
        hm.set(i, true)
    }

    let currWord = ''
    let count = 0
    for(let i of s) {
        currWord+=i
        if(hm.has(currWord)) {
            count += 1
            // console.log({currWord, count})
            currWord = ''
        }
    }
    // console.log({currWord, count})
    if(currWord =='' && count>=1) {
        return true
    }
    return false
};

let  s = "applepenapple"
let wordDict = ["apple","pen"]

console.log(wordBreak(s,wordDict))