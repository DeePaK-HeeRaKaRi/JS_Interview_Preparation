// go to any website ex-> geeksforgeeks python do inspect and paste the below code to see the links
let str='python'
let links=document.links
let href
let flag=true
let c=new Array()
Array.from(links).forEach((e)=>
{    
    href=e.href
    // in href checking if their in python or not
    if(href.includes(str)){
        flag=false
        console.log(href)
        c.push(href)
    }
    
})
if(flag==true){
    console.log(`${str} doesnot exists`)
}
console.log(c[0])
// console.log(links)