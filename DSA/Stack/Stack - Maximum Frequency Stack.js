
var FreqStack = function() {
    // this.stack = []
    this.hm = {}   //[5,4,5,3,4,2,5] ==> {1:[5,4,3,2],2:[5,4],3:[5]}
    this.freq_hm = {}
    this.curr_max = 0

};

FreqStack.prototype.push = function(val) {
    if(!this.freq_hm.hasOwnProperty(val)) {
        this.freq_hm[val] = 1
    }
    else{
        this.freq_hm[val] += 1
    }
    const curr_freq = this.freq_hm[val]

    this.curr_max = Math.max(this.curr_max,curr_freq)

    if(this.hm.hasOwnProperty(curr_freq)) {
        this.hm[curr_freq].push(val)
    }
    else {
        this.hm[curr_freq] = [val]
    }
    
};

/**
 * @return {number}
 */
FreqStack.prototype.popElements = function() {
    if(this.hm[this.curr_max].length > 0) {
        let res = this.hm[this.curr_max].pop()
        this.freq_hm[res]-=1 //Decrease in the frequency map as well
        if(this.hm[this.curr_max].length === 0){
            delete this.hm[this.curr_max];
            this.curr_max-=1
        }
        return res
    }
};

/** 
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

var obj = new FreqStack()
// let arr = [5,7,5,7,4,5]
// arr = [5,4,5,3,4,2,5]
// arr = [4,0,9,3,4,2,6]
// for(let i=0;i<arr.length;i++) {
//     obj.push(arr[i])
// }
// console.log(obj.hm)
// // obj.popElements()
// for(let i=0;i<arr.length;i++) {
//     console.log('popElements',obj.popElements())
// }


// obj.push(4)
// obj.push(0)
// obj.push(9)
// obj.push(3)
// obj.push(4)
// obj.push(2)
// console.log(obj.popElements())
// obj.push(6)
// console.log(obj.popElements())
// obj.push(1)
// console.log(obj.popElements())
// obj.push(1)
// console.log(obj.popElements())
// obj.push(4)
// console.log(obj.popElements())
// console.log(obj.popElements())
// console.log(obj.popElements())
// console.log(obj.popElements())
// console.log(obj.popElements())
// console.log(obj.popElements())


obj.push(1)
obj.push(1)
obj.push(1)
obj.push(2)
console.log(obj.hm,obj.curr_max)
console.log('---popp',obj.popElements())
// console.log(obj.hm,obj.curr_max)
// console.log(obj.hm,obj.curr_max)
console.log('---popp',obj.popElements())
console.log(obj.hm,obj.curr_max)
obj.push(2)
obj.push(2)
obj.push(1)
console.log('---popp',obj.popElements())
console.log('---popp',obj.popElements())
console.log('---popp',obj.popElements())
console.log(obj.hm,obj.curr_max)