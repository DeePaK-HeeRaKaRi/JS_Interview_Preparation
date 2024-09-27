 
// const aggregrateValues=(id)=>{
//     const parentElement = document.querySelector(`#${id}`)
//     const elements = parentElement.querySelectorAll('input[type=text]');
//     console.log('==========',elements,Array.from(elements))
//     // return Array.from(elements)
//     const arr=Array.from(elements)
//     const result=arr.reduce((prev,curr) => {
//         let currNameValues=curr.name.split('.')
//         let temp=prev
//         currNameValues.forEach((value,index) => {
//             console.log('temp',temp)
//             if(!(value in temp)){
//                 temp[value]={}
//             }
//             if(index == currNameValues.length-1) {
//                 temp[value] = curr.value
//             }

//             temp=temp[value]
//         })
//         return prev
//     },{})
//     return result

// }
// console.log(aggregrateValues('parent'))

 const parentElement = document.querySelector(`#parent`);
//  const elements = parentElement.querySelectorAll("input[type=text]");
const elements = parentElement.children
//  console.log('----elements',elements)
 const arr=Array.from(elements)
 console.log('arr',arr);
 let result={}
 for(let key of arr){
    console.log('key',key)
    let split = key.name.split('.')
    let temp=result
    console.log('-----temp',temp)
    split.forEach((val,index) => {
        if(!(val in temp)){
            temp[val]={}
        }
        if(index==split.length-1){
            temp[val]=key.value
        }
        temp=temp[val]
    })
    
    console.log('-----',temp,result)
 }

 console.log(result)