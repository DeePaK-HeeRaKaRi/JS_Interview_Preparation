//https://leetcode.com/discuss/post/6649948/goldman-sachs-interview-experience-assoc-ppf9/
var firstUniqChar = function(s) {
    let hm = {}
   let min = Infinity
   for(let i of s) {
       if(hm.hasOwnProperty(i)) {
           hm[i] += 1
       }
       else {
           hm[i] = 1
       }
   }

   for(let i=0; i<s.length; i++) {
       if(hm[s[i]] == 1) return i
   }
   return -1
};
let s = "leetcode"
s = "loveleetcode"
s = "aabb"
console.log(firstUniqChar(s))
