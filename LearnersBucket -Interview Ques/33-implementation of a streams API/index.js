class Stream{
    constructor(){
        this.subscriptions=[]
    }
    subscribe(fn){
        if(typeof fn!=='function'){
            throw new Error('invalid function')
        }
        this.subscriptions.push(fn)
        // console.log(this.subscriptions)
    }

    pushValue(value){
        console.log('----------------')
        this.subscriptions.forEach((fn)=>{
            // console.log('value-----',fn,value)
            fn.call(this,value)
            // fn.apply(this,[2,value])
            // fn(value)
        })
        // this.subscriptions=[]
    }

}
const z = new Stream();
z.subscribe((value) => console.log(value));
z.subscribe((value) => console.log(value * 2));
z.subscribe((value) => console.log(value * 3));
z.pushValue(2);
z.subscribe((value) => console.log(value * 4));
z.pushValue(7);