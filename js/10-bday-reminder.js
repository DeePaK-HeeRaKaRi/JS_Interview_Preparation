 
let obj=[
    {name:'Deepak',date:18,dateofmonth:5},
    {name:"Kumar",date:18,dateofmonth:5},
    {name:"Ramu",date:18,dateofmonth:5},
    {name:"Vijay",date:18,dateofmonth:5},
    {name:"Madhu",date:18,dateofmonth:5},
]
console.log(obj.length)
t=new Date()
console.log(t,typeof t)
let date=String(new Date()) 
let datenow= new Date()
console.log(date)
console.log('Datenow',datenow)
console.log('get-min',datenow.getMinutes())
console.log('get-hours',datenow.getHours())
console.log('get-month',datenow.getMonth())
console.log('get-year',datenow.getFullYear())
console.log(datenow.getDate())
var min=datenow.getMinutes()
var hours=datenow.getHours()
var month=datenow.getMonth()
var year=datenow.getFullYear()
var date1=datenow.getDate()
 
document.getElementById('heading').innerHTML='Birthday Wishes'
var mylist=document.getElementById('list')
for(let i=0;i<obj.length;i++){
     
    if(hours==11 && min==48 && month==5 && obj[i].date==date1 && obj[i].dateofmonth==month){
        var msg=`Happy Birthday ${obj[i].name} From Mindtree`
        let li=document.createElement('li')
        li.innerHTML=msg
        mylist.appendChild(li)
    }
}
