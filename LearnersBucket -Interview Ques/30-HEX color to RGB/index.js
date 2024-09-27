// In case we are given a short form of Hexa code like #f3f, we will have
// to convert it to the original form.

const fullHex=(hex)=>{
    // #f3f => #ff33ff
    let r=hex.slice(1,2)
    let g=hex.slice(2,3)
    let b=hex.slice(3,4)

    r=parseInt(r+r,16)
    g=parseInt(g+g,16)
    b=parseInt(b+b,16)

    return {r,g,b}
}

// hex will generally have length 6
const hexToRgb=(hex) => {
    
    if(hex.length==4){
        return fullHex(hex)
    }
    const r=parseInt(hex.slice(1,3),16)
    const g=parseInt(hex.slice(3,5),16)
    const b=parseInt(hex.slice(5,7),16)

    return {r,g,b}
}
console.log(hexToRgb('#f3f'))
console.log(hexToRgb('#ffffff'))

// using reg exp
const hex2rgb=(hex)=>{
    let reg=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
    // console.log(reg)
    const rgb=['r','g','b']
    let res=hex.match(reg)
    console.log('-------------------',res,res.slice(1))
    if(res){
        const ans=res.slice(1).reduce((prev,curr,i)=>{
            prev[rgb[i]]=parseInt(curr,16)
            return prev
        },{})
        return ans
    }
    return null
     
}

console.log(hex2rgb("#ff33ff"))