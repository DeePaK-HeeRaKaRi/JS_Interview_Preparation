//https://leetcode.com/discuss/post/6528648/goldman-sachs-coderpad-round-bangalorehy-4bl5/

function longestContinous(str) {
    let hm = {}
    let max_freq_start_index = -1
    let max_freq_count = 0
    let left = 0
    let n = str.length
    for(let right =0;right <=n;right ++) {
       if(right == n || str[left] != str[right]) {
            const count = right - left
            // max_freq_count = Math.max(max_freq_count, count)
            if(count > max_freq_count) {
                max_freq_count = count
                max_freq_start_index = left
            }
            left = right
       }
    }
    return {max_freq_count,max_freq_start_index}
}

console.log(longestContinous('aabbbbccd'))
console.log(longestContinous('aabbbbbb'))