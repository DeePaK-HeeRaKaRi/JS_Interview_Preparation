var calculate = function(s) {
    // s = s.replace(/\s+/g, '');
    // console.log(s);  // Output: '3*2+5/2-10'

    // s = s.split(/[\+\-\*\/]/).map(i => Number(i.trim())) //split using + - * / and remove the spaces

    s=s.match(/(\d+|\+|\-|\*|\/)/g)
    console.log(s)
    let previous_operator = '+' //keep it by default
    let curr_number = 0
    let st = []
    for(let i=0;i<s.length;i++) {
        if(!isNaN(s[i])){
            curr_number = Number(s[i])
        }
        if(['+','-','*','/'].includes(s[i]) || i==s.length-1) {  //|| i==s.length-1 to handle the last case 
            if(previous_operator == '+') {
                st.push(curr_number)
            }
            else if(previous_operator == '-') {
                st.push(-curr_number)
            }
            else if(previous_operator == '*') {
                let top = st.pop() * curr_number
                st.push(top)    
            }
            else if(previous_operator == '/') {
                let top = Math.trunc(st.pop() / curr_number)
                st.push(top)
            }
            curr_number = 0
            previous_operator = s[i]
        }
        
    }
    // console.log(st)

    let res = 0
    while(st.length > 0) {
        res+=st.pop()
    }
    return res
};

let s = '3*2 + 5 / 2-10'
s="14-3/2"
console.log(calculate(s))

// [ 3, '*',2,'+', 5,'/', 2,'-', 10 ]