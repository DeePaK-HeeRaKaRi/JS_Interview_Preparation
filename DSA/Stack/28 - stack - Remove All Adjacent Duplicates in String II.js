 var removeDuplicates = function(s, k) {
    let st = []
    for(let i of s) {
        if(st.length>0 && st[st.length-1][0]==i){
            st[st.length-1] = [i,st[st.length-1][1]+1]
        }else{
            st.push([i,1]);
        }
        if(st[st.length-1][1] == k) {
            st.pop()
        }
    }
    console.log(st)
    let res= ''
    for(let  j of st) {
        res +=  j[0].repeat(j[1])
    }
    return res
}

let s = "deeedbbcccbdaa"
let k = 3
s = "abcd"
k = 2
// s = "pbbcggttciiippooaais"
// k = 2
s="dtpdtaaaaaaaaappppppppppppppppppppaaaaaaaaaaxxxxxxxxxxxxxxsssssssssjjjjjjjjjjjjjjjjjjjjxxxxxxxxxxxxxxxxxxxxsssssssjjjjjjjjjjjjjjjjjjjjssssxxxxxxatdwvvpctpggggggggggggggggggggajagglaaaaaaaaaaaaaaaaaaaa"
k=20
console.log(removeDuplicates(s,k))

//"dtpdttdwvvpctpajaggl"