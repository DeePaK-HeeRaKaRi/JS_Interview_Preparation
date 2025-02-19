class HistoryTracking_System {
    constructor() {
        this.entities = new Map()
    }
    registerEntity(entity) {
        this.entities.set(entity, {})
    }

    registerService(entity, service_name) {
        const existing_services = this.entities.get(entity)

        if(!existing_services) {
            this.entities.set(entity,{[service_name]:[]})
        }
        // add service to the existing entity. 
        else {
            const merged = {...existing_services,[service_name]:[]}
            this.entities.set(entity, merged)
        }
    }

    track(entity,service_name,newData) {
        const existing_services = this.entities.get(entity)
        const history = existing_services[service_name]
        const last = history[history.length - 1]  //{doc :{JS:[p1,p2,p3],DSA:[stack,arrays,BT,Heap],skils:[]}} > last = p3
        if(!last) {
            const add_service = {...existing_services,[service_name] : [newData]}
            this.entities.set(entity,add_service)
        }
        else {
            const lastStr = JSON.stringify(last)
            const currStr = JSON.stringify(newData)
            if(lastStr != currStr) {
                const add_service = {...existing_services,[service_name] : [...history, newData]}
                this.entities.set(entity,add_service)
            }
        }
    }

    getHistory(entity,service_name) {
        const existing_services = this.entities.get(entity)
        return existing_services[service_name]
    }
}



const HistoryTracking=(function(){
    let instance
    return function(){
        if(!instance){
            instance = new HistoryTracking_System()
        }
        return instance
    }
})()

const historyTracking = HistoryTracking();
console.log({historyTracking})
historyTracking.registerEntity("document");
historyTracking.registerService("document", 'JavaScript Ultimate Guide');
historyTracking.track("document", 'JavaScript Ultimate Guide', "Problem1");
historyTracking.track("document", 'JavaScript Ultimate Guide', "Problem 1,Problem 2");
historyTracking.track("document", 'JavaScript Ultimate Guide', "Problem3");
console.log(historyTracking.getHistory("document", 'JavaScript Ultimate Guide'));

// Output:
// ["Problem 1","Problem 1, Problem 2","Problem 3"]



/*

class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance; // Return existing instance if already created
        }
        this.logs = [];
        Logger.instance = this; // Store instance in a static property
    }

    log(message) {
        this.logs.push(message);
        console.log(`[LOG]: ${message}`);
    }

    getLogCount() {
        return this.logs.length;
    }
}

// Singleton instance
const logger1 = new Logger();
logger1.log("User logged in");

const logger2 = new Logger();
logger2.log("User clicked a button");

console.log(logger1 === logger2); // true (both are the same instance)
console.log(logger1.getLogCount()); // 2 (shared state)

When to Use Singleton?
✅ Use Singleton when:

You need a single point of access to a shared resource (e.g., logging, caching).
You want to ensure data consistency across multiple parts of your application.
You want to control global states without multiple instances.
❌ Avoid Singleton when:

It creates hidden dependencies, making the code harder to test.
It leads to unnecessary global variables, which might be an anti-pattern in large applications.




*/