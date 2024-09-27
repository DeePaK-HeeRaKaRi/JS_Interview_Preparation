 
// function useCutomCookie(){
//     const store=new Map()

//     Object.defineProperty(document,'myCookie',{
//         configurable:true,
//         get(){
//             const cookies =[]
//             const time = Date.now()
//             console.log('-get------',store)
//             // get all entires from store
//             for(const [name,{value,expires}] of store){
//                 if(expires <= time){
//                     store.delete(name)
//                 }
//                 else{
//                     cookies.push(`${name}=${value}`)
//                 }
//             }
//             return cookies.join('; ')
//         },

//         set(val){

//             const {key,value,options} = parseCookieString(val)

//             // if option has max age set the expiry date
//             let expires=Infinity
//             if(options.maxAge){
//                 expires=Date.now() + Number(options.maxAge) * 1000
//             }
//             store.set(key,{value,expires})
//         }
//     })
// }
// function parseCookieString(str){
//     // "name=prashant;max-age=1
//     const [nameValue,...rest] = str.split(';')
//     const [key,value] = separatedValue(nameValue)
   
//     // parse all options and store it in a maxAge

//     const options = {}
//     for(const option of rest){
//         const [key,value] = separatedValue(option)
//         options[key] = value
//     }
//     console.log('------',{key,value,options})
//     return {key,value,options}
// }

// function separatedValue(str){
//     return str.split('=').map(s => s.trim())
// }
function useCutomCookie(){
    const store=new Map()
    Object.defineProperty(document,'myCookie',{
        configurable:true,
        get(){

        },
        set(val){
            console.log('-val-------',val)
            const { key, value, options } = getParseString(val)
            let expires= Infinity
            if(options.maxAge){
                expires = Date.now() + options.maxAge;
            }
            store.set(key, { value, expires });
        }
        
    })
}
function getParseString(str){
    const [nameValue,...rest] = str.split(";")
    const [key,value]=seperatedValue(nameValue)
    let options={}
    for(let option of rest){
        const [key, value] = seperatedValue(option);
        options[key] = value
    }
    return {key,value,options}
}

function seperatedValue(str){
    return str.split('=').map(s => s.trim())
}

useCutomCookie();
document.myCookie = "blog=learnersbucket";
// this will expire after 1 second
document.myCookie = "name=prashant;maxAge=1";
console.log(document.myCookie);
setTimeout(() => {
  console.log(document.myCookie);
}, 1500);
 