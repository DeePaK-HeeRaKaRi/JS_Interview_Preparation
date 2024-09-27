console.log( 'AJAX')
let fetchBtn=document.getElementById('fetchBtn')
fetchBtn.addEventListener('click',handler)
function handler(){
    console.log('You have clicked the fetchBtn')

    // Instantiate the xhr object
    const xhr=new XMLHttpRequest()
    console.log(xhr)
    // Open the object
    // true for async programming
    // xhr.open('GET','https://jsonplaceholder.cypress.io/todos',true)
    xhr.open('POST','http://dummy.restapiexample.com/api/v1/create',true)
    xhr.getResponseHeader('Content-type','application/json')

    // What to do onprogress (optional)
    xhr.onprogress=function(){
        // used when the spinner or progress bar to be placed
        console.log('On Progress')
    }
    xhr.onreadystatechange=function(){
        console.log('Ready State is :',xhr.readyState)
    }
    // what to do when response is ready
    xhr.onload=function(){
        if(xhr.status===200){
            console.log('onload ->', JSON.parse(xhr.responseText))
        }
        else{
            console.log('Error in Fetching API')
        }
        
    }
     
    // console.log(xhr)

    // send the request for get
    // xhr.send()

    // post
    params=	{"name":"test","salary":"123","age":"23"}
    xhr.send(params)
    
    console.log('We are Done !!')
}

let popBtn=document.getElementById('backupBtn')
popBtn.addEventListener('click',popHandler)

function popHandler(){
    console.log('You have clicked the popHandler')

    // Instantiate the xhr object
    const xhr=new XMLHttpRequest()
    console.log(xhr)
    // Open the object
    // get request
    // true for async programming
    xhr.open('GET','https://jsonplaceholder.cypress.io/todos',true)

   
    // what to do when response is ready
    xhr.onload=function(){
        if(xhr.status===200){
            // console.log('onload ->', JSON.parse(xhr.responseText))
            let obj=JSON.parse(xhr.responseText)
      
            console.log(obj)
            let list=document.getElementById('list')
             
            // obj.forEach(element => {
            //     var li=document.createElement('li')
            //     li.innerHTML=JSON.stringify(element).userId  
            //     list.appendChild(li)
            // });

            // for(k in obj){
            //     var li=document.createElement('li')
            //     li.innerHTML=obj[k].userId+" "+obj[k].title
            //     list.appendChild(li)
            // }
            html=''
            for(k in obj){
                html+=`<li>${obj[k].userId} ${obj[k].title}</li>`
            }
            // console.log(html)
            list.innerHTML=html
            
        }
        else{
            console.log('Error in Fetching API')
        }
        
    }
     
    xhr.send()
 
    console.log('We are Done Fetching API!!')
}