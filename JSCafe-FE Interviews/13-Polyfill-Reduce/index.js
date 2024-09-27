// array should not be undefined
// if the array is empty and the initialValue is not passed throw error
// if the initialValue is passed consider prevValue as initialValue and start from index 0
// if the initialValue is not passed, consider prevValue as arr[0] and start from index 1

Array.prototype.myReduce=function(callback,initialValue){
    var arr=this
    if(!arr) throw new Error('Array should not be undefined')
    var index=0
    var n=arr.length
    var preValue
    if(arr.length==0){
        if(initialValue){
            return initialValue
        }else{
            throw new Error('You must pass initial Value if the array is empty')
        }
    }
    if(initialValue){
        preValue=initialValue
    }else{
        preValue=arr[index]
        index+=1
    }

    while(index<n){
        preValue=callback(preValue,arr[index],index,arr)
        index+=1
    }
    return preValue
}
const arr=[1,2,3,4]
// const arr=[]
const initialValue=1
const callback=(prev,cur) => prev+cur
console.log(arr.myReduce(callback,initialValue))


// const arr1=[]
// const dum=arr1.reduce((prev,cur)=>prev+cur,10)
// console.log('dumy------',dum)