var removeDuplicateLetters = function(s) {
    // Remove the Duplicates 
    // And Return the lexicographical smallest subsequence

    let freq_hm = {} // To know whether the same character is appearing in next step
    let vis_hm = {}  // To track the char for vis or not
    for(let i of s) {
        if(freq_hm.hasOwnProperty(i)) {
            freq_hm[i]++
        }
        else{
            freq_hm[i] = 1
        }

        if(!vis_hm.hasOwnProperty(i)){
            vis_hm[i] = false
        }
    }

    let st = []
    for(let i of s) {
        console.log(vis_hm,freq_hm,st)
        if(vis_hm[i]){
            freq_hm[i]--
        }
        else{
            // i < st[st.length-1] ==> for lexicographical smaller 
            // freq_hm[i] > 0 == > check if it can be removed or not
            // bca
            while(st.length > 0 && i < st[st.length-1] && freq_hm[st[st.length-1]] > 0) {
                let t=st.pop()
                // freq_hm[t]--
                vis_hm[t] = false
            }

            st.push(i)
            freq_hm[i]--
            vis_hm[i] = true
        }
    }
    console.log(st)
    return st.join('')
};

let s = 'cbacdcbc'
s = "cdadabcc"
console.log(removeDuplicateLetters(s))