// let obj={
//     name:'harry',
//     office:'mindtree'
// }

function Obj(givenName){
    this.name=givenName
}
Obj.prototype.getName=function(){
    return this.name
}
let obj2=new Obj('RR Das')
// obj=new Obj('Deepak')
console.log(obj2)