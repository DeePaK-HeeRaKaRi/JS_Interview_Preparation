var calculate = function(str) {
    str=str.match(/(\d+|\+|\-|\*|\/)/g)
    // console.log(str)
    let arr = []
    let curr_number = 0
    let curr_operator = '+'
    for(let i of str){
        if(['+','-'].includes(i)){
            let arr_top = arr[arr.length-1]
            if(['+','-'].includes(arr_top)){
                arr.pop()
                if((arr_top == '+' && i == '+') || (arr_top == '-' && i == '-') ) {
                    arr.push('+')
                }
                else if((arr_top == '+' && i == '-') || (arr_top == '-' && i == '+')){
                    arr.push('-')
                }
            }
            else{
                arr.push(i)
            }
        }
        else{
            if(arr.length > 0){
                let arr_top = arr[arr.length-1]
                if(['+','-'].includes(arr_top)) {
                    let t=arr.pop()
                    if(t == '+'){
                        arr.push(Number(i))
                    }
                    else{
                        arr.push(-Number(i))
                    }
                }
                else{
                    arr.push(Number(i))
                } 
            }
            else{
                arr.push(Number(i))
            }
                
        }
    }
    console.log(arr)
    let res = 0
    while(arr.length > 0) {
        res += arr.pop()
    }

    // console.log(res)
    return res

};

let s = "(1+(4+5+2)-3)+(6+8)"
s = "- (3 + (4 + 5))"
// s = "1-(     -2)20"
// s = '1-(-(-2))'
console.log(calculate(s))

// [ 3, '*',2,'+', 5,'/', 2,'-', 10 ]