// let s = 'a 01 9991'
// s= s.replaceAll(' ','')
// let input = ['*',')','(','a','p']
// console.log(input.includes(s))

// for(let i of s) {
//     console.log(i)
// }

// function tokenize(str) {
//     let tokens = str.replaceAll(' ','')
//     console.log(tokens)
//     const regex = /\d+|[+\*()-]/g
//     // console.log(regex.exec(tokens))
//     // console.log(regex.exec(tokens))
//     // console.log(regex.exec(tokens))
//     // console.log(regex.exec(tokens))
//     // console.log(regex.exec(tokens))
//     // console.log(regex.exec(tokens))
//     // console.log(regex.exec(tokens))
//     // console.log(regex.exec(tokens))
//     let ans = []
//     let numbers =['0','1','2','3','4','5','6','7','8','9']
//     let curr = ''
//     for(let i of tokens) {
//         if(numbers.includes(i)){
//             curr+=i
//         }else{
//             if(curr!=''){
//                 ans.push(curr)
//             }
//             curr = ''
//         }
//     }
//     console.log(ans)
// }

function* tokenize(str) {
    let tokens = str.replaceAll(' ','')
    let numbers =['0','1','2','3','4','5','6','7','8','9']
    // console.log(tokens)
    let curr =''
    for(let i of tokens) {
         if(numbers.includes(i)) {
            curr += i
        }else {
            if(curr!=''){
                yield curr
            }
            yield i
            curr = ''
        }
    }
    if(curr!=''){
        yield  curr
    }
}

const tokens = tokenize('1 * ((20 + 300) - 4) / ((100 / 6))')


while (true) {
  let token = tokens.next()
  if (token.done) {
    break
  }
  console.log(token.value)
}