var minAddToMakeValid = function(s) {
    let open = 0
    let close = 0
    for(let i of s) {
        if( i == '(') {
            open++
        }
        else {
            if(open > 0) {  // so you have open braces before
                open--
            }
            else {
                close++
            }
        }
    }

    return open+close  //(((
};

let s = "((("
s= '()))'
console.log(minAddToMakeValid(s))