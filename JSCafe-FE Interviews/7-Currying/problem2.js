// Special Case: Return the value when invoked with empty arguments
const sum=(...args)=>{
    console.log("----------------------");
    if(args.length == 0){
        return 0
    }else{
        const inner=(...args2) =>{
            console.log('args2',args2)
            // args=args.concat(args2)
            args=[...args,...args2]
            if(args2.length==0){
                return args.reduce((prevValue,curValue) => prevValue+curValue,0)
            }
            else {
                return inner
            }
        }
        return inner
    }
}

const res = sum(1, 2, 3, 4)();
//  console.log(res)
const res2 = sum(1)(2)(3)(4)();
// console.log(res2)
const res3 = sum(1, 2)(3, 4)();
const res4 = sum(1, 2, 3)(4)();
const res5 = sum(1)(2, 3, 4)(9)(20,22)();
const res6 = sum();
 
console.log(res, res2, res3, res4, res5, res6);