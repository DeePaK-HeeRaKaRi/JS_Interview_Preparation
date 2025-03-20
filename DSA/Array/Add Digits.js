
// Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

function addDigits(num) {
    // function digits_sum(n) {
    //     let sum = 0;
    //     while (n > 0) {
    //         sum += n % 10;
    //         n = Math.floor(n / 10);
    //     }
    //     return sum;
    // }
    // let temp = num 
    // while(temp > 9){
    //     temp = digits_sum(temp);
    // }

    // return temp;

    if(num === 0) return 0
    if(num % 9 === 0) return 9
    return num % 9
}

let num = 38 //output = 2

console.log(addDigits(num))