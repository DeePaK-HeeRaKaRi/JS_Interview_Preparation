Array.prototype.listeners={}
Array.prototype.addListener=function(eventName,cb){
    console.log('---------this',this)
     if(!this.listeners[eventName]){
        this.listeners[eventName]=[]
     }
     this.listeners[eventName].push(cb)
}
Array.prototype.pushWithEvent=function(eventName,array){
    this.push(...array)
    this.triggerEvent(eventName,array)
}
Array.prototype.triggerEvent=function(eventName,elements){
    // if the evenet is present ,trigger all the call backs associated with that event
    if(this.listeners[eventName]){
        this.listeners[eventName].forEach((cbs)=>{
            cbs(eventName,elements,elements)
        })
    }
}
// compares the reference of each stored callback (in this case onAdd and onAddAgain) with the reference of cb (the callback you are trying to remove). 
// Since onAdd and onAddAgain are different objects in memory, the comparison e !== cb will be true for one and false for the other.

Array.prototype.removeListener=function(eventName,cb){
    if(this.listeners[eventName]){
        this.listeners[eventName]=this.listeners[eventName].filter((e) =>( e!==cb))
    }
}

Array.prototype.popWithEvent=function(eventName){
    console.log("-------Elkem-", this);
    const elements=this.pop()
    console.log('--------',elements)
    this.triggerEvent(eventName,elements)
}
const arr=[]
const onAdd=(eventName,items,array)=>{
    console.log('items were added',items)
}
const onAddAgain=(eventName,items,array)=>{
    console.log('items were added again',items)
}
const remove=(eventName,item,array)=>{
    console.log(item, ' was removed ')
}
arr.addListener('add',onAdd)
arr.addListener('add',onAddAgain)
arr.addListener('remove',remove)
arr.pushWithEvent('add',[1,2,3,'a','b'])
arr.pushWithEvent("add", [4, 5])
arr.removeListener('add',onAddAgain)
// arr.popWithEvent('remove')
arr.pushWithEvent('add',[{"name":"deepak"},"helo"])
// arr.popWithEvent('remove')
console.log(arr.listeners)
console.log(arr)