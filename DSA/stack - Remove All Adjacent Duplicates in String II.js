// var removeDuplicates = function(s, k) {
//     //  TC - o(n*k) sc = o(n) + o(c)
//     let hm = {}
//     let st = []
//     for(let i of s) {
//         if(hm.hasOwnProperty(i)) {
//             hm[i] +=1
//         }else{
//             hm[i] = 1
//         }
//         st.push(i)
//         console.log(hm,i,hm[i])
//         if(st.length >=k && hm[st[st.length-1]] >= k) {
//             let r = st.length - 1
//             let target = st.length - k
//             let flag = true
//             while(0<=r && r > target) {
//                 if(st[r] != st[r-1]) {
//                     flag = false
//                     break
//                 }
//                 r--
//             }
//             if(flag) {
//                 hm[i] = hm[i] - k // assume intially x=14 and after some strings x will become 34 now 34-k[k=20] = 10 . 
//                 // st.splice(target,k)
//                 for(let m=0;m<k;m++) {
//                     st.pop()
//                 }
//             } 
//         }
//     }
//     return st.join('')
// };

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