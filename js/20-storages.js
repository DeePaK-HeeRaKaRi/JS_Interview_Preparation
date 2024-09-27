document.getElementById("heading").innerHTML = 'Local & Session Storage'
console.log('Local & Session Storage')

let impArray=['apple','bus','cennni']

localStorage.setItem('name','deepak')
localStorage.setItem('name1','kumar')
localStorage.setItem('object',JSON.stringify(impArray))

// localStorage.setItem('object',(impArray))
 
// JSON.stringify => converts to stringarray 

// clears the entire localStorage
// localStorage.clear()

// clear a particular key-value pair
// localStorage.removeItem('name1')

// json.parse -> will convert into array
// let a=JSON.parse(localStorage.getItem('object'))
// console.log('a',typeof a,a)
console.log(JSON.parse(localStorage.getItem('object')))
// console.log(JSON.parse(localStorage.getItem('object'))[0])

// if the brwoser session ends all the data in th session storage will be deleted but in localstorage remain the data
// sessionStorage.setItem('sessionname','deepak')
// sessionStorage.setItem('sessionname1','kumar')
// sessionStorage.setItem('sessionobject',JSON.stringify(impArray))


// sessionStorage.clear()