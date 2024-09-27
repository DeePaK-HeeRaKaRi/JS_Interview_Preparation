var judgeSquareSum = function(c) {
    let h = Math.floor(Math.sqrt(c))
    let l = 0
    while(l<=h) {
        let target = l*l + h*h
        console.log(l,h)
        if(target == c) {
            return true
        }
        else if(target < c) {
            l++
        }
        else{
            h--
        }
    }
    return false
};

let c = 90
console.log(judgeSquareSum(c))