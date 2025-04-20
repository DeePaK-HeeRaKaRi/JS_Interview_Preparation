//https://leetcode.com/discuss/post/4648793/goldman-sachs-coderpad-by-seanhong06-sgy4/

var isPowerOfThree = function(n) {
    if(n<=0 ) return false;
    // 27 > 9 > 3 > 1
    while(n%3==0) {
        n = n/3;
    }
    return n == 1
};

console.log(isPowerOfThree(27))



function maxPowerIn32Bit(base) {
    const max = 2 ** 31 - 1; //maximum value for a signed 32-bit integer.
    const x = Math.floor(Math.log(max) / Math.log(base)); // how many times you can multiply base with itself before you exceed max
    return {
        exponent: x,
        power: base ** x //Max value
    };
}

function findPower(n,power) {
    if(n<=0 || power<=0) return false
    let maxPower = maxPowerIn32Bit(power)
    return maxPower.power % n == 0
}

console.log(findPower(27,3))