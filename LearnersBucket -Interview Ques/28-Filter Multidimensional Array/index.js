const filter=(arr,fn)=>{
        let res=[]
     
        for(let i of arr){
            // console.log('i current',i)
            if(Array.isArray(i)){
                const output=filter(i,fn)
                res.push(output)
                // console.log('output----',output,res)
            }else{
                if(fn(i)){
                    res.push(i)
                    // console.log('else-------',res)
                }else{
                    console.log('condition failed')
                }
            }
            // console.log('result-------',res)
        }
        return res
}
// prototype will not accept arrow functions
Array.prototype.multiFilter=function(fn){
    const arr=this
    const filter=(arr,fn)=>{
        let res = [];
        for(let a of arr){
            if(Array.isArray(a)){
                const output=filter(a,fn)
                console.log(output)
                res.push(output)   //need to take only res, coz if it dont have an array that it will push into res
            }else{
                if(fn(a)){
                    res.push(a)
                }
            }
        }
        return res
    }
    return filter(arr,fn)
}

// const arr = [[1, [2, [3, 'foo', {'a': 1, 'b': 2}]], 'bar']];
const arr=[['foo',1],3,'doo']
// const filtered = filter(arr, (e) => typeof e === 'number');
const filtered=arr.multiFilter((e) => typeof e === 'number')
console.log(JSON.stringify(filtered));


// const arr = [[1, [2, [3, "foo", { a: 1, b: 2 }]], "bar"]];
// const filtered = filter(arr, (e) => typeof e === "number");
// console.log(JSON.stringify(filtered));
