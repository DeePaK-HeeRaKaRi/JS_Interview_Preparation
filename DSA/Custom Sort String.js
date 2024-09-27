var customSortString = function(order, s) {
    let hm_s = {}
    for(let i=0;i<s.length;i++) {
        if(hm_s.hasOwnProperty(s[i])){
            hm_s[s[i]] += 1
        }else {
            hm_s[s[i]] = 1
        }
    }
    let res = ''
    for(let i=0;i<order.length;i++){
        if(hm_s.hasOwnProperty(order[i])){
            res += order[i].repeat(hm_s[order[i]])
            delete hm_s[order[i]]
        }
    }

    // for(let i=0;i<Object.keys(hm_s).length;i++) {
    //     res += hm_s[i]
    // }
    Object.keys(hm_s).forEach((val)=>{
        console.log(val)
        res+= val.repeat(hm_s[val])
        delete  hm_s[val]
    })
    console.log(res,hm_s)
    return res
};
let order = "cba"
let s = "abcd"
console.log(customSortString(order,s))