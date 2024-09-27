var validPalindrome = function(s) {
    let l = 0
    let r = s.length - 1
    let count_0 = 0
    let count_1 = 0
    let k = 1
    // Decrement from right
    while(l < r) {
        if(s[l] == s[r]){
            l++
            r--
        }
        else{
            count_0++
            r--
        }
        if(count_0 > k) break
    }
    // From right if we increased the count only once , means we can remove one character and make it palindrome
    if(count_0 <= k) return true

    // Else we have to check from left
    l = 0
    r = s.length - 1
    // Increment from left
    while(l < r) {
        if(s[l] == s[r]){
            l++
            r--
        }
        else{
            count_1++
            l++
        }
        if(count_1 > k) break
    }
    // From left if we increased the count only once , means we can remove one character and make it palindrome
    return count_1 <= k 
};

let s = 'aba'
s = "abca"
s = "abc"
s='eedde'
s='eedede'
s='deeee'
s = "cdbeeeabddddbaeedebdc"
console.log(validPalindrome(s))