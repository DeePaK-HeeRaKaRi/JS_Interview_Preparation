// var findSubstring = function(s, words) {
//     function countSubString(currStr,substring,val){
//         let regex = new RegExp(substring, 'g');
//         let matches = currStr.match(regex);
//         let count = matches ? matches.length : 0;
//         return count
//     }
//     let len_s = s.length
//     let len_w = words.length
//     let len_word = words[0].length
//     let concatString_length = words[0].length*len_w
//     if(len_s < concatString_length) return []
//     let hm_s = {}
//     let hm_count_words = {}
//     for(let w of words) {
//         if(hm_count_words.hasOwnProperty(w)) {
//             hm_count_words[w]+=1
//         }else{
//             hm_count_words[w] = 1
//         }
//     }
//     let start = 0
//     let end = 0
//     while(end < len_s) {
//         let subStr = s.substring(start,end+len_word)
//         if(words.includes(subStr)) {
//             if(hm_s.hasOwnProperty(subStr)){
//                 hm_s[subStr].push(start)
//             }
//             else{
//                 hm_s[subStr]=[start]
//             }
//         }
//         end += 1
//         start = end
//     }
//     console.log(hm_s)
//     let ans = []
//     for(let key in hm_s) {
//         for(let val of hm_s[key]){
//             let matchCount = 0
//             let l=val
//             let r = val+len_word
//             let temp =''
//             while(r<=len_s) {
//                 let subStr = s.substring(l,r)
//                 console.log('sub---',key,val,subStr,temp+subStr+',', words.includes(subStr) , countSubString(temp+subStr,subStr,val),hm_count_words[subStr])
//                 if(words.includes(subStr) && countSubString(temp+subStr,subStr,val)<=hm_count_words[subStr] ){
//                     temp = temp+subStr+','
//                     matchCount+=len_word
//                     if(matchCount == concatString_length) {
//                         ans.push(val)
//                         break
//                     }
//                     l = r
//                     r += len_word
//                 }else{
//                     matchCount = 0
//                     break;
//                 }
//             }
//         }
//     }
//     return ans
// };

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
    for(let i=0;i<=len_s-concatString_length;i++) {
        let start = i
        let temp_words_map = JSON.parse(JSON.stringify(hm_count_words)) // Copy of words map
        match_count = 0
        for(let j=i;j<=len_s-len_word;j+=len_word) {
            let subStr = s.substring(j,j+len_word)
            if(temp_words_map.hasOwnProperty(subStr) && temp_words_map[subStr] > 0 ) {
                temp_words_map[subStr] -= 1
                match_count += len_word
            } else {
                break
            }
        }
        if(match_count == concatString_length){
            result.push(start)
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