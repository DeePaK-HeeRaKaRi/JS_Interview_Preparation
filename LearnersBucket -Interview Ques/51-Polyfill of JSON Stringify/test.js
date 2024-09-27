class myJSON{
    static value(val){
        switch(typeof val){
            case 'string':
                return `${val}`
            case 'number': //JSON.stringify(Infinity) > null
                return isFinite(val) ? `${val}` : "null";
            case "boolean":
                return `${val}`;
            case "function":
                return 'undefined'
            case null:
                return 'undefined'
            case 'object':
                if(val instanceof Date){
                    return `"${val.toISOString()}"`
                }
                // new String('deep')
                else if (val instanceof String || val instanceof Boolean) {
                  return `"${val}"`;
                }
                else if(val instanceof Number){
                    return isFinite(val) ? `${val}` : "null";
                }
                // [{x:'test',y:"test1"},{x:'test',y:"test1"}]
                else if (Array.isArray(val)) {
                    return `[${val.map((v) => this.value(v)).join(",")}]`
                }
                else{
                    return this.myStringify(val)
                }
        }
    }
    static myStringify(obj){
        if(typeof obj != "object" || obj === undefined || obj instanceof Array){
            return this.value(obj)
        }
        else if(typeof obj === null){
            return `null`
        }
        obj=this.removeCycle(obj)
        const objString = Object.keys(obj).map((v) => {
            return typeof v == 'function' ? null : 
                `"${v}":${this.value(obj[v])}`
        })
        return `{${objString}}`
      
    }

    static removeCycle(obj){
        let visited=new WeakSet([obj])
        console.log(visited)
        const iterate = (obj) =>{
            console.log('obj------',obj)
            for(let key in obj){
                if(obj.hasOwnProperty(key)){
                    if(typeof obj[key]==='object'){
                        if (visited.has(obj[key])) {
                          delete obj[key]
                        // throw new Error('Has Cycle')
                        }else{
                            if(obj[key].next){
                                iterate(obj[key].next);
                            } 
                        }
                    } 
                }
            }
        }
        iterate(obj)
        // console.log(JSON.stringify(obj))
        return obj
    }
}
let obj={
    a:'deep',
    b:10,
    c:{
        c1:'test',
        c2:'test2'
    }
}

let obj1={
    a:"deep",
    b: {
        c:'kumar',
        d:'heera',
        e:{
            f:"xyz",
            g:"hyi"
        }
    },
    b1:[0,1,1],
    c1:{c2:[{k:'key'},{v:'value'}]}
}
let p=JSON.stringify(obj1)
let q=myJSON.myStringify(obj1)
// console.log(p,typeof(p));
// console.log(q, typeof(q));
// console.log(JSON.stringify(Infinity))
// console.log(myJSON.myStringify(9))
// console.log(JSON.stringify(9))

const List = function (val) {
  this.val = val;
  this.next = null;
};
const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);
item1.next = item2;
item2.next = item3;
item3.next = item1;
console.log(myJSON.myStringify(item1));
