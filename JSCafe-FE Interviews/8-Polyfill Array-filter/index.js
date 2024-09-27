// const arr=[1,2,3,4,9,10,12]
// const filteredArray=arr.filter((val) => val%2==0)
// console.log(filteredArray)
Array.prototype.myFilter=function(callback){
    // console.log(callback)
    // console.log(this)
    let output=[]
    this.forEach((value,index)=>{
        if(callback(value,index,this)){
            output.push(value)
        }
    })
    return output
}
const arr = [1, 2, 3, 4, 9, 10, 12, "ddee"];
const filteredArray=arr.myFilter((val,index,arr) => val%2==0)
console.log(filteredArray)


// Array.prototype.dup=function(){
//     console.log(this)
// }
// const arr1=[1,2,44,5,66]
// arr1.dup()
const test = [1, 2, 3, 4, 9, 10, 12,'ddee'];
const arr1 = test.filter((val) => val%2==0)
console.log('--------',arr1)