 //30
var findSubstring = function(s, words) {
     let len_s = s.length
    let len_w = words.length
    let len_word = words[0].length
    let concatString_length = words[0].length*len_w
    if(len_s < concatString_length) return []
    let hm_count_words = {}
    for(let w of words) {
        if(hm_count_words.hasOwnProperty(w)) {
            hm_count_words[w]+=1
        }else{
            hm_count_words[w] = 1
        }
    }
    // console.log(s[len_s-concatString_length])
    let result = []
    let match_count
    //str length = 18 , concat stringlength = 9 > You need to traverse from 0 to 9th index 
    //Since in inner for loop we are doing +len_word
    for(let i=0;i<=len_s-concatString_length;i++) {
        let start = i
        let temp_words_map = JSON.parse(JSON.stringify(hm_count_words)) // Copy of words map
        match_count = 0
        // You need to traverse untill concatString_length . 
        // So i = 3 , traverse untill 3 + 9(concat stringlength) = 12 index & increase by +len_word
        for(let j=i;j<= concatString_length+i;j+=len_word) {
            let subStr = s.substring(j,j+len_word)
            if(match_count > concatString_length) break

            if(temp_words_map.hasOwnProperty(subStr) && temp_words_map[subStr] > 0 ) {
                temp_words_map[subStr] -= 1
                match_count += len_word
            }else{
                break
            }

            if(match_count == concatString_length){
                result.push(start)
                break
            }
        }

    }
    return result
};

let s = "barfoothefoobarthefoobarman"
let words = ["bar","foo","the"]
s = "barfoofoobarthefoobarman"
words = ["bar","foo","the"]
// s = "wordgoodgoodgoodbestword"
// words = ["word","good","best","word"]
// s = "barfoothefoobarman"
// words = ["foo","bar"]
// s ="wordgoodgoodgoodbestword"
// words =["word","good","best","good"]
// s ="lingmindraboofooowingdingbarrwingmonkeypoundcake"
// words =["fooo","barr","wing","ding","wing"]
// s ="ababaab"
// words =["ab","ba","ba"]
s = "barfoofoobartheamthebarfoo"
words = ["bar","foo","the"]
console.log(findSubstring(s,words))