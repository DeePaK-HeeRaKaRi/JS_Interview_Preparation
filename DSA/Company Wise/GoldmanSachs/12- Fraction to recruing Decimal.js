//https://leetcode.com/discuss/post/4668434/goldman-sachs-associate-coderpad-by-anon-2gfd/

var fractionToDecimal = function(numerator, denominator) {
    if (numerator === 0) return "0";
    
    let result = "";

    // Sign
    if (Math.sign(numerator) !== Math.sign(denominator)) result += "-";

    // Convert to positive and use BigInt to avoid precision issues
    let num = Math.abs(numerator);
    let den = Math.abs(denominator);

    // Integer part
    result += Math.floor(num / den);
    num %= den;
    if (num === 0) return result;

    result += ".";

    const map = new Map();
    while (num !== 0) {
        if (map.has(num)) {
            const idx = map.get(num);
            result = result.slice(0, idx) + "(" + result.slice(idx) + ")";
            break;
        }
        map.set(num, result.length);
        num *= 10;
        result += Math.floor(num / den);
        num %= den;
    }

    return result;
};


// console.log(fractionToDecimal(1,2))
// console.log(fractionToDecimal(2,1))
console.log(fractionToDecimal(4,333))
console.log(fractionToDecimal(1,6))