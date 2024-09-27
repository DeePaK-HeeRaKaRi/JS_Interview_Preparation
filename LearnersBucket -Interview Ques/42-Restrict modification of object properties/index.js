// Using Object.seal() to restrict object extending -> we can update the properties

const obj={
    prop:42
}

Object.seal(obj)
obj.prop=33
delete obj.prop //cannot deleted when sealed
obj['new']="deepak" //cannot add new properties
console.log(obj)
console.log(obj.prop)

// But we cannot restrict the modification of nested objects with Object.seal().

// const obj2={
//     prop:42,
//     nested:{
//         a:1,
//         b:2
//     }
// }

// Object.seal(obj2)

// obj2.nested.a=3
// delete obj2.nested.a  // should not delet but it is deleting

// obj2.nested["c"]=5 //shouldnot add but adding
// console.log(obj2.nested.a)

// so for nested objects take one helper function
console.log('------------Nested objects----------------')
function deepSeal(obj2){

    // retrive all the keys
    let propsNames=Object.getOwnPropertyNames(obj2)
    // console.log('propsNames',propsNames)
    for(let name of propsNames){
        let value=obj2[name]
        // console.log('value',value)
        obj2[name] = value && typeof value=='object' ? deepSeal(value) : value
    }
    return Object.seal(obj2)

}

const obj2={
    prop:42,
    nested:{
        a:1,
        b:2
    }
}

deepSeal(obj2)
// Now this will seal the nested objects as well.
obj2.nested.a=2
obj2['another']=3 
delete obj2.nested.a
console.log('-----------',obj2,'------------',obj2.nested.a)


// We can use Object.isSealed() to confirm if an object is sealed or not.
console.log(Object.isSealed(obj2))
