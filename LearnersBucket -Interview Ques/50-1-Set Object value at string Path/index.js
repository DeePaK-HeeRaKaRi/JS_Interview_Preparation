

function helper(obj,path,value) {
    let [current,...rest] = path
    console.log({current,rest})
    if(rest.length > 0) {
        //set(obj,'test[0]','deepak')
        //{a:'test',b:'b1'}  > set (obj,b[0],'deepak')
        
        if(!obj[current] || typeof obj[current] !== 'object') {  
            const isNumber = !isNaN(Number(rest[0]))
            const nextVal = isNumber ? [] : {}
            obj[current] = helper(nextVal,rest,value)
        }else{
            obj[current] = helper(obj[current],rest,value)
        }
        
    }
    else{
        obj[current] = value
    }
    return obj
}
function set(obj,path,value) {
    
    path = path.replace('[', '.').replace(']', '').split(".");
    console.log(path)
    return helper(obj,path,value)
}

const obj = {
  a: {
    b: {
    //   c: 'deepak',
        c : [0,1,2]
    },
    d: {
      a: "hello",
    },
  },
  f:'f1',
};

console.log(set(obj,'a.f[0]','deepak'))
// console.log(set(obj, 'a.b.c', 'learnersbucket'))
// console.log(set(obj, 'a.b.c[0]', 'learnersbucket'))
// console.log(set(obj, 'a.b.c[9]', 'learnersbucket'))
// console.log(set(obj, 'f[2]', 'learnersbucket'))
// console.log(set(obj,'test[0]','deepak'))

// const test = {
//     a:'deepak',
//     b:'kumar'
// }

// set(test,'b','xxx')