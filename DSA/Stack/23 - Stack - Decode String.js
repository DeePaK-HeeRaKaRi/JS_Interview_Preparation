  


function uncompress(str) {
    let count_stack = []
    let str_stack = []
    let curr_str =''
    let number = 0
    for(let s of str) {
        if(!isNaN(s)) {
            // count_stack.push(Number(s))
            number = number*10 + Number(s)  // if number length is > 1 like 11 
        }else if(s=='(') {
            str_stack.push(curr_str)
            curr_str = ''
            if(number!=0) {
                count_stack.push(number)
                number = 0
            }
        }else if(s == ')') {
            if(count_stack.length > 0) {
                let repeatTime = count_stack.pop()
                console.log('------',str_stack)
                if(str_stack.length>0) {
                    let lastStr = str_stack.pop()
                    curr_str = lastStr + curr_str.repeat(repeatTime)
                }
                else {
                    curr_str = curr_str.repeat(repeatTime)
                }
            }
        }else {
            curr_str += s
        }
    }
    return curr_str
}

 
// console.log(uncompress('2(BFE1(dev))3(2(lover))')); // Output: "BFEdevBFEdevloverloverloverloverloverlover"
console.log(uncompress('1(BFE11(dev))'))

// console.log(uncompress('2(BFE1(dev))3(2(lover))')); // Output: "BFEdevBFEdevloverloverloverloverloverlover"

// console.log(uncompress('3(ab2(c))'))// 'abccabccabcc'
// console.log(uncompress('3(ab)')) // 'ababab'
// console.log(uncompress('2(cot3(pk2(df)))'))
// console.log(uncompress('2(BFE)3(dev).deepak'))
// console.log(uncompress('1(BFE11(dev)) '))
// console.log(uncompress('2(BFE1(dev))3(2(lover))'))
// console.log(uncompress('3(2(deepak))'))