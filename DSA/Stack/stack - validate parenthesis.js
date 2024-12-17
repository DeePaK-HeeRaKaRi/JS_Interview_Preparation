function validParenthesis(str){
    let openBrackets = []
    let star = []
    for(let i = 0; i < str.length; i++){
        if(str[i] == '('){
            openBrackets.push(i)
        }
        else if(str[i] == '*'){
            star.push(i)
        }
        else{
            if(openBrackets.length > 0) {  //Give first priority > (**()
                openBrackets.pop()
            }
            else if(star.length > 0) {
                star.pop()
            }
            else {
                return false
            }
        }
    }

    // Check If it has any open brackets still
    while(openBrackets.length > 0) {
        if(star.length == 0) {
            return false
        }
        else if(openBrackets[openBrackets.length-1]<star[star.length-1]) {  // ((*)
            openBrackets.pop()
            star.pop()
        } 
        else{
            return false
        }  
    }

    return true    //Ignore if you have any elements in star arr>  assuming as emptystring
}

let s = '(**()'
console.log(validParenthesis(s))