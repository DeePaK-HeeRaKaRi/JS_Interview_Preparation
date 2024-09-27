function combinationSum(n,k,arr,i) {
    // console.log(res)
    const currSum = arr.reduce((prev,curr) => prev+curr,0)
    if(arr.length == k && currSum!=n){
        return
    }
    if(arr.length == k && currSum==n) {
        // console.log(arr)
        res.push([...arr])  // Push a copy of the current array
        return 
    }
    if(i>n) {
        return
    }
    for(let j=i;j<=9;j++) {
        arr.push(j)
        combinationSum(n,k,arr,j+1)
        arr.pop()
    }
    return res
}

let k=9
let n=45
if(k>n) {
    return []
}
let res = []
console.log(combinationSum(n,k,[],1))