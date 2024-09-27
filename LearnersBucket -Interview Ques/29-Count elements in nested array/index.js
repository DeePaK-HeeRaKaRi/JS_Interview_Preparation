const countInArray=(arr,fn)=>{
    let count = 0;
    const filter=(arr,fn)=>{
        for(let i of arr){
            if(Array.isArray(i)){
                filter(i,fn)
            }else{
                if(fn(i)){
                    count++
                }
            }
        }
        return count
    }
    return filter(arr,fn)
}
Array.prototype.countElements=function(fn){
    let count = 0;
    const filter=(arr,fn)=>{
        for(let i of arr){
            if(Array.isArray(i)){
                filter(i,fn)
            }else{
                if(fn(i)){
                    count++
                }
            }
        }
        return count
    }
    return filter(arr,fn)
}
const arr = [[1, [2, [3, 4, "foo", { a: 1, b: 2 }]],6,9,10,"bar"]];
// const count = countInArray(arr, (e) => typeof e === "number");
const count=arr.countElements((e) => typeof e === "number")
console.log(count);