
    
//     // Count the total open and closing braces
//     let total_openBraces = 0
//     let total_closeBraces = 0
//     let flag = true
//     let startOpenIndex = null
//     let lastCloseIndex = null
//     for(let i in s) {
//         if(s[i]=='('){
//             total_openBraces++
//             if(flag){
//                 startOpenIndex = Number(i)
//                 flag = false
//             }
            
//         }
//         else if(s[i]==')') {
//             total_closeBraces++
//             lastCloseIndex = Number(i)
//         }
//     }
//     console.log({total_openBraces,total_closeBraces})
//     console.log({startOpenIndex,lastCloseIndex})
//     let minBracesToBalance = Math.min(total_openBraces,total_closeBraces)
//     // console.log({minBracesToBalance})
//     let curr_openBraces = 0
//     let curr_closeBraces = 0
//     let ans = ''
//     for(let i in s) {
//         const curr = s[i]
//         if(curr != '(' && curr!=')') {
//             ans = ans+curr
//         }
//         else{
//             // console.log('----',i)
//             if(curr=='(' && Number(i) <= lastCloseIndex &&curr_closeBraces <= curr_openBraces && curr_openBraces<minBracesToBalance) {
//                 ans = ans+curr
//                 curr_openBraces++
//             }
//             else if(curr==')' && startOpenIndex <= Number(i) && curr_openBraces > curr_closeBraces && curr_closeBraces<minBracesToBalance){
//                 ans = ans+curr
//                 curr_closeBraces++
//             }
//         }
//     }
//     return ans
// };
var minRemoveToMakeValid = function(s) {
    let st =[]
    // Store the indexes in the stack and compare the braces, if it is balanced remove from the stack
    // After that check if the st[0]==i if yes remove that from the st else, append the current element to answer
    for(let i=0;i<s.length;i++) {
        if(s[i] == '(') {
            st.push(i)
        }
        else if(s[i] ==')') {
            if(st.length>0 && s[st[st.length-1]] == '(') {
                st.pop()
            }else {
                st.push(i)
            }
            
        }
    }
    let ans = ''
    for(let i=0;i<s.length;i++) {
        if(st[0]==i){
            st.shift()  // Pop the lements from top
        }
        else{
            ans+=s[i]
        }
    }
    console.log(st,ans)
    return ans

}
let s = "lee(t(c)o)de)"
s = "a)b(c)d"
// s = "deep(((((ak)"
s="deep)()ak)))))"
// s=''
s="))(("
// s=")))t((u)"
console.log('---------',minRemoveToMakeValid(s))