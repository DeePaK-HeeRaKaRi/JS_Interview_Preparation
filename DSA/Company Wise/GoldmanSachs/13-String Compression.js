//https://leetcode.com/problems/string-compression/
function compress(chars) {
    let left = 0
    let update_index = 0
    let n = chars.length
    for(let right = 0; right <= n;right++) {
        if(right == n || chars[left] != chars[right]) {
            chars[update_index] = chars[left]

            update_index += 1

            const count = right - left
            if(count > 1) {
                let count_str = String(count) // 22 > 2,2
                for(let c of count_str) {
                    chars[update_index] = c
                    update_index++
                }
            }

            left = right
        }
    }

    return chars.slice(0,update_index)
     
}

console.log(compress(["a","a","b","b","c","c","c"]))
console.log(compress(["a","b","b","b","b","b","b","b","b","b","b","b","b"]))