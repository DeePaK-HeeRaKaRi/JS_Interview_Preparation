console.log('Fetch APi')

var i=0
let fetchedData
function getData(){
    console.log("Started getData")
    url='https://api.github.com/users'
    
    fetch(url).then((response)=>{
        console.log("Inside first then")
        return response.json()
       
    }).then((data)=>{
        console.log("Inside second then")
        fetchedData=data
        data.forEach((element ) => {
            console.log(element.login)
        }); 
    })
}

function postData(){
    url='http://dummy.restapiexample.com/api/v1/create.'
    data='{"name":"deepak","salary":"123","age":"23"}'
    params={
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:data
    }
    fetch(url,params).then(response => {
        return response.json
    }).then(data=>{
        console.log(data)
    })
}
// getData()
// postData()
// console.log("Before Running getData")
// getData()
// console.log("After Running getData")

class fetchData{
     
    async  getData(){
        console.log("in getData")
        var url='https://api.github.com/users'
        await fetch(url).then((response)=>{
            console.log("Inside first then")
            return response.json()
        
        }).then((data)=>{
            console.log("Inside second then")
            
            return data.forEach((element ) => {
                console.log(element.login)
            }); 
        })
    }
    value(){
        console.log("in value")
        return this.getData()
    }
}


const p=new fetchData()
// console.log(p.getData())
console.log(p.value())

