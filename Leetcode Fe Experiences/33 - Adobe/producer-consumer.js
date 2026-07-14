// https://leetcode.com/discuss/post/3277266/adobe-cs1-sde3-noida-frontend-offer-by-a-u8b7/

class Broker {
    constructor() {
        this.topics = {}; // Stores topic names and their array of callback functions
    }

    // Consumers use this to listen to a topic
    subscribe(topic, callback) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.topics[topic].push(callback);
    }

    // Producers use this to broadcast messages to a topic
    publish(topic, payload) {
        if (this.topics[topic]) {
            this.topics[topic].forEach(callback => callback(payload));
        }
    }
}

class Consumer {
    constructor(broker) {
        this.broker = broker;
    }

    subscribe(topic, callback) {
        this.broker.subscribe(topic, callback);
    }
}

class Producer {
    constructor(broker) {
        this.broker = broker;
    }

    send(topic, payload) {
        this.broker.publish(topic, payload);
    }
}

// --- Usage ---

const sharedBroker = new Broker();

const consumer = new Consumer(sharedBroker);
const producer = new Producer(sharedBroker);

// 1. Consumer subscribes to 'chat'
consumer.subscribe('chat', (msg) => {
    console.log("Consumer received message:", msg);
});

// 2. Producer sends a message
producer.send('chat', { message: "hi" }); 
// Output: Consumer received message: { message: 'hi' }