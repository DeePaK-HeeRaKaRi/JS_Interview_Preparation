// using function based

// const ComputeAmount=function(){
//     this.total=0
//     this.lacs=(val)=>{
//         this.total+=val*Math.pow(10,5)
//         return this
//     }
//     this.crore=(val)=>{
//         this.total+=val*Math.pow(10,7)
//         return this
//     }
//     this.thousand=(val)=>{
//         this.total+=val*Math.pow(10,3)
//         return this
//     }
//     this.hundred=(val)=>{
//         this.total+=val*Math.pow(10,2)
//         return this
//     }
//     this.ten=(val)=>{
//         this.total+=val*Math.pow(10,1)
//         return this
//     }
//     this.unit=(val)=>{
//         this.total+=val
//         return this
//     }
//     this.value=()=>{
//         return this.total
//     }
// }

// using class based

class ComputeAmount{
    constructor(val){
        this.total=val
    }
    // lacs=function(val){
    //     this.total+=val*Math.pow(10,5)
    //     return this
    // }
    lacs(val){
      this.total += val * Math.pow(10, 5);  //return this statements are added to enable method chaining. 
      return this
    }
    crore(val){
        this.total+=val*Math.pow(10,7)
        return this
    }
    thousand(val){
        this.total+=val*Math.pow(10,3)
        return this
    }
    hundred(val){
        this.total+=val*Math.pow(10,2)
        console.log("----------Hun", this.total);
        return this
    }
    ten(val){
        this.total+=val*10
        console.log('----------',this.total)
        return this
    }
    unit(val){
        this.total+=val
        return this
    }
    value(){
        return this.total
    }
}

const res=new ComputeAmount(0)

const ans1=res.lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();
// const ans = res.ten(2).hundred(5).thousand(2).value()
console.log(ans1)

// using Clousers

// const ComputeAmount=()=>{
//     let total=0
//     return function(){
//         total+=10
//         return total
//     }
  
// }

// const ans=ComputeAmount()
// console.log(ans())
// console.log(ans())

// const ComputeAmount=()=>{
//     return {
//         total:0,
//         lacs:function(val){
//             this.total+=val*Math.pow(10,5)
//             return this
//         },
//         crore:function(val){
//             this.total+=val*Math.pow(10,7)
//             return this
//         },
//         thousand:function(val){
//             this.total+=val*Math.pow(10,3)
//             return this
//         },
//         hundred:function(val){
//             this.total+=val*Math.pow(10,2)
//             return this
//         },
//         ten:function(val){
//             this.total+=val*Math.pow(10,1)
//             return this
//         },
//         unit:function(val){
//             this.total+=val
//             return this
//         },
//         value:function(){
//             return this.total
//         }
//     }
// }
// const amount =ComputeAmount().lacs(9).lacs(1).thousand(10).ten(1).unit(1).value();
// console.log(amount)
// const amount2 =ComputeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();
// console.log(amount2)