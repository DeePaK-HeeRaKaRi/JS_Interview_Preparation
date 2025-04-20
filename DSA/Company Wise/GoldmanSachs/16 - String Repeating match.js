//https://leetcode.com/discuss/post/6386598/goldman-sachs-associate-by-anonymous_use-yfbz/

function StringRepeating(str) {
    let result = "";
    let i = str.length - 1 // Start from last index
    while (i >= 0) {
        if(i%2 != 0) { //only check for odd index, means both sides shoud be equal length
            const mid = (i+1) / 2
            const left = str.slice(0,mid) // left half 0,mid-1
            const right = str.slice(mid,i+1) // mid to i

            if(left == right) {
                result = '*' + result
                i = mid-1
                continue;
            }
            else {
                result = str[i] + result
            }
        }
        else {
            result = str[i] + result
        }
        i--
    }

    return result
}



// function StringRepeating(s) {
//     // Base case: single character string
//     if (s.length === 1) return s;
  
//     const split = Math.floor(s.length / 2);
  
//     // If the string is made of two identical halves
//     if (s.slice(0, split) + s.slice(0, split) === s) {
//       return StringRepeating(s.slice(0, split)) + "*";
//     }
  
//     // Try two strategies:
//     // 1. Keep the first character, compress the rest
//     const s1 = s[0] + StringRepeating(s.slice(1));
  
//     // 2. Compress the prefix, then add the last character
//     const s2 = StringRepeating(s.slice(0, -1)) + s[s.length - 1];
  
//     // Return the shorter result
//     return s1.length < s2.length ? s1 : s2;
//   }

  
console.log(StringRepeating("ABAB"));         // "AB*"
console.log(StringRepeating("ABABAB")); 
console.log(StringRepeating("ABCDABCE"));     // "ABCDABCE"
console.log(StringRepeating("ABCABCE"));      // "ABC*E"
console.log(StringRepeating("AAA"));          // "A*A"
console.log(StringRepeating("ABABAB"));       // "AB**"
console.log(StringRepeating("AAAAAA"));       // "A*****"
console.log(StringRepeating("ABABCABABCD"));  // "AB*C*D"