var scoreOfParentheses = function(s) {
    let st = []
    let score = 0
    for (let i = 0; i < s.length; i++) {
        if(s[i] == '(') {
            st.push('(')
        }
        else {
            if(s[i] == ')' && st[st.length-1] == '(') {
                st.pop()
                st.push(1)
            }
            else{ 
                score = 0
                while(st.length>0 && st[st.length-1] != '(') {
                    score += st.pop()
                }
                st.pop()
                score = 2*score
                st.push(score)
            }
        }
    }
    
    score = 0
    while(st.length > 0) {
        score+=st.pop()
    }
    return score
};

let s = '((()))'
// s='((()()))'
// s="(((())()))"
s="()()"
// s= "(()(()))"
s="(()(()))"
s="()(())"
console.log(scoreOfParentheses(s))

/*
Rules

() => 1

()() => 2

(A) => 2*1

(()) =>2*1

((())) => 1* 2 * 2


*/