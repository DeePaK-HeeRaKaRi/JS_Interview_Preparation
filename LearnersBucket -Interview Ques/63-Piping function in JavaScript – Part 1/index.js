const pipe=(obj)=>{
    // in func if you give only args it will take only one not all so give ...args
    console.log('hello')
    return function(...args){
        for(let key in obj){
            let curr=obj[key]
            if(typeof curr == 'function'){
                console.log('in for',...args)
                obj[key]=curr.apply(this,[...args])
                // obj[key] = curr.call(this, ...args);
            }else{
                pipe(curr)(...args)
            }
            console.log(curr)
        }
        return obj
    }
}
let test = {
  a: {
    b: (a, b, c) => {
        console.log('hii',a,b,c,a+b+c)
        return a + b + c},
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
  e: 1,
  f: true,
};

console.log(pipe(test)(1,1,1))

let arr=[1,2,56,78,90]
 