const sum=(...args) => {
    const calculateSum = (arr) => {
        const result = arr.reduce((prevValue,currValue) => {
            const curresult = prevValue +currValue
            return curresult
        },0)
        return result
    }
    if(args.length===4){
        // return args.reduce((prevValue,curValue) =>{
        //     const result=prevValue+curValue
        //     return result
        // },0)
        return calculateSum(args)
    }
    else{
        const inner=(...args2)=>{
            console.log(args,typeof args,args2)
            // args=args.concat(args2)
            args = [...args,...args2]
            // if(typeof args == )
            if(args.length === 4){
                // return args.reduce((prevValue,curValue) =>prevValue+curValue,0)
                return calculateSum(args)
            }else{
                return inner
            }
        }
        return inner
    }
}

const res = sum(1, 2, 3, 4)
const res2 = sum(1)(2)(3)(4)
const res3 = sum(1, 2)(3, 4);
const res4 = sum(1, 2, 3)(40);
const res5 = sum(1)(2, 3, 4);
console.log(res, res2, res3, res4, res5);
// console.log(res2)

// the code allows you to chain function calls
//the inner function returns itself again, allowing further chaining.