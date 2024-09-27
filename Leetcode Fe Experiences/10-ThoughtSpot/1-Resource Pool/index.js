class ResourcePoolMember{
    constructor(data) {
        this.data = data;
        this.available = true;
    }
}

class ResourcePool {
    constructor(creatorFunc, resetFunc = (any) => any, size=1000) {
        this.creatorFunc = creatorFunc;
        this.resetFunc = resetFunc;
        this.size = size;
        this.pool = new Array(size).fill(0).map(() => this.createElement())
        this.printPool()
    }

    createElement() {
        const data = this.resetFunc(this.creatorFunc());
        // console.log('data',data)
        return new ResourcePoolMember(data);
    }
    printPool() {
        console.log("🚀 ~ ResourcePool ~ pool ~ array:", this.pool)
    }
    
    getElement() {
        const member = this.pool.find(member => member.available);
        if (!member) {
            // throw new Error('No available resources');
            console.log('--- No available resources, Creating new one ---')
            this.pool.push(this.createElement());
            return this.getElement()
        }
        member.available = false;
        return member
    }
    
    releaseElement(member) {
        member.available = true;
        this.resetFunc(member.data);
    }
}

const creatorFunc = () => {return {counter: 0};};
const resetFunc = (coolThing) => {
  // console.log('coolThing',coolThing) 
  coolThing.counter = 0;
  if(coolThing?.name) delete coolThing.name;
  return coolThing;
};
const myPool = new ResourcePool(creatorFunc, resetFunc, 1);
const member1 = myPool.getElement();
member1.data.counter++;
member1.data.name = 'Deepak';
console.log("🚀 ~ member1:", member1)

const member2 = myPool.getElement();
member2.data.counter++;
member2.data.name = 'Kumar';


myPool.releaseElement(member2)

console.log("🚀 ~ member2:", member2)