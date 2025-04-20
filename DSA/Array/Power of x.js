function maxPowerIn32Bit(base) {
    const max = 2 ** 31 - 1; //maximum value for a signed 32-bit integer.
    const x = Math.floor(Math.log(max) / Math.log(base)); // how many times you can multiply base with itself before you exceed max
    return {
        exponent: x,
        power: base ** x
    };
}

function findPower(n,power) {
    if(n<=0 || power<=0) return false
    let maxPower = maxPowerIn32Bit(power)
    return maxPower.power % n == 0
}

console.log(findPower(27,3))
console.log(findPower(12,2))
console.log(findPower(100,10))