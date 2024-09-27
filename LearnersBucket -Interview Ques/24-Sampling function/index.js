// the message should not be an arrow function ,cause it will 
// since message is an arrow function, it does not bind its own this value. Arrow functions inherit the this value from the surrounding context lexically, which means that 
// this inside the message function will not be affected by the fn.call invocation.

// By changing message to a regular function, it will have its own this value that can be bound 

const message=function(param){
    console.log('-------',param)
    console.log("hello exceuted after 4 calls", param, this,this.firstName);
}

const sampler=(fn,limit)=>{
    let counter=0
    let obj = { firstName: "test" };
    return function(...args){
        let context=this
        // let args1=arguments
        let args1=args
        console.log(args1)
        counter++
        
        if(counter==limit){
            fn.apply(obj,[args1])
            // fn([...args1])
           
            // fn.call(obj,args1)
            // fn.call(obj, args1[0], ...args1);
            counter=0
        }
    }
}
const sample=sampler(message,4)
sample()
sample()
sample()
sample('deepak','kumar') //hello -> excutes here
sample()
sample()
sample()
sample('kumar','heerakari') //hello -> excutes here