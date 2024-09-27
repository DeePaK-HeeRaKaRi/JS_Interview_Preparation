function Subject(){
    this.observers=[]
}
Subject.prototype={
    subscribe:function(fn){
        this.observers.push(fn)
    },
    unSubscribe:function(fn){
        this.observers=this.observers.filter((item) => item!==fn)
    },
    fire:function(o,thisObj){
        console.log(this.observers.length)
        const scope=thisObj || window
        this.observers.forEach((item)=>{
            item.call(scope,o)
        })
    }
}

const observer=function(item){
    console.log("Firing "+item)
}
const observer2=function(item){
    console.log("Firing "+item)
}

const subject=new Subject()

subject.subscribe(observer)
subject.fire("Event #1")

subject.unSubscribe(observer)
subject.fire("Event #2")

subject.subscribe(observer)
subject.subscribe(observer2)
subject.fire("Event #3")
