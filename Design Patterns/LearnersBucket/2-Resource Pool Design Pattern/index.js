// Manual Release

class ResourcePoolMember{
    constructor(data) {
        this.data = data
        this.available = true
    }
}

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
            if(this.poolArray[i].available){
                this.poolArray[i].available = false;
                return this.poolArray[i]
            }
        }

        return 'No more items are available'
    }

    releaseElement(element){
        element.available = true
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
// console.log(objToUse)
objToUse.data.counter++
objToUse.data.name = 'deepak'

console.log(objToUse)

// Now Release the objToUse
myPool.releaseElement(objToUse)
console.log(objToUse)

const objToUse2 = myPool.getElement()
console.log(objToUse2)