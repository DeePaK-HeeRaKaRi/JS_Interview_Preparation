
// The Resource Pool design pattern is used to manage a limited set of resources that can be reused across multiple consumers. 
// The key idea is to maintain a "pool" of resources that are created once and are made available for reuse, improving efficiency and avoiding the cost of creating and destroying resources multiple times.

// In JavaScript, this pattern is often used for managing resources like database connections, threads, or expensive objects (e.g., WebSocket connections, API requests) in an efficient manner.


class ResourcePoolMember{
    constructor(data) {
        this.data = data;
        this.available = true;
    }
}


class ResourcePool {
    constructor(creatorFunc, resetFunc, size) {
        this.creatorFunc = creatorFunc;
        this.resetFunc = resetFunc
        this.size = size;
        this.pool = []
        // this.availableResource = []
        this.availableResource = new Set()
        this.intializePool()
    }

    intializePool(){
        for(let i=0;i<this.size;i++) {
            const resource = this.resetFunc(this.creatorFunc())
            this.pool.push(new ResourcePoolMember(resource))

            // this.availableResource.push(i)  //Store current Index
            this.availableResource.add(i)
        }
    }

    print_pool() {
        console.log('------pool--------',this.pool)
        console.log('------Available Resource----',this.availableResource)
    }

    expandPool() {
        const resource = this.resetFunc(this.creatorFunc())
        this.pool.push(new ResourcePoolMember(resource))
        // this.availableResource.push(this.pool.length-1)
        this.availableResource.add(this.pool.length-1)
        return 
    }

    getElement() {
        // if(this.availableResource.length == 0) {
        if(this.availableResource.size == 0) {
            console.log('No available resource')
            console.log('Expanding the resource Pool')
            this.expandPool()
        }
        
        // const get_available_resource = this.availableResource.shift()

        const get_available_resource = [...this.availableResource][0];  // O(1) to get an available resource
        this.availableResource.delete(get_available_resource);  // O(1) to remove from Set
        const resource = this.pool[get_available_resource]
        resource.available = false
        return resource
    }

    releaseElement(resource){
        const get_resource_index = this.pool.indexOf(resource)
        const get_resource = this.pool[get_resource_index]
        get_resource.available = true
        this.resetFunc(get_resource.data)
        // this.availableResource.push(get_resource_index)

        this.availableResource.add(get_resource_index)
        console.log('get_resource----------',get_resource)
    }
}

const creatorFunc = () => ({counter: 0})
const resetFunc = (val) => {
    val.counter = 0
    if(val.name) delete val.name
    return val
}

const resource_pool = new ResourcePool(creatorFunc,resetFunc,2)

// resource_pool.print_pool()

const member_1 = resource_pool.getElement()
member_1.data.name = 'Deepak'

const member_2 = resource_pool.getElement()
member_2.data.name = 'KUmar'

const member_3 = resource_pool.getElement()
member_3.data.name = 'Test file'


resource_pool.releaseElement(member_2)
resource_pool.print_pool()
