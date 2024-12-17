var groupAnagrams = function(strs) {
    let hm = {}
    for(let i of strs){
        let charArray = i.split('')
        let sortedStr = charArray.sort().join('')
        if(hm.hasOwnProperty(sortedStr)) {
            hm[sortedStr].push(i)
        }else{
            hm[sortedStr] = [i]
        }
    }
    // console.log(Object.values(hm))
    return Object.values(hm)
};

let strs = ["eat","tea","tan","ate","nat","bat"]
strs = ["",'']
console.log(groupAnagrams(strs))