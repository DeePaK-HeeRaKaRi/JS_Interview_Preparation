function letterCombination(ind,digits,str,phoneNo) {
    if(str.length == digits.length) {
        // console.log(str)
        result.push(str)
        return
    }
    let value = phoneNo[digits[ind]]
    for(let i of value) {
        str+=i
        console.log('------str',str,i)
        letterCombination(ind+1,digits,str,phoneNo)
        str=str.slice(0,-1)
    }
}

let digits="234"
digits.split('')
let str=""
let result = []
let phoneNo = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
letterCombination(0,digits,str,phoneNo)
console.log(result)
