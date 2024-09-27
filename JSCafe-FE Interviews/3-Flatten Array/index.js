const a=[[[0,0,90],[1,[1.1,4.5,[89,100,[12,444]]]],2,3],[4,5]]
console.log('--------------',a.flat(Infinity))
// The flat method with an argument of Infinity will recursively flatten all nested arrays, 
// const a=[[0,0,90],3,4,[5,7,[9,10]]]
const deepFlatten=(arr) => {
    let flatten = [];
    arr.forEach((item)=>{
        if(Array.isArray(item)){
            // console.log('flatten-----',flatten)
            let subArray=deepFlatten(item)
            flatten = [...flatten, ...subArray];
        }else{
            flatten.push(item)
        }
    })
    return flatten
}
console.log(deepFlatten(a))
 
const flattenArray=(arr) => {
    const calculate = arr.reduce((preValue,curValue) => {
        if(Array.isArray(curValue)){
            // preValue=preValue.concat(flattenArray(curValue))
            preValue=[...preValue,...flattenArray(curValue)]
        }else{
            // console.log('------- prev',preValue.length,preValue,curValue)
            preValue.push(curValue)
        }
        return preValue
    },[])
    return calculate
}
const a1=[[[0,0,90],[1,[1.1,4.5,[89,100,[12,444]]]],2,3],[4,5]]
// const a1=[[0,0,90],3,4,[5,7,[9,10]]]
console.log(flattenArray(a1))
 
let arr1 = [30,90,91,100]
// const addSum = arr1.reduce((prev,curr) => prev+curr , 0)
const addSum = arr1.reduce((prev,cur)=>{
    if(cur % 2==1){
        prev = prev +  0
    }else{
        prev= prev+cur
    }
    return prev
},0)

console.log(addSum)