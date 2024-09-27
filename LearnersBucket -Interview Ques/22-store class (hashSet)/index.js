// const Store=function(){
//     this.list={}
//     this.set=(k,v)=>{
//         if(this.list.hasOwnProperty(k)){
//             this.list[k].push(v)
//         }else{
//             this.list[k]=[v]
//         }
//     }
//     this.get=(k)=>{
//         return this.list[k]
//     }
//     this.has=(k)=>{
//         return this.list[k] ? true :false
//     }
//     this.obj=()=>{
//         return this.list
//     }
// }
class Store{
    constructor(){
        this.list={}
    }
    set(k,v){
        if(this.list.hasOwnProperty(k)){
            this.list[k].push(v)
        }else{
            this.list[k]=[v]
        }
    }

    get(k){
        return this.list[k] ? this.list[k] : null
    }
    has(k){
        return this.list.hasOwnProperty(k);
    }

    obj(){
        return this.list
    }
}
const store=new Store()
store.set('a',1)
store.set('b',2)
store.set('c',3)
store.set('c',4)
console.log(store.get('c'))
console.log(store.get("d"));
console.log(store.has('b'))
console.log(store.has("b4"));
console.log(store.obj())
console.log('to get the size',Object.keys(store.list).length)
console.log("to get the size", Object.values(store.list));
// const detail ={'ee':8998,'uiu':8779}
// console.log(detail.hasOwnProperty('ee'))

let test ={a:1,b:9090,c:878}

for(let key of Object.keys(test)){
    console.log(key,test[key])
}