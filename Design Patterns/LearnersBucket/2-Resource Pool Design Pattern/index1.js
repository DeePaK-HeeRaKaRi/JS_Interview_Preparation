// Duration base release

class ResourcePoolMember{
    constructor(data) {
        this.data = data
        this.time = 0
    }
}
// So we will store the object only for 3secs after that we will release
const DURATION = 3000 

class ResourcePool{
    // Instiating default values , for not breaking any code
    poolArray = null
    creatorFunc = () => {}
    resetFunc = () => {}
    constructor(creatorFunc,resetFunction = (any) => any ,size=1000){
        this.creatorFunc = creatorFunc;
        this.resetFunction = resetFunction;
        this.poolArray = new Array(size).fill(0).map(() => this.createElement())
    }

    createElement(){
        // Sanitizeing through reset function tha the  data that we are getting clear
        const data = this.resetFunction(this.creatorFunc())
        return new ResourcePoolMember(data)
    }

    getElement(){
        for(let i=0;i<this.poolArray.length;i++) {
            if((Date.now() - this.poolArray[i].time) > DURATION){
                this.releaseElement(this.poolArray[i])
                this.poolArray[i].time = Date.now();
                return this.poolArray[i]
            }
        }

        return 'No more items are available'
    }

    releaseElement(element){
        element.time = 0
        this.resetFunction(element.data )
    }
} 


const creatorFunc = () => {
    return {counter: 0}
} 

const resetFunc = (obj) => {
    obj.counter = 0
    delete obj.name
    return obj
}

const myPool = new ResourcePool(creatorFunc,resetFunc,1)

const objToUse = myPool.getElement()
console.log('objToUse------',objToUse)

// const objToUse2 = myPool.getElement()
// console.log('objToUse2------',objToUse2)

setTimeout(() => {
    const objToUse2 = myPool.getElement()
    console.log('objToUse2------',objToUse2)
},2000)