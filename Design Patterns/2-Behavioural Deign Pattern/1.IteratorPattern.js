// The Iterator pattern is a pattern that allows you to effectively loop over a collection of objects. A common programming task is to traverse and manipulate a collection of objects. 
// These collections may be stored as an array or perhaps something more complex, such as a tree or graph structure. In addition, you may need to access the items in the collection in a 
// certain order, such as, front to back, back to front, depth first (as in tree searches), skip evenly numbered objects, etc.

// The Iterator design pattern solves this problem by separating the collection of objects from the traversal of these objects by implementing a specialized 'iterator'!
const items=[1,"Deepak","mindtree-hyd","Software Developer",99,"Javascript"]
// backward
function Iterator(items){
    this.items=items
    this.index=this.items.length-1 
    this.hasNext=function(){
        return this.index >=0
    }
    this.next=function(){
        return this.items[this.index--]
    }
}
// Iterator.prototype={
//     hasNext:function(){
//         return this.index >=0
//     },
//     next:function(){
//         return this.items[this.index--]
//     }
// }
const iter=new Iterator(items)
console.log(iter)

while(iter.hasNext()){
    console.log(iter.next())
}



// Forward
// function Iterator(items){
//     this.items=items
//     this.index=0 
// }
// Iterator.prototype={
//     hasNext:function(){
//         return this.index < this.items.length
//     },
//     next:function(){
//         return this.items[this.index++]
//     }
// }
// const iter=new Iterator(items)
// console.log(iter)

// while(iter.hasNext()){
//     console.log(iter.next())
// }