var letterCombinations = function(digits) {
    if(!digits) return []
    let str=""
    let result = []
    let phoneNo = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    function dfs(index,str) {
        if(str.length == digits.length) {
            result.push(str)
            return
        }
        let value = phoneNo[digits[index]]
        for(let val of value) {
            str += val
            dfs(index+1,str)
            str = str.slice(0, -1);
        }
    }

    dfs(0,str)
    return result
};

let digits="234"
console.log(letterCombinations(digits))