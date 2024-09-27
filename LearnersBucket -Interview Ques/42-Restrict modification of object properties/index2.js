// Object.freeze() freezes the object completely. It does not even allow changing of object properties.
// "use strict"
const obj={
    props:42
}
Object.freeze(obj)
obj.props=33
console.log(obj)

// But this also only shallowly freezes the nested object properties.

// const obj2={
//     prop:42,
//     nested:{
//         a:1,
//         b:2
//     }
// }
// Object.freeze(obj2)
// obj2.prop=33
// obj2.nested.a=3 //it should not update but it is updating so use deepFreeze helper
// console.log(obj2)

const obj2={
    prop:42,
    nested:{
        a:1,
        b:2
    }
}
function deepFreeze(obj){
    const propNames=Object.getOwnPropertyNames(obj)
    for(let name of propNames){
        let value=obj[name]
        obj[name]=value && typeof value=='object' ? deepFreeze(value) : value
    }
    return Object.freeze(obj)
}
deepFreeze(obj2)

obj2.nested.a=33
delete obj2.nested.a
obj2['new']='latest'
console.log(obj2.nested.a,obj2)

// Object.isFrozen() to check if an object is frozen or not.
const obj3={
    prop:67
}
console.log(Object.isFrozen(obj2))